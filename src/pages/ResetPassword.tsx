import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/api";

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const decodedToken = decodeURIComponent(token || ""); // Decodificar token
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      setPasswordError(
        `La nueva contraseña no cumple con los requisitos de seguridad. Asegúrate de que:
        - Tenga al menos 8 caracteres.
        - Contenga al menos una letra mayúscula.
        - Contenga al menos una letra minúscula.
        - Contenga al menos un número.
        - Incluya al menos un carácter especial (por ejemplo: !@#$%^&*).`
      );
    } else if (confirmPassword && password !== confirmPassword) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setPasswordError(
        `La nueva contraseña no cumple con los requisitos de seguridad. Asegúrate de que:
        - Tenga al menos 8 caracteres.
        - Contenga al menos una letra mayúscula.
        - Contenga al menos una letra minúscula.
        - Contenga al menos un número.
        - Incluya al menos un carácter especial (por ejemplo: !@#$%^&*).`
      );
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(decodedToken, password);
      setMessage("Contraseña restablecida correctamente.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Hubo un problema. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
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
          Restablecer Contraseña
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Nueva Contraseña
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
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
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
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
                width: "100%",
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
                right: "10px",
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
          </div>
          <div>
            {passwordError && (
              <small style={{ color: "red", fontSize: "0.9rem" }}>
                {passwordError}
              </small>
            )}
          </div>
          {message && (
            <p style={{ marginBottom: "1rem", color: "#bbb" }}>{message}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? "#bbb" : "#ffcc00",
              color: "#000",
              padding: "0.75rem",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.2rem",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Cargando..." : "Restablecer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
