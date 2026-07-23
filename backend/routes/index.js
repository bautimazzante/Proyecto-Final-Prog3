const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const metasRoutes = require('./metas'); // <-- 1. Importamos las nuevas rutas

// Ruta de prueba
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de metas (NUEVO)
router.use('/metas', metasRoutes); // <-- 2. Conectamos las rutas en /api/metas

// Ruta de ejemplo
router.get('/test', (req, res) => {
  res.json({
    message: 'Endpoint de prueba',
    data: {
      backend: 'Express',
      database: 'PostgreSQL',
      orm: 'Sequelize'
    }
  });
});

module.exports = router;