// backend/config/database.js
const { Sequelize } = require('sequelize');

// Obtenemos el entorno actual (por defecto 'development')
const env = process.env.NODE_ENV || 'development';

// Importamos la configuración que armaste en config.js según el entorno
const config = require('./config.js')[env];

// Creamos la instancia de conexión a la base de datos
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Probamos la conexión (opcional pero muy recomendado para debugear)
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a PostgreSQL establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize;