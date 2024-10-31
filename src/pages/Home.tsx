import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import background from "../assets/homeBackground.webp";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        textAlign: "center",
      }}
    >
      {/* Superposición oscura para mejorar el contraste */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Oscurece la imagen de fondo con una capa negra semi-transparente
          zIndex: 1,
        }}
      ></div>

      {/* Logo en la parte superior izquierda */}
      <img
        src={logo}
        alt="CoachPrime Logo"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "120px",
          cursor: "pointer",
          zIndex: 2,
        }}
        onClick={() => navigate("/")}
      />

      {/* Contenido principal con estilo y sombra de texto */}
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: "bold",
          marginBottom: "1rem",
          zIndex: 2,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Sombra en el texto
        }}
      >
        Empower Your Clients
      </h1>
      <p
        style={{
          fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
          marginBottom: "2rem",
          zIndex: 2,
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)", // Sombra en el texto
        }}
      >
        Tu plataforma para alcanzar tus objetivos de fitness y bienestar.
      </p>

      {!showOptions ? (
        <button
          onClick={() => setShowOptions(true)}
          style={{
            backgroundColor: "#ffcc00",
            color: "#000",
            padding: "1rem 2rem",
            border: "none",
            borderRadius: "5px",
            fontSize: "1.2rem",
            cursor: "pointer",
            maxWidth: "90%",
            width: "300px",
            zIndex: 2,
          }}
        >
          Get Started
        </button>
      ) : (
        <div style={{ marginTop: "1.5rem", zIndex: 2 }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              backgroundColor: "#ffcc00",
              color: "#000",
              padding: "1rem 2rem",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.2rem",
              cursor: "pointer",
              marginBottom: "1rem",
              maxWidth: "90%",
              width: "300px",
              zIndex: 2,
            }}
          >
            Iniciar sesión
          </button>
          <p
            onClick={() => navigate("/register")}
            style={{
              color: "#fff",
              fontSize: "0.9rem",
              cursor: "pointer",
              textDecoration: "underline",
              zIndex: 2,
            }}
          >
            Crear cuenta
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
