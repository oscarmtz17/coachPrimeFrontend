import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ClientList from "../components/ClientList";

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full p-8 bg-dark text-white box-border overflow-hidden">
      <header className="w-full max-w-5xl mb-8 text-center">
        <h2 className="text-4xl text-primary mb-4 font-bold">
          Bienvenido al Dashboard
        </h2>
        <button
          onClick={goToProfile}
          className="bg-info text-white py-3 px-6 rounded-md text-base cursor-pointer mr-4 transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          Perfil
        </button>
        <button
          onClick={logout}
          className="bg-primary text-black py-3 px-6 rounded-md text-base cursor-pointer transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          Cerrar sesión
        </button>
      </header>
      <main className="w-full max-w-screen-2xl flex-1">
        <ClientList />
      </main>
    </div>
  );
};

export default Dashboard;
