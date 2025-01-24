import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white">Inicio</Link></li>
        {!token && <li><Link to="/register" className="text-white">Registro</Link></li>}
        {!token && <li><Link to="/login" className="text-white">Iniciar Sesión</Link></li>}
        {token && <li><Link to="/users" className="text-white">Usuarios</Link></li>}
        {token && (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar Sesión
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
