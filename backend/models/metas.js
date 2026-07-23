const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Meta = sequelize.define('Meta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100] // Aseguramos que el título tenga sentido
      }
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true // Puede ser opcional si el usuario solo quiere un título rápido
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Desarrollo Personal',
      validate: {
        // Restringimos los valores a las áreas de vida definidas
        isIn: [['Trabajo', 'Salud', 'Finanzas', 'Desarrollo Personal']]
      }
    }
  }, {
    tableName: 'metas',
    timestamps: true,
    // Agregamos un índice para optimizar el rendimiento de las consultas
    // cuando filtremos las metas por categoría en el frontend.
    indexes: [
      {
        fields: ['categoria']
      }
    ]
  });

  return Meta;
};