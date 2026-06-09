const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_por_defecto';

function generarToken(user) {
  // TODO RESUELTO: Generar un token JWT con el id y email del usuario.
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // TODO RESUELTO: Extraer el token del header Authorization.
  const token = authHeader.split(' ')[1]; // Toma la segunda posición después del espacio

  if (!token) {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  try {
    // TODO RESUELTO: Verificar y decodificar el token con jwt.verify()
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Guardamos los datos decodificados en el objeto req para que el controlador los use
    req.user = decoded; 
    
    // Damos paso al siguiente eslabón (el controlador del perfil)
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = { generarToken, verificarToken };