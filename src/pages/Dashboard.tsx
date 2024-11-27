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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between", // Asegura que el contenido se distribuya
        minHeight: "100vh",
        width: "100%", // Ocupa todo el ancho disponible
        padding: "2rem",
        backgroundColor: "#222",
        color: "#fff",
        boxSizing: "border-box", // Incluye padding dentro de las dimensiones
        overflow: "hidden", // Previene scroll innecesario
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
          onClick={goToProfile}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            marginRight: "1rem",
          }}
        >
          Perfil
        </button>
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

      <main style={{ width: "100%", maxWidth: "2000px", flex: "1" }}>
        <ClientList />
      </main>
    </div>
  );
};

export default Dashboard;
