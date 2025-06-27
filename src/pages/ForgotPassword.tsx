import React, { useState } from "react";
import { sendPasswordReset } from "../services/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

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
    <div className="flex justify-center items-center min-h-screen bg-dark text-white p-4">
      <div className="bg-black bg-opacity-80 p-6 sm:p-10 rounded-xl w-full max-w-lg shadow-lg">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mb-4 text-primary font-semibold hover:underline focus:outline-none self-start"
        >
          ← Regresar
        </button>
        <h2 className="mb-6 text-3xl font-bold text-primary text-center">
          Recuperar Contraseña
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-left text-sm font-medium text-gray-300"
            >
              Ingresa tu correo
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-black p-3 rounded-md text-lg font-semibold cursor-pointer transition-colors border-none mt-2 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
          >
            Enviar
          </button>
        </form>
        {message && <p className="mt-6 text-gray-400">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
