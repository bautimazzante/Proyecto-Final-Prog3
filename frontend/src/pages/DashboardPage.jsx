import React from 'react';
import { authService } from '../services/authService';

export default function DashboardPage({ onLogout }) {
  const handleLogout = () => {
    authService.logout();
    if (onLogout) onLogout();
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Bienvenido al Panel Principal (Dashboard)</h2>
      <p>Has iniciado sesión correctamente en el sistema.</p>
      <button 
        onClick={handleLogout} 
        style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}