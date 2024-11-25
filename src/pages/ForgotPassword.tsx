import React, { useState } from "react";
import { sendPasswordReset } from "../services/api";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordReset(email);
      setMessage("Hemos enviado un enlace de recuperación a tu correo.");
    } catch (error) {
      setMessage("Hubo un problema. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#222",
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
          Recuperar Contraseña
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Ingresa tu correo
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
            Enviar
          </button>
        </form>
        {message && (
          <p style={{ marginTop: "1rem", color: "#bbb" }}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
