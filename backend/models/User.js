const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255]
      }
    }
  }, {
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => { //se ejecuta justo después de User.create()
        // TODO: Hashear la contraseña antes de guardar el usuario.
        // Pista: usar bcrypt.hash() con 10 rondas de salt.
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
      }
    }
    }
  });

  User.prototype.validarPassword = async function (password) {
    // cualquier usuario que venga de la base de datos adquiere este método.
    // TODO RESUELTO: Comparar la contraseña recibida con el hash almacenado.
    // Pista: usar bcrypt.compare()
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };
  // Express convierte el objeto a formato JSON
  // y dispara esta función automáticamente de fondo.

  return User;
};
