const { Meta, Tarea } = require('../models');

// 1. Obtener todas las metas del usuario (incluyendo sus tareas)
const getMetas = async (req, res) => {
  try {
    const metas = await Meta.findAll({
      where: { userId: req.user.id }, // Solo traemos las del usuario logueado
      include: [{
        model: Tarea,
        as: 'tareas', // Usamos el alias que definimos en index.js
        attributes: ['id', 'descripcion', 'completada'] // Traemos solo los datos necesarios
      }],
      order: [['createdAt', 'DESC']] // Ordenamos para ver las más recientes primero
    });

    res.json({ metas });
  } catch (error) {
    console.error('Error en getMetas:', error);
    res.status(500).json({ error: 'Error al obtener las metas' });
  }
};

// 2. Crear una nueva meta
const crearMeta = async (req, res) => {
  try {
    const { titulo, descripcion, categoria } = req.body;

    const nuevaMeta = await Meta.create({
      titulo,
      descripcion,
      categoria,
      userId: req.user.id // La asociamos automáticamente al usuario que hace la petición
    });

    res.status(201).json({
      message: 'Meta creada exitosamente',
      meta: nuevaMeta
    });
  } catch (error) {
    console.error('Error en crearMeta:', error);
    res.status(500).json({ error: 'Error al crear la meta' });
  }
};

// 3. Agregar una tarea (subtarea) a una meta existente
const agregarTarea = async (req, res) => {
  try {
    const { metaId } = req.params;
    const { descripcion } = req.body;

    // Primero verificamos que la meta exista y PERTENEZCA al usuario
    const meta = await Meta.findOne({
      where: { id: metaId, userId: req.user.id }
    });

    if (!meta) {
      return res.status(404).json({ error: 'Meta no encontrada o no autorizada' });
    }

    const nuevaTarea = await Tarea.create({
      descripcion,
      metaId: meta.id
    });

    res.status(201).json({
      message: 'Tarea agregada exitosamente',
      tarea: nuevaTarea
    });
  } catch (error) {
    console.error('Error en agregarTarea:', error);
    res.status(500).json({ error: 'Error al agregar la tarea' });
  }
};

// 4. Marcar/Desmarcar una tarea como completada (el checkbox del frontend)
const actualizarEstadoTarea = async (req, res) => {
  try {
    const { tareaId } = req.params;
    const { completada } = req.body; // Recibimos true o false

    // Buscamos la tarea e incluimos los datos de la Meta para verificar al dueño
    const tarea = await Tarea.findByPk(tareaId, {
      include: [{ model: Meta, as: 'meta' }]
    });

    // Verificamos que la tarea exista y que el usuario logueado sea el dueño de la meta padre
    if (!tarea || tarea.meta.userId !== req.user.id) {
      return res.status(404).json({ error: 'Tarea no encontrada o no autorizada' });
    }

    // Actualizamos el estado en la base de datos
    tarea.completada = completada;
    await tarea.save();

    res.json({
      message: 'Estado de la tarea actualizado',
      tarea
    });
  } catch (error) {
    console.error('Error en actualizarEstadoTarea:', error);
    res.status(500).json({ error: 'Error al actualizar el estado de la tarea' });
  }
};

// Exportamos todas las funciones para usarlas en las rutas
module.exports = {
  getMetas,
  crearMeta,
  agregarTarea,
  actualizarEstadoTarea
};ex