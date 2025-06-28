import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/api";
import { useTranslation } from "react-i18next";

const ResetPassword: React.FC = () => {
  const { t, i18n } = useTranslation();
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

  const PASSWORD_REQUIREMENTS_MSG = t("resetPassword.requirements");

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      setPasswordError(PASSWORD_REQUIREMENTS_MSG);
    } else if (confirmPassword && password !== confirmPassword) {
      setPasswordError(t("resetPassword.noMatch"));
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (password && password !== confirmPassword) {
      setPasswordError(t("resetPassword.noMatch"));
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
      setPasswordError(t("resetPassword.noMatch"));
      return;
    }

    setLoading(true);
    try {
      await resetPassword(decodedToken, password);
      setMessage(t("resetPassword.success"));
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(t("resetPassword.error"));
    } finally {
      setLoading(false);
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
      <div className="bg-black bg-opacity-80 p-8 rounded-xl w-full max-w-sm shadow-lg text-center">
        <h2 className="mb-6 text-3xl font-bold text-primary">
          {t("resetPassword.title")}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-left text-sm font-medium text-gray-300"
            >
              {t("resetPassword.newPassword")}
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
              {showPassword ? t("resetPassword.hide") : t("resetPassword.show")}
            </button>
          </div>
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-left text-sm font-medium text-gray-300"
            >
              {t("resetPassword.confirmPassword")}
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
              {showConfirmPassword
                ? t("resetPassword.hide")
                : t("resetPassword.show")}
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
            {loading
              ? t("resetPassword.loading")
              : t("resetPassword.resetButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
