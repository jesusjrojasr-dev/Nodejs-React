import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserEditForm from './UserEditForm';
import Swal from 'sweetalert2';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Por favor, inicia sesión.',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar'
        }).then(() => {
            setTimeout(() => {
            window.location.href = '/login';
            }, 2000); // Espera de 2 segundos antes de redirigir
        });
        console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchUsers();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el usuario.',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      });
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="UsersList">
      <h2>Lista de Usuarios</h2>
      {editingUser && (
        <UserEditForm user={editingUser} onUpdate={() => {
          setEditingUser(null);
          fetchUsers();
        }} />
      )}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nombre} - {user.email}
            <button onClick={() => setEditingUser(user)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded m-2">
              Editar
            </button>
            <button onClick={() => handleDelete(user.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
