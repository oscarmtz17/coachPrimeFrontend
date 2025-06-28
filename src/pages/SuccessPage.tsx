import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark text-primary p-4 relative">
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
      <h1 className="text-3xl font-bold mb-4 text-primary">
        {t("success.title")}
      </h1>
      <p className="mb-8 text-center text-white max-w-md">
        {t("success.message")}
      </p>
      <button
        onClick={handleGoToLogin}
        className="bg-primary text-black px-8 py-3 rounded-md text-lg font-semibold cursor-pointer transition-colors border-none hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
      >
        {t("success.goToLogin")}
      </button>
    </div>
  );
};

export default SuccessPage;
