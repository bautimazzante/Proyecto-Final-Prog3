import React, { useEffect, useState } from 'react';
import { authService } from '../services/authService';

export default function DashboardPage({ onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = authService.getToken();
      if (!token) {
        onLogout();
        return;
      }

      try {
        const response = await fetch('/api/auth/perfil', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'No se pudo obtener la información del perfil');
        }

        setUser(data.user);
      } catch (err) {
        setError(err.message);
        if (err.message.includes('token') || response?.status === 401) {
          authService.logout();
          onLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [onLogout]);

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Principal</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Cerrar Sesión
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {user && (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h2 className="text-xl font-semibold text-blue-800">¡Bienvenido, {user.nombre || user.name}!</h2>
              <p className="text-gray-600 mt-1">Has iniciado sesión correctamente en el sistema.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded border">
              <h3 className="font-bold text-gray-700 mb-2">Detalles de la cuenta:</h3>
              <p><strong>Correo electrónico:</strong> {user.email}</p>
              <p><strong>ID de usuario:</strong> {user.id}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}