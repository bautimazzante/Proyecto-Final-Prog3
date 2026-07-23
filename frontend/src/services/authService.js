import axios from 'axios';

const API_URL = '/api/auth';

// Iniciar sesión
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Registrar nuevo usuario
export const register = async (nombre, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { nombre, email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Cerrar sesión
export const logout = () => {
  localStorage.removeItem('token');
};

// Obtener perfil del usuario actual
export const getPerfil = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/perfil`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};