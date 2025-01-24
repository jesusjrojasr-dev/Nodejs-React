import React, { useState } from 'react';
import axios from 'axios';

function UserEditForm({ user, onUpdate }) {
  const [nombre, setNombre] = useState(user.nombre);
  const [email, setEmail] = useState(user.email);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user.id}`, { nombre, email, rol_id: user.rol_id }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      onUpdate();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
          Nombre
        </label>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Actualizar
      </button>
    </form>
  );
}

export default UserEditForm;
