import React, { useState } from 'react';

const NuevaMetaModal = ({ isOpen, onClose, onGuardar }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('Desarrollo Personal');
  const [cargando, setCargando] = useState(false);

  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    // Ejecutamos la función que nos llega desde el Dashboard
    await onGuardar({ titulo, descripcion, categoria });
    setCargando(false);
    
    // Limpiamos el formulario y cerramos
    setTitulo('');
    setDescripcion('');
    setCategoria('Desarrollo Personal');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Nueva Meta</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
            <input 
              type="text" 
              required 
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Ej: Leer 12 libros"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
            <select 
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-white"
            >
              <option value="Trabajo">Trabajo</option>
              <option value="Salud">Salud</option>
              <option value="Finanzas">Finanzas</option>
              <option value="Desarrollo Personal">Desarrollo Personal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Descripción (Opcional)</label>
            <textarea 
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none resize-none"
              rows="3"
            ></textarea>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={cargando}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {cargando ? 'Guardando...' : 'Guardar Meta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaMetaModal;