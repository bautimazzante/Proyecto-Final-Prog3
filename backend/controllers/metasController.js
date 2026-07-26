const { Meta, Tarea } = require('../models');

// 1. Obtener todas las metas del usuario
const getMetas = async (req, res) => {
  try {
    const metas = await Meta.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Tarea,
        as: 'tareas',
        attributes: ['id', 'descripcion', 'completada']
      }],
      order: [['createdAt', 'DESC']]
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
      userId: req.user.id 
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

// 3. Agregar una tarea a una meta existente
const agregarTarea = async (req, res) => {
  try {
    const { metaId } = req.params;
    const { descripcion } = req.body;

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

// 4. Marcar/Desmarcar una tarea como completada
const actualizarEstadoTarea = async (req, res) => {
  try {
    const { tareaId } = req.params;
    const { completada } = req.body; 

    const tarea = await Tarea.findByPk(tareaId, {
      include: [{ model: Meta, as: 'meta' }]
    });

    if (!tarea || tarea.meta.userId !== req.user.id) {
      return res.status(404).json({ error: 'Tarea no encontrada o no autorizada' });
    }

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

// 5. Eliminar una Meta completa
const eliminarMeta = async (req, res) => {
  try {
    const { metaId } = req.params;

    const borrados = await Meta.destroy({
      where: { 
        id: metaId,
        userId: req.user.id 
      }
    });

    if (borrados === 0) {
      return res.status(404).json({ error: 'Meta no encontrada o no autorizada' });
    }

    res.json({ message: 'Meta eliminada correctamente' });
  } catch (error) {
    console.error('Error en eliminarMeta:', error);
    res.status(500).json({ error: 'Error al eliminar la meta' });
  }
};

// 6. Eliminar una Tarea individual
const eliminarTarea = async (req, res) => {
  try {
    const { tareaId } = req.params;

    const tarea = await Tarea.findByPk(tareaId, {
      include: [{ model: Meta, as: 'meta' }]
    });

    if (!tarea || tarea.meta.userId !== req.user.id) {
      return res.status(404).json({ error: 'Tarea no encontrada o no autorizada' });
    }

    await tarea.destroy();

    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error('Error en eliminarTarea:', error);
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};

module.exports = {
  getMetas,
  crearMeta,
  agregarTarea,
  actualizarEstadoTarea,
  eliminarMeta,
  eliminarTarea
};