const express = require('express');
const router = express.Router();
const { 
  getMetas, 
  crearMeta, 
  agregarTarea, 
  actualizarEstadoTarea 
} = require('../controllers/metasController');
const { verificarToken } = require('../middleware/auth');

// Todas las rutas de este archivo estarán protegidas por verificarToken
router.use(verificarToken);

// GET /api/metas - Obtener todas las metas del usuario logueado
router.get('/', getMetas);

// POST /api/metas - Crear una nueva meta
router.post('/', crearMeta);

// POST /api/metas/:metaId/tareas - Agregar una subtarea a una meta
router.post('/:metaId/tareas', agregarTarea);

// PUT /api/metas/tareas/:tareaId/estado - Marcar/Desmarcar tarea como completada
router.put('/tareas/:tareaId/estado', actualizarEstadoTarea);

module.exports = router;