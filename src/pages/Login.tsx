import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/api";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      login(response.token, response.refreshToken, response.userId);
      navigate("/dashboard");
    } catch (error) {
      setError(t("login.invalidCredentials"));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-dark text-white p-4 relative">
      {/* Selector de idioma en la esquina superior derecha */}
      <div className="absolute top-5 right-5 z-30">
        <select
          value={i18n.language}
          onChange={handleLanguageChange}
          className="bg-gray-700 text-white py-2 px-3 rounded"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>
      <div className="bg-black bg-opacity-80 p-6 sm:p-10 rounded-xl w-full max-w-lg shadow-lg">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-4 text-primary font-semibold hover:underline focus:outline-none self-start"
        >
          ← {t("common.back")}
        </button>
        <h2 className="mb-6 text-3xl font-bold text-primary text-center">
          {t("login.title")}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-left text-sm font-medium text-gray-300"
            >
              {t("login.email")}
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
              {t("login.password")}
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
            {t("login.loginButton")}
          </button>
        </form>
        <p
          onClick={() => navigate("/register")}
          className="mt-6 text-gray-400 text-sm cursor-pointer underline hover:text-primary transition-colors text-center"
        >
          {t("login.createAccount")}
        </p>
        <p
          onClick={() => navigate("/forgot-password")}
          className="mt-4 text-gray-400 text-sm cursor-pointer underline hover:text-primary transition-colors text-center"
        >
          {t("login.forgotPassword")}
        </p>
      </div>
    </div>
  );
};

export default Login;
