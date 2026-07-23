import axios from 'axios';

// 1. Creamos una instancia configurada de Axios.
// Gracias al "proxy" que tenés en el package.json, '/api/metas' 
// apuntará automáticamente a http://backend:3001/api/metas
const api = axios.create({
  baseURL: '/api/metas'
});

// 2. Interceptor: Esta función se ejecuta mágicamente ANTES de cada petición.
// Su trabajo es buscar el token del usuario y adjuntarlo a los headers.
api.interceptors.request.use(
  (config) => {
    // Asumimos que cuando el usuario hace login, guardás el token acá
    const token = localStorage.getItem('token'); 
    
    if (token) {
      // Formato estándar de autorización Bearer
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Funciones del servicio que exportamos para usar en los componentes

// Obtener todas las metas (y sus tareas anidadas)
export const getMetas = async () => {
  const response = await api.get('/');
  return response.data; // Devuelve el objeto { metas: [...] }
};

// Crear una nueva meta
export const crearMeta = async (metaData) => {
  // metaData espera: { titulo, descripcion, categoria }
  const response = await api.post('/', metaData);
  return response.data;
};

// Agregar una subtarea a una meta existente
export const agregarTarea = async (metaId, descripcion) => {
  const response = await api.post(`/${metaId}/tareas`, { descripcion });
  return response.data;
};

// Marcar/Desmarcar una tarea (el checkbox)
export const actualizarEstadoTarea = async (tareaId, completada) => {
  // completada espera: true o false
  const response = await api.put(`/tareas/${tareaId}/estado`, { completada });
  return response.data;
};