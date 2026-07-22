import React, { useState } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { authService } from './services/authService';

function App() {
  const [token, setToken] = useState(authService.getToken());
  const [currentView, setCurrentView] = useState('login'); // 'login' o 'register'

  if (token) {
    return <DashboardPage onLogout={() => setToken(null)} />;
  }

  return (
    <div className="App">
      <header className="App-header" style={{ padding: '20px' }}>
        <h1>Proyecto Final - Prog 3</h1>
        <div>
          <button 
            onClick={() => setCurrentView('login')} 
            style={{ margin: '0 10px', padding: '8px 15px', background: currentView === 'login' ? '#007BFF' : '#ccc', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Iniciar Sesión
          </button>
          <button 
            onClick={() => setCurrentView('register')} 
            style={{ margin: '0 10px', padding: '8px 15px', background: currentView === 'register' ? '#28a745' : '#ccc', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Registrarse
          </button>
        </div>
      </header>
      <main>
        {currentView === 'login' ? <LoginPage /> : <RegisterPage />}
      </main>
    </div>
  );
}

export default App;