import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCargando(true);
      setError('');
      await login(email, password);
      navigate('/dashboard'); // Redirigimos al panel principal al entrar con éxito
    } catch (err) {
      setError(err.response?.data?.error || 'Credenciales inválidas o error en el servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Iniciar Sesión</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-sm rounded-lg font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={cargando}
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
          >
            {cargando ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-slate-600">
          ¿No tenés una cuenta? <Link to="/register" className="text-blue-600 font-medium hover:underline">Registrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;