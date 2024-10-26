// src/pages/Dashboard.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import ClientList from "../components/ClientList";

const Dashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Bienvenido al Dashboard</h2>
      <button onClick={logout}>Cerrar sesión</button>
      <ClientList />
    </div>
  );
};

export default Dashboard;
