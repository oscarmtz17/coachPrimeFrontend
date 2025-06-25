import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useUserProfile } from "../hooks/useUserProfile";

const UPGRADE_PLANS = [
  { id: 3, nombre: "Premium", precio: "$499/mes" },
  { id: 4, nombre: "Premium Anual", precio: "$4990/año" },
];

const UserProfile: React.FC = () => {
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
    handleManageSubscription,
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
  } = useUserProfile();

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center bg-dark text-primary min-h-screen p-8">
      <div className="w-full max-w-lg flex justify-start mb-4">
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
          Regresar al Dashboard
        </button>
      </div>
      <h2 className="text-3xl text-primary text-center mb-4">
        Perfil del Usuario
      </h2>
      <div className="w-full max-w-lg flex flex-col gap-4 bg-black bg-opacity-80 p-8 rounded-xl shadow-lg">
        <label className="text-primary font-bold">Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={handleNombreChange}
          disabled={!isEditing}
          className="w-full p-2 rounded border border-border-gray bg-dark-gray text-white text-base disabled:opacity-50"
        />
        <label className="text-primary font-bold">Apellido:</label>
        <input
          type="text"
          value={apellido}
          onChange={handleApellidoChange}
          disabled={!isEditing}
          className="w-full p-2 rounded border border-border-gray bg-dark-gray text-white text-base disabled:opacity-50"
        />
        <label className="text-primary font-bold">Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={handleTelefonoChange}
          disabled={!isEditing}
          maxLength={10}
          className="w-full p-2 rounded border border-border-gray bg-dark-gray text-white text-base disabled:opacity-50"
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <label className="text-primary font-bold">Email:</label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full p-2 rounded border border-border-gray bg-dark-gray text-white text-base opacity-50"
        />
        <p className="text-sm text-primary -mt-2 mb-6">
          El email no se puede modificar
        </p>
        {isEditing ? (
          <div className="flex justify-between gap-4">
            <button
              onClick={handleSaveChanges}
              className="flex-1 bg-success text-white py-3 px-6 border-none rounded cursor-pointer text-base"
            >
              Guardar Cambios
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-danger text-white py-3 px-6 border-none rounded cursor-pointer text-base"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="w-full bg-info text-white py-3 px-6 border-none rounded cursor-pointer mb-8"
          >
            Editar Datos
          </button>
        )}
        <button
          onClick={openModal}
          className="w-full bg-primary text-black py-3 px-6 border-none rounded cursor-pointer mb-4"
        >
          Cambiar Contraseña
        </button>
        <h3 className="text-xl text-primary font-bold mb-2">
          {previewLogo ? "Cambiar Logo" : "Subir Logo"}
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
          Subir Logotipo
        </button>
      </div>
      {/* Sección de Suscripción */}
      <div className="w-full max-w-lg mt-8 p-6 border border-primary rounded-lg bg-light-gray">
        <h3 className="text-2xl text-primary text-center mb-4">
          Tu Plan Actual
        </h3>
        {suscripcion ? (
          <>
            <p className="text-xl text-white mb-4">
              Plan:{" "}
              {suscripcion.planId === 1
                ? "Básico"
                : suscripcion.planId === 3
                ? "Premium"
                : suscripcion.planId === 4
                ? "Premium Anual"
                : "Desconocido"}
            </p>
            {suscripcion.planId === 1 && (
              <button
                onClick={() => setIsUpgradeModalOpen(true)}
                className="w-full bg-info text-white py-3 px-6 border-none rounded cursor-pointer text-base"
              >
                Mejorar Plan
              </button>
            )}
          </>
        ) : (
          <p className="text-white">Cargando información del plan...</p>
        )}
      </div>
      {/* Modal de cambio de contraseña */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col items-center justify-center w-96 mx-auto h-full">
          <h3 className="text-2xl text-primary mb-6">Cambiar Contraseña</h3>
          <div className="flex flex-col justify-center items-center gap-4 w-4/5 mx-auto">
            <label className="text-primary font-bold">Contraseña Actual:</label>
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
                {showCurrentPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <label className="text-primary font-bold">Nueva Contraseña:</label>
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
                {showNewPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <label className="text-primary font-bold">
              Confirmar Nueva Contraseña:
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
                {showConfirmNewPassword ? "Ocultar" : "Mostrar"}
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
                Aceptar
              </button>
              <button
                onClick={closeModal}
                className="bg-danger text-white py-3 px-6 border-none rounded cursor-pointer text-base hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-dark"
              >
                Cancelar
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
          <h3 className="text-2xl text-primary mb-6">Elige tu nuevo plan</h3>
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
