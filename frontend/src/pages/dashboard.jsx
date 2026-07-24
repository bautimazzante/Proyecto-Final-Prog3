import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaCard from '../components/metaCard';
import NuevaMetaModal from '../components/nuevaMetaModel';
import { getMetas, actualizarEstadoTarea, crearMeta, agregarTarea } from '../services/metasService';
import { logout } from '../services/authService';
import { metasService } from '../services/metasService';

const Dashboard = () => {
  const [metas, setMetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    cargarMetas();
  }, []);

  const cargarMetas = async () => {
    try {
      setCargando(true);
      const data = await getMetas();
      setMetas(data.metas);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar las metas.');
    } finally {
      setCargando(false);
    }
  };

  const handleActualizarTarea = async (tareaId, nuevoEstado) => {
    try {
      await actualizarEstadoTarea(tareaId, nuevoEstado);
      setMetas(metasPrevias => 
        metasPrevias.map(meta => ({
          ...meta,
          tareas: meta.tareas.map(tarea => 
            tarea.id === tareaId ? { ...tarea, completada: nuevoEstado } : tarea
          )
        }))
      );
    } catch (err) {
      alert('Hubo un error al actualizar la tarea.');
    }
  };

  const handleCrearMeta = async (metaData) => {
    try {
      const response = await crearMeta(metaData);
      // Inyectamos la nueva meta al principio del estado visual
      setMetas(metasPrevias => [{ ...response.meta, tareas: [] }, ...metasPrevias]);
    } catch (err) {
      alert('Error al crear la meta.');
    }
  };

  const handleAgregarTarea = async (metaId, descripcion) => {
    try {
      const response = await agregarTarea(metaId, descripcion);
      // Actualizamos la meta específica con su nueva tarea
      setMetas(metasPrevias => 
        metasPrevias.map(meta => 
          meta.id === metaId 
            ? { ...meta, tareas: [...(meta.tareas || []), response.tarea] }
            : meta
        )
      );
    } catch (err) {
      alert('Error al agregar la tarea.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* BARRA LATERAL */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <span>🎯</span> Mis Metas
          </h2>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            <li><button className="w-full text-left px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium">Todas</button></li>
            <li><button className="w-full text-left px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900">Trabajo</button></li>
            <li><button className="w-full text-left px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900">Salud</button></li>
            <li><button className="w-full text-left px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900">Finanzas</button></li>
            <li><button className="w-full text-left px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900">Desarrollo Personal</button></li>
          </ul>
        </nav>

        {/* BOTÓN CERRAR SESIÓN */}
        <div className="mt-auto pt-6 border-t border-slate-200">
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* PANEL CENTRAL */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
            <p className="text-slate-500 mt-1">Acá podés hacer seguimiento de tu progreso.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            + Nueva Meta
          </button>
        </header>

        {cargando && <p className="text-slate-500 text-center mt-10">Cargando tus metas...</p>}
        {error && <p className="text-rose-600 text-center mt-10 font-medium">{error}</p>}

        {!cargando && !error && (
          <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {metas.length === 0 ? (
              <p className="text-slate-500 col-span-full text-center py-10">
                No tenés metas creadas todavía. ¡Agregá una nueva para empezar!
              </p>
            ) : (
              metas.map(meta => (
                <MetaCard 
                  key={meta.id} 
                  meta={meta} 
                  onActualizarTarea={handleActualizarTarea} 
                  onAgregarTarea={handleAgregarTarea}
                />
              ))
            )}
          </section>
        )}
      </main>

      {/* VENTANA EMERGENTE */}
      <NuevaMetaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onGuardar={handleCrearMeta}
      />
    </div>
  );
};

export default Dashboard;