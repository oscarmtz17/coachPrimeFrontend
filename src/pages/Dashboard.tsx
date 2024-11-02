import React from "react";
import { useAuth } from "../context/AuthContext";
import ClientList from "../components/ClientList";

const Dashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: "#222", // Fondo oscuro
        color: "#fff",
      }}
    >
      <header
        style={{
          width: "100%",
          maxWidth: "1200px",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: "2.5rem", color: "#ffcc00", marginBottom: "1rem" }}
        >
          Bienvenido al Dashboard
        </h2>
        <button
          onClick={logout}
          style={{
            backgroundColor: "#ffcc00",
            color: "#000",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </button>
      </header>

      <main style={{ width: "100%", maxWidth: "1200px" }}>
        <ClientList />
      </main>
    </div>
  );
};

export default Dashboard;
