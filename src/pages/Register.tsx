import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:5267/api/auth/register",
        {
          nombre,
          email,
          password,
          phone,
        }
      );

      setSuccessMessage("Registro exitoso. Redirigiendo al login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError("Error al registrarse. Por favor intenta de nuevo.");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#222", // Fondo oscuro consistente con la paleta
        color: "#fff",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "2rem",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
        }}
      >
        <h2
          style={{ marginBottom: "1rem", fontSize: "1.8rem", color: "#ffcc00" }}
        >
          Registrarse
        </h2>
        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="nombre"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "5px",
                border: "1px solid #bbb",
                outline: "none",
                backgroundColor: "#333",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "5px",
                border: "1px solid #bbb",
                outline: "none",
                backgroundColor: "#333",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "5px",
                border: "1px solid #bbb",
                outline: "none",
                backgroundColor: "#333",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="phone"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Teléfono
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "5px",
                border: "1px solid #bbb",
                outline: "none",
                backgroundColor: "#333",
                color: "#fff",
              }}
            />
          </div>
          {error && (
            <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
          )}
          {successMessage && (
            <p style={{ color: "green", marginBottom: "1rem" }}>
              {successMessage}
            </p>
          )}
          <button
            type="submit"
            style={{
              backgroundColor: "#ffcc00",
              color: "#000",
              padding: "0.75rem",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            Registrar
          </button>
        </form>
        <p
          onClick={() => navigate("/login")}
          style={{
            marginTop: "1rem",
            color: "#bbb",
            fontSize: "0.9rem",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Ya tienes una cuenta? Iniciar sesión
        </p>
      </div>
    </div>
  );
};

export default Register;
