import React, { useState } from 'react';

const MetaCard = ({ meta, onActualizarTarea, onAgregarTarea, onEliminarMeta, onEliminarTarea }) => {
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [agregando, setAgregando] = useState(false);

  const totalTareas = meta.tareas?.length || 0;
  const tareasCompletadas = meta.tareas?.filter(t => t.completada).length || 0;
  const porcentaje = totalTareas === 0 ? 0 : Math.round((tareasCompletadas / totalTareas) * 100);

  const getColorCategoria = (categoria) => {
    switch (categoria) {
      case 'Trabajo': return 'bg-emerald-100 text-emerald-700';
      case 'Salud': return 'bg-rose-100 text-rose-700';
      case 'Finanzas': return 'bg-amber-100 text-amber-700';
      default: return 'bg-purple-100 text-purple-700';
    }
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!nuevaTarea.trim()) return;
    
    setAgregando(true);
    await onAgregarTarea(meta.id, nuevaTarea);
    setNuevaTarea('');
    setAgregando(false);
  };

  return (
    <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getColorCategoria(meta.categoria)}`}>
          {meta.categoria}
        </span>
        {/* Botón de eliminar Meta (Ícono de papelera) */}
        <button 
          onClick={() => onEliminarMeta(meta.id)}
          className="text-slate-400 hover:text-rose-600 transition-colors"
          title="Eliminar Meta"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2">{meta.titulo}</h3>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1 text-slate-600">
          <span>Progreso</span>
          <span className="font-medium">{porcentaje}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${porcentaje}%` }}
          ></div>
        </div>
      </div>

      <ul className="space-y-3 text-sm text-slate-600 flex-1 mt-2 mb-4">
        {meta.tareas?.map((tarea) => (
          // Añadimos 'group' y 'justify-between' al li para el hover del botón eliminar tarea
          <li key={tarea.id} className="flex items-start justify-between gap-2 group">
            <div className="flex items-start gap-2 flex-1">
              <input 
                type="checkbox" 
                className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 cursor-pointer" 
                checked={tarea.completada}
                onChange={(e) => onActualizarTarea(tarea.id, e.target.checked)}
              />
              <span className={tarea.completada ? "line-through text-slate-400 transition-colors" : "transition-colors"}>
                {tarea.descripcion}
              </span>
            </div>
            
            {/* Botón de eliminar Tarea (Visible al hacer hover en la tarea) */}
            <button
              onClick={() => onEliminarTarea(meta.id, tarea.id)}
              className="text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 font-bold px-1"
              title="Eliminar tarea"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      {/* Formulario para agregar una nueva subtarea */}
      <form onSubmit={handleAgregar} className="mt-auto pt-4 border-t border-slate-100">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Nueva tarea..."
            className="flex-1 text-sm px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            disabled={agregando}
          />
          <button 
            type="submit" 
            disabled={agregando || !nuevaTarea.trim()}
            className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            +
          </button>
        </div>
      </form>
    </article>
  );
};

export default MetaCard;