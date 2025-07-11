import React from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Register: React.FC = () => {
  const {
    nombre,
    apellido,
    email,
    password,
    confirmPassword,
    phone,
    selectedPlan,
    error,
    successMessage,
    isFormValid,
    showPassword,
    showConfirmPassword,
    passwordError,
    setNombre,
    setApellido,
    setEmail,
    setPassword,
    setConfirmPassword,
    setPhone,
    setShowPassword,
    setShowConfirmPassword,
    handleRegister,
    handlePlanSelection,
    handlePasswordBlur,
    handleConfirmPasswordBlur,
    loading,
  } = useRegister();

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const PLANES = [
    {
      nombre: t("plans.basic"),
      precio: "$0",
      descripcion: t("plans.basicDesc"),
      id: 1,
    },
    {
      nombre: t("plans.premium"),
      precio: "$499",
      descripcion: t("plans.premiumDesc"),
      id: 3,
    },
    {
      nombre: t("plans.premiumYear"),
      precio: "$4990",
      descripcion: t("plans.premiumYearDesc"),
      id: 4,
    },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
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
          className="mb-4 text-primary font-semibold hover:underline focus:outline-none"
        >
          ← {t("common.back")}
        </button>
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          {t("register.title")}
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                {t("register.name")}
              </label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {/* Apellido */}
            <div>
              <label
                htmlFor="apellido"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                {t("register.lastName")}
              </label>
              <input
                id="apellido"
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
                className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                {t("register.email")}
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
            {/* Teléfono */}
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                {t("register.phone")}
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setPhone(numericValue);
                }}
                required
                className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {/* Contraseña */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                {t("register.password")}
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
                className="absolute right-2 top-9 text-primary text-sm font-semibold focus:outline-none"
              >
                {showPassword ? t("register.hide") : t("register.show")}
              </button>
            </div>
            {/* Confirmar Contraseña */}
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                {t("register.confirmPassword")}
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
                className="absolute right-2 top-9 text-primary text-sm font-semibold focus:outline-none"
              >
                {showConfirmPassword ? t("register.hide") : t("register.show")}
              </button>
            </div>
            {passwordError && (
              <small className="text-red-500 text-xs">{passwordError}</small>
            )}
          </div>
          {/* Planes */}
          <h2 className="text-lg font-bold text-primary mb-2 mt-4">
            {t("register.selectPlan")}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-2">
            {PLANES.map((plan) => (
              <div
                key={plan.id}
                className={`flex-1 p-4 rounded-lg cursor-pointer transition-all duration-200 shadow-md bg-dark-gray text-white border-2 ${
                  selectedPlan === plan.id
                    ? "border-green-400 scale-105"
                    : "border-primary hover:border-green-400 hover:scale-105"
                }`}
                onClick={() => handlePlanSelection(plan.id)}
              >
                <h3 className="text-lg font-bold text-primary mb-1">
                  {plan.nombre}
                </h3>
                <p className="text-2xl font-bold mb-1">{plan.precio}</p>
                <p className="text-sm whitespace-pre-line text-gray-300">
                  {plan.descripcion}
                </p>
              </div>
            ))}
          </div>
          {/* Mensajes */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {successMessage && (
            <div className="bg-green-100 text-green-800 rounded p-2 text-center flex flex-col items-center">
              <p>{successMessage}</p>
              {loading && <span className="loader" />}
            </div>
          )}
          {/* Botón de Registro */}
          <button
            type="submit"
            disabled={!isFormValid || !selectedPlan}
            className={`w-full mt-2 p-3 rounded-md text-lg font-semibold transition-colors border-none ${
              isFormValid && selectedPlan
                ? "bg-primary text-black cursor-pointer hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
          >
            {loading ? t("register.loading") : t("register.registerButton")}
          </button>
        </form>
        <p
          className="mt-6 text-gray-400 text-sm cursor-pointer underline hover:text-primary transition-colors text-center"
          onClick={() => navigate("/login")}
        >
          {t("register.alreadyAccount")}
        </p>
      </div>
    </div>
  );
};

export default Register;
