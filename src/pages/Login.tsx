import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      localStorage.setItem("token", response.token);
      login(response.token);
      navigate("/dashboard");
    } catch (error) {
      setError("Credenciales incorrectas. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-dark text-white p-4">
      <div className="bg-black bg-opacity-80 p-8 rounded-xl w-full max-w-sm shadow-lg text-center">
        <h2 className="mb-6 text-3xl font-bold text-primary">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-left text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-left text-sm font-medium text-gray-300"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-primary text-black p-3 mt-2 border-none rounded-md text-lg font-semibold cursor-pointer transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
          >
            Iniciar sesión
          </button>
        </form>
        <p
          onClick={() => navigate("/register")}
          className="mt-6 text-gray-400 text-sm cursor-pointer underline hover:text-primary transition-colors"
        >
          Crear cuenta
        </p>
        <p
          onClick={() => navigate("/forgot-password")}
          className="mt-4 text-gray-400 text-sm cursor-pointer underline hover:text-primary transition-colors"
        >
          Olvidé mi contraseña
        </p>
      </div>
    </div>
  );
};

export default Login;
