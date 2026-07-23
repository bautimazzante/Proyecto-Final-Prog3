import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

// Componente protector: Verifica si hay un token en el navegador. 
// Si no lo hay, "patea" al usuario a la pantalla de login.
const RutaProtegida = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [token, setToken] = useState(authService.getToken());
  const [currentView, setCurrentView] = useState('login'); // 'login' o 'register'

  if (token) {
    return <DashboardPage onLogout={() => setToken(null)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas Privadas */}
          <Route 
            path="/dashboard" 
            element={
              <RutaProtegida>
                <Dashboard />
              </RutaProtegida>
            } 
          />

          {/* Redirección por defecto */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;