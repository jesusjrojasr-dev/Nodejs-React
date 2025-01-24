import React from 'react';
import UsersList from './UsersList';

function Dashboard() {
  return (
    <div className="Dashboard p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <UsersList />
    </div>
  );
}

export default Dashboard;
