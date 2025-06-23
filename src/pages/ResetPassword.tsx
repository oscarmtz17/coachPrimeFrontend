import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/api";

const PASSWORD_REQUIREMENTS_MSG =
  "La nueva contraseña no cumple con los requisitos de seguridad. Asegúrate de que:\n" +
  "- Tenga al menos 8 caracteres.\n" +
  "- Contenga al menos una letra mayúscula.\n" +
  "- Contenga al menos una letra minúscula.\n" +
  "- Contenga al menos un número.\n" +
  "- Incluya al menos un carácter especial (por ejemplo: !@#$%^&*).";

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
      setPasswordError(PASSWORD_REQUIREMENTS_MSG);
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
      setPasswordError(PASSWORD_REQUIREMENTS_MSG);
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
    <div className="flex justify-center items-center min-h-screen bg-dark text-white p-4">
      <div className="bg-black bg-opacity-80 p-8 rounded-xl w-full max-w-sm shadow-lg text-center">
        <h2 className="mb-6 text-3xl font-bold text-primary">
          Restablecer Contraseña
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-left text-sm font-medium text-gray-300"
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
              className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary pr-20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 text-gray-400 text-sm font-semibold focus:outline-none hover:text-primary"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-left text-sm font-medium text-gray-300"
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
              className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary pr-20"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-9 text-gray-400 text-sm font-semibold focus:outline-none hover:text-primary"
            >
              {showConfirmPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {passwordError && (
            <small className="text-red-500 text-xs whitespace-pre-line">
              {passwordError}
            </small>
          )}
          {message && <p className="mb-2 text-gray-400">{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`bg-primary text-black p-3 rounded-md text-lg font-semibold cursor-pointer transition-colors border-none mt-2 ${
              loading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
            }`}
          >
            {loading ? "Cargando..." : "Restablecer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
