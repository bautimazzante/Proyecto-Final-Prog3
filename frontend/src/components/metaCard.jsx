import React, { useState } from 'react';

const MetaCard = ({ meta, onActualizarTarea, onAgregarTarea }) => {
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
          <li key={tarea.id} className="flex items-start gap-2">
            <input 
              type="checkbox" 
              className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 cursor-pointer" 
              checked={tarea.completada}
              onChange={(e) => onActualizarTarea(tarea.id, e.target.checked)}
            />
            <span className={tarea.completada ? "line-through text-slate-400 transition-colors" : "transition-colors"}>
              {tarea.descripcion}
            </span>
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