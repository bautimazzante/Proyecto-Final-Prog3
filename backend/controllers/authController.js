const { User } = require('../models');
const { generarToken } = require('../middleware/auth');

const register = async (req, res) => {
  try {
    const { name, nombre: nombreBody, email, password } = req.body;
    const nombre = name || nombreBody;

    // Verificar que no exista un usuario con ese email
    const existente = await User.findOne({ where: { email } });
    if (existente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Crear el usuario en la base de datos usando User.create()
    const user = await User.create({ nombre, email, password });

    // Generar un token para el usuario recién creado usando generarToken()
    const token = generarToken(user);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user,
      token
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por email usando User.findOne()
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Validar la contraseña usando el método user.validarPassword()
    const passwordValida = await user.validarPassword(password);

    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generarToken(user);

    res.json({
      message: 'Login exitoso',
      user,
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

const perfil = async (req, res) => {
  try {
    // Obtener el usuario desde la base de datos usando el id de req.user
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error en perfil:', error);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

module.exports = { register, login, perfil };