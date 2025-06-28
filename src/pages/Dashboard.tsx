import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ClientList from "../components/ClientList";
import { useTranslation } from "react-i18next";

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goToProfile = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full p-8 bg-dark text-white box-border overflow-hidden relative">
      <header className="w-full max-w-5xl mb-8 text-center">
        <h2 className="text-4xl text-primary mb-4 font-bold">
          {t("dashboard.title")}
        </h2>
        <button
          onClick={goToProfile}
          className="bg-info text-white py-3 px-6 rounded-md text-base cursor-pointer mr-4 transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          {t("dashboard.profile")}
        </button>
        <button
          onClick={handleLogout}
          className="bg-primary text-black py-3 px-6 rounded-md text-base cursor-pointer transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          {t("dashboard.logout")}
        </button>
      </header>
      <main className="w-full max-w-screen-2xl flex-1">
        <ClientList />
      </main>
    </div>
  );
};

export default Dashboard;
