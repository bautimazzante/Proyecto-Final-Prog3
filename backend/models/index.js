const { Sequelize } = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

// 1. Importar e inicializar los modelos
const UserModel = require('./User');
const MetaModel = require('./Meta');
const TareaModel = require('./Tarea');

const User = UserModel(sequelize);
const Meta = MetaModel(sequelize);
const Tarea = TareaModel(sequelize);

// 2. Definir las asociaciones (Relaciones)

// Un Usuario tiene muchas Metas (Relación 1 a N)
User.hasMany(Meta, {
  foreignKey: 'userId', // Sequelize creará esta columna en la tabla Metas
  as: 'metas'
});
// Una Meta pertenece a un Usuario
Meta.belongsTo(User, {
  foreignKey: 'userId',
  as: 'usuario'
});

// Una Meta tiene muchas Tareas (Relación 1 a N)
Meta.hasMany(Tarea, {
  foreignKey: 'metaId', // Sequelize creará esta columna en la tabla Tareas
  as: 'tareas',
  onDelete: 'CASCADE' // Regla vital: si el usuario elimina una meta, se eliminan automáticamente sus tareas asociadas
});
// Una Tarea pertenece a una Meta
Tarea.belongsTo(Meta, {
  foreignKey: 'metaId',
  as: 'meta'
});

// 3. Exportar todos los modelos y la conexión
module.exports = {
  sequelize,
  Sequelize,
  User,
  Meta,
  Tarea
};