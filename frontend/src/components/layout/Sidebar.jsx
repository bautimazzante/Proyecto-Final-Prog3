import React from 'react';

const Sidebar = ({ onLogout }) => {
  return (
    <aside className="w-64 bg-slate-800 text-white h-full flex flex-col shadow-xl">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          🎯 Mis Metas
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Categorías</p>
        <button className="w-full text-left px-4 py-2 bg-blue-600 rounded-lg font-medium transition-colors">
          Todas
        </button>
        <button className="w-full text-left px-4 py-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300">
          Trabajo
        </button>
        <button className="w-full text-left px-4 py-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300">
          Salud
        </button>
        <button className="w-full text-left px-4 py-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300">
          Finanzas
        </button>
        <button className="w-full text-left px-4 py-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300">
          Desarrollo Personal
        </button>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button 
          onClick={onLogout}
          className="w-full px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg font-medium transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;