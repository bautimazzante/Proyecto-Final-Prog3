import axios from 'axios';

const api = axios.create({
  baseURL: '/api/metas'
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const getMetas = async () => {
  const response = await api.get('/');
  return response.data; 
};

export const crearMeta = async (metaData) => {
  const response = await api.post('/', metaData);
  return response.data;
};

export const agregarTarea = async (metaId, descripcion) => {
  const response = await api.post(`/${metaId}/tareas`, { descripcion });
  return response.data;
};

export const actualizarEstadoTarea = async (tareaId, completada) => {
  const response = await api.put(`/tareas/${tareaId}/estado`, { completada });
  return response.data;
};

export const eliminarMeta = async (metaId) => {
  const response = await api.delete(`/${metaId}`);
  return response.data;
};

export const eliminarTarea = async (tareaId) => {
  const response = await api.delete(`/tareas/${tareaId}`);
  return response.data;
};