import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white text-center"
      style={{ backgroundImage: "url('/homeBackground.webp')" }}
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
        className="absolute top-5 left-5 w-28 cursor-pointer z-20"
        onClick={() => navigate("/")}
      />

      {/* Contenido principal */}
      <h1
        className="z-20 font-bold mb-4 text-shadow-lg text-[clamp(2rem,5vw,3rem)]"
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
      >
        Empower Your Clients
      </h1>
      <p
        className="z-20 mb-8 text-[clamp(1rem,2.5vw,1.2rem)] text-shadow-md"
        style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}
      >
        Tu plataforma para alcanzar tus objetivos de fitness y bienestar.
      </p>

      {/* Botón "Get Started" */}
      <div
        className={`z-20 transition-opacity duration-500 ${
          showOptions ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <button
          onClick={() => setShowOptions(true)}
          className="bg-primary text-black py-4 px-8 rounded-md text-lg font-semibold cursor-pointer transition-colors border-none max-w-[90%] w-[300px] hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          Get Started
        </button>
      </div>

      {/* Opciones "Iniciar sesión" y "Crear cuenta" */}
      <div
        className={`z-20 absolute left-1/2 -translate-x-1/2 mt-6 transition-all duration-500 ${
          showOptions
            ? "opacity-100 translate-y-0 pointer-events-auto top-2/3"
            : "opacity-0 translate-y-5 pointer-events-none top-2/3"
        }`}
      >
        <button
          onClick={() => navigate("/login")}
          className="bg-primary text-black py-4 px-8 rounded-md text-lg font-semibold cursor-pointer transition-colors border-none mb-4 max-w-[90%] w-[300px] hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          Iniciar sesión
        </button>
        <p
          onClick={() => navigate("/register")}
          className="text-white text-sm cursor-pointer underline hover:text-primary transition-colors"
        >
          Crear cuenta
        </p>
      </div>
    </div>
  );
};

export default Home;
