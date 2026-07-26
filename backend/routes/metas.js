const express = require('express');
const router = express.Router();

// 1. Importamos las funciones del controlador
const { 
  getMetas, 
  crearMeta, 
  agregarTarea, 
  actualizarEstadoTarea, 
  eliminarMeta, 
  eliminarTarea 
} = require('../controllers/metasController');

// 2. Extraemos específicamente "verificarToken" de tu archivo de seguridad.
// IMPORTANTE: Cambia '../middleware/auth' si tu archivo se llama diferente (ej: '../utils/jwt' o '../middlewares/auth')
const { verificarToken } = require('../middleware/auth'); 

// 3. Definimos las rutas protegiéndolas con verificarToken
router.get('/', verificarToken, getMetas);
router.post('/', verificarToken, crearMeta);
router.post('/:metaId/tareas', verificarToken, agregarTarea);
router.put('/tareas/:tareaId/estado', verificarToken, actualizarEstadoTarea);

// 4. Rutas para eliminar
router.delete('/:metaId', verificarToken, eliminarMeta);
router.delete('/tareas/:tareaId', verificarToken, eliminarTarea);

module.exports = router;