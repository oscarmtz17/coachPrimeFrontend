import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Bienvenido a CoachPrime</h1>
      <p>Tu plataforma para alcanzar tus objetivos de fitness y bienestar.</p>
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => navigate("/login")}
          style={{ margin: "0.5rem", padding: "0.5rem 1rem" }}
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => navigate("/register")}
          style={{ margin: "0.5rem", padding: "0.5rem 1rem" }}
        >
          Registrar
        </button>
      </div>
    </div>
  );
};

export default Home;
