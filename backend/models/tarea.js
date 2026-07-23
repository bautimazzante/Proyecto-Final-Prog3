const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tarea = sequelize.define('Tarea', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    completada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false // Por defecto, toda tarea arranca sin completar
    }
  }, {
    tableName: 'tareas',
    timestamps: true
  });

  return Tarea;
};