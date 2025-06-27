import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useUserProfile } from "../hooks/useUserProfile";
import { useTranslation } from "react-i18next";

const UserProfile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    nombre,
    apellido,
    telefono,
    email,
    isEditing,
    previewLogo,
    logo,
    error,
    isModalOpen,
    passwordError,
    currentPassword,
    newPassword,
    confirmNewPassword,
    showCurrentPassword,
    showNewPassword,
    showConfirmNewPassword,
    suscripcion,
    handleUpgradePlan,
    handleNombreChange,
    handleApellidoChange,
    handleTelefonoChange,
    handleEdit,
    handleCancel,
    handleSaveChanges,
    handleLogoChange,
    handleUploadLogo,
    openModal,
    closeModal,
    handleChangePassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmNewPassword,
    setShowConfirmNewPassword,
    setShowCurrentPassword,
    setShowNewPassword,
    validatePasswords,
    getPlanNombre,
    getEstatusNombre,
    formatFecha,
    UPGRADE_PLANS,
    isPremiumInactive,
    isBasic,
    isUpgradeModalOpen,
    setIsUpgradeModalOpen,
    hoveredPlan,
    setHoveredPlan,
    handleCancelSubscription,
  } = useUserProfile();

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="flex flex-col items-center bg-dark text-primary min-h-screen p-8">
      <div className="w-full max-w-lg flex justify-between mb-4">
        <button
          onClick={handleBackToDashboard}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {t("common.back")}
        </button>
        {/* Selector de idioma */}
        <select
          value={i18n.language}
          onChange={handleLanguageChange}
          className="bg-gray-700 text-white py-2 px-3 rounded ml-4"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>
      <h2 className="text-3xl text-primary text-center mb-4">
        {t("profile.title")}
      </h2>
      <div className="w-full max-w-lg flex flex-col gap-4 bg-black bg-opacity-80 p-8 rounded-xl shadow-lg">
        <label className="text-primary font-bold">{t("profile.name")}:</label>
        <input
          type="text"
          value={nombre}
          onChange={handleNombreChange}
          disabled={!isEditing}
          className="w-full p-2 rounded border border-border-gray bg-dark-gray text-white text-base disabled:opacity-50"
        />
        <label className="text-primary font-bold">
          {t("profile.lastName")}:
        </label>
        <input
          type="text"
          value={apellido}
          onChange={handleApellidoChange}
          disabled={!isEditing}
          className="w-full p-2 rounded border border-border-gray bg-dark-gray text-white text-base disabled:opacity-50"
        />
        <label className="text-primary font-bold">{t("profile.phone")}:</label>
        <input
          type="text"
          value={telefono}
          onChange={handleTelefonoChange}
          disabled={!isEditing}
          maxLength={10}
          className="w-full p-2 rounded border border-border-gray bg-dark-gray text-white text-base disabled:opacity-50"
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <label className="text-primary font-bold">{t("profile.email")}:</label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full p-2 rounded border border-border-gray bg-dark-gray text-white text-base opacity-50"
        />
        <p className="text-sm text-primary -mt-2 mb-6">
          {t("profile.emailNotEditable")}
        </p>
        {isEditing ? (
          <div className="flex justify-between gap-4">
            <button
              onClick={handleSaveChanges}
              className="flex-1 bg-success text-white py-3 px-6 border-none rounded cursor-pointer text-base"
            >
              {t("common.save")}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-danger text-white py-3 px-6 border-none rounded cursor-pointer text-base"
            >
              {t("common.cancel")}
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="w-full bg-info text-white py-3 px-6 border-none rounded cursor-pointer mb-8"
          >
            {t("common.edit")}
          </button>
        )}
        <button
          onClick={openModal}
          className="w-full bg-primary text-black py-3 px-6 border-none rounded cursor-pointer mb-4"
        >
          {t("profile.changePassword")}
        </button>
        <h3 className="text-xl text-primary font-bold mb-2">
          {previewLogo ? t("profile.changeLogo") : t("profile.uploadLogo")}
        </h3>
        <input
          type="file"
          onChange={handleLogoChange}
          className="w-full p-2 border border-border-gray rounded bg-dark-gray text-white"
        />
        {previewLogo && (
          <img
            src={previewLogo}
            alt="Logo"
            className="w-32 h-32 object-cover rounded mt-4"
          />
        )}
        <button
          onClick={handleUploadLogo}
          disabled={!logo}
          className={`w-full py-3 px-6 border-none rounded text-base ${
            logo
              ? "bg-info text-white cursor-pointer"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          {t("profile.uploadLogoButton")}
        </button>
      </div>
      {/* Sección de Suscripción */}
      <div className="w-full max-w-lg mt-8 p-6 border border-primary rounded-lg bg-light-gray">
        <h3 className="text-2xl text-primary text-center mb-4">
          {t("plan.currentPlan")}
        </h3>
        {suscripcion ? (
          <>
            <p className="text-xl text-white mb-4">
              {t("plan.plan")}: {getPlanNombre(suscripcion.planId)}
            </p>
            <p className="text-lg text-primary mb-4">
              {t("plan.status")}:{" "}
              {getEstatusNombre(suscripcion.estadoSuscripcionId)}
            </p>
            {suscripcion.fechaFin && (
              <p className="text-base text-white mb-4">
                {t("plan.endDate")}: {formatFecha(suscripcion.fechaFin)}
              </p>
            )}
            {isPremiumInactive && (
              <button
                onClick={() => handleUpgradePlan(suscripcion.planId)}
                className="w-full bg-success text-white py-3 px-6 border-none rounded cursor-pointer text-base mb-2"
              >
                {t("plan.paySubscription")}
              </button>
            )}
            {suscripcion &&
              [2, 6].includes(suscripcion.estadoSuscripcionId) && (
                <button
                  onClick={handleCancelSubscription}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 border border-gray-400 rounded cursor-pointer text-sm mt-2 hover:bg-gray-300 transition-colors"
                >
                  {t("plan.cancelSubscription")}
                </button>
              )}
            {isBasic && (
              <button
                onClick={() => setIsUpgradeModalOpen(true)}
                className="w-full bg-info text-white py-3 px-6 border-none rounded cursor-pointer text-base"
              >
                {t("plan.upgradePlan")}
              </button>
            )}
          </>
        ) : (
          <p className="text-white">{t("plan.loading")}</p>
        )}
      </div>
      {/* Modal de cambio de contraseña */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col items-center justify-center w-96 mx-auto h-full">
          <h3 className="text-2xl text-primary mb-6">
            {t("password.changePassword")}
          </h3>
          <div className="flex flex-col justify-center items-center gap-4 w-4/5 mx-auto">
            <label className="text-primary font-bold">
              {t("password.current")}:
            </label>
            <div className="relative w-full">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 rounded border border-border-gray bg-dark-gray text-white text-base"
              />
              <button
                onMouseDown={() => setShowCurrentPassword(true)}
                onMouseUp={() => setShowCurrentPassword(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-primary cursor-pointer text-sm"
              >
                {showCurrentPassword ? t("password.hide") : t("password.show")}
              </button>
            </div>
            <label className="text-primary font-bold">
              {t("password.new")}:
            </label>
            <div className="relative w-full">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={validatePasswords}
                className="w-full p-2 rounded border border-border-gray bg-dark-gray text-white text-base"
              />
              <button
                onMouseDown={() => setShowNewPassword(true)}
                onMouseUp={() => setShowNewPassword(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-primary cursor-pointer text-sm"
              >
                {showNewPassword ? t("password.hide") : t("password.show")}
              </button>
            </div>
            <label className="text-primary font-bold">
              {t("password.confirmNew")}:
            </label>
            <div className="relative w-full">
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                onBlur={validatePasswords}
                className="w-full p-2 rounded border border-border-gray bg-dark-gray text-white text-base"
              />
              <button
                onMouseDown={() => setShowConfirmNewPassword(true)}
                onMouseUp={() => setShowConfirmNewPassword(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-primary cursor-pointer text-sm"
              >
                {showConfirmNewPassword
                  ? t("password.hide")
                  : t("password.show")}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handleChangePassword}
                disabled={
                  !currentPassword ||
                  !newPassword ||
                  !confirmNewPassword ||
                  !!passwordError
                }
                className={`bg-success text-white py-3 px-6 border-none rounded cursor-pointer text-base ${
                  !currentPassword ||
                  !newPassword ||
                  !confirmNewPassword ||
                  !!passwordError
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-dark"
                }`}
              >
                {t("modal.accept")}
              </button>
              <button
                onClick={closeModal}
                className="bg-danger text-white py-3 px-6 border-none rounded cursor-pointer text-base hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-dark"
              >
                {t("modal.cancel")}
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {/* Modal de upgrade de plan */}
      <Modal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      >
        <div className="p-8 text-center">
          <h3 className="text-2xl text-primary mb-6">
            {t("plan.chooseNewPlan")}
          </h3>
          <div className="flex justify-center gap-8 mt-4">
            {UPGRADE_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 w-40 shadow-md bg-dark-gray text-white text-center text-lg font-semibold select-none ${
                  hoveredPlan === plan.id
                    ? "border-green-400 scale-105"
                    : "border-primary hover:border-green-400 hover:scale-105"
                }`}
                onClick={() => handleUpgradePlan(plan.id)}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                <h4 className="text-xl text-primary mb-2">{plan.nombre}</h4>
                <p>{plan.precio}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
