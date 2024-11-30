import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../services/api";

const Register: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const isFormValid =
    nombre && apellido && email && password && confirmPassword && phone;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden. Por favor, verifica.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", {
        nombre,
        apellido,
        email,
        password,
        phone,
      });

      setSuccessMessage("Registro exitoso. Redirigiendo al login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data || "Ocurrió un error al registrarse.");
      } else {
        setError("Error al registrarse. Por favor intenta de nuevo.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordBlur = () => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (password && password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
    } else {
      setPasswordError(null);
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
          maxWidth: "1000px",
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
                width: "75%",
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
              htmlFor="apellido"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Apellido
            </label>
            <input
              id="apellido"
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              style={{
                width: "75%",
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
                width: "75%",
                padding: "0.75rem",
                borderRadius: "5px",
                border: "1px solid #bbb",
                outline: "none",
                backgroundColor: "#333",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Contraseña
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              required
              style={{
                width: "75%",
                padding: "0.75rem",
                borderRadius: "5px",
                border: "1px solid #bbb",
                outline: "none",
                backgroundColor: "#333",
                color: "#fff",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "150px",
                top: "70%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#bbb",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <label
              htmlFor="confirmPassword"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={handleConfirmPasswordBlur}
              required
              style={{
                width: "75%",
                padding: "0.75rem",
                borderRadius: "5px",
                border: "1px solid #bbb",
                outline: "none",
                backgroundColor: "#333",
                color: "#fff",
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: "absolute",
                right: "150px",
                top: "70%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#bbb",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              {showConfirmPassword ? "Ocultar" : "Mostrar"}
            </button>
            {passwordError && (
              <small style={{ color: "red", fontSize: "0.9rem" }}>
                {passwordError}
              </small>
            )}
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
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Filtra caracteres no numéricos
                setPhone(numericValue);
              }}
              required
              style={{
                width: "75%",
                padding: "0.75rem",
                borderRadius: "5px",
                border: "1px solid #bbb",
                outline: "none",
                backgroundColor: "#333",
                color: "#fff",
              }}
            />
          </div>
          <div
            style={{
              width: "80%",
              margin: "2rem auto",
              display: "flex",
              justifyContent: "space-between",
              gap: "0.5,0,0,0.5rem",
            }}
          >
            {[
              {
                nombre: "Básico",
                precio: "$0",
                descripcion: "Hasta 5 clientes",
                id: "basic",
              },
              {
                nombre: "Intermedio",
                precio: "$299",
                descripcion: "Hasta 30 clientes",
                id: "intermediate",
              },
              {
                nombre: "Premium",
                precio: "$499",
                descripcion: "Clientes ilimitados",
                id: "premium",
              },
              {
                nombre: "Premium Anual",
                precio: "$4990",
                descripcion: "Clientes ilimitados \nPago anual",
                id: "anual",
              },
            ].map((plan) => (
              <div
                key={plan.id}
                style={{
                  border: "1px solid yellow",
                  borderRadius: "8px",
                  width: "23%",
                  padding: "1rem",
                  backgroundColor: "#333",
                  color: "#fff",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <h3 style={{ color: "#ffcc00", fontSize: "1.5rem" }}>
                  {plan.nombre}
                </h3>
                <p
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    marginBottom: 0,
                  }}
                >
                  {plan.precio}
                </p>
                <p
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    marginTop: 0,
                  }}
                >
                  mxn/mes
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {plan.descripcion}
                </p>
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ffcc00",
                    color: "#000",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                  //onClick={() => handlePlanSelection(plan.id)} // Implementa esta función
                >
                  Seleccionar
                </button>
              </div>
            ))}
          </div>

          {error && (
            <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
          )}
          {successMessage && (
            <div
              style={{
                marginBottom: "1rem",
                color: "green",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p style={{ margin: 0 }}>{successMessage}</p>
              {loading && (
                <span
                  className="loader"
                  style={{ marginLeft: "0.5rem" }}
                ></span>
              )}
            </div>
          )}
          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              backgroundColor: isFormValid ? "#ffcc00" : "#bbb",
              color: "#000",
              padding: "0.75rem",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.2rem",
              cursor: isFormValid ? "pointer" : "not-allowed",
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
          ¿Ya tienes una cuenta? Iniciar sesión
        </p>
      </div>

      <style>
        {`
          .loader {
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid #ffffff;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Register;
