import React from "react";
import Modal from "../components/Modal";
import { useUserProfile } from "../hooks/useUserProfile";
import UserProfileStyles from "../styles/UserProfileStyles";

const UserProfile: React.FC = () => {
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

  return (
    <div style={UserProfileStyles.container}>
      <h2 style={UserProfileStyles.title}>Perfil del Usuario</h2>
      <div style={UserProfileStyles.form}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={handleNombreChange}
          disabled={!isEditing}
          style={UserProfileStyles.input}
        />
        <label>Apellido:</label>
        <input
          type="text"
          value={apellido}
          onChange={handleApellidoChange}
          disabled={!isEditing}
          style={UserProfileStyles.input}
        />
        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={handleTelefonoChange}
          disabled={!isEditing}
          maxLength={10}
          style={UserProfileStyles.input}
        />
        {error && <p style={UserProfileStyles.error}>{error}</p>}
        <label>Email:</label>
        <input
          type="email"
          value={email}
          disabled
          style={UserProfileStyles.input}
        />
        <p style={UserProfileStyles.emailAdvice}>
          El email no se puede modificar
        </p>

        {isEditing ? (
          <>
            <button
              onClick={handleSaveChanges}
              style={UserProfileStyles.saveButton}
            >
              Guardar Cambios
            </button>
            <button
              onClick={handleCancel}
              style={UserProfileStyles.cancelButton}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button onClick={handleEdit} style={UserProfileStyles.editButton}>
            Editar Datos
          </button>
        )}

        <button onClick={openModal} style={UserProfileStyles.modalButton}>
          Cambiar Contraseña
        </button>

        <h3 style={UserProfileStyles.logoTitle}>
          {previewLogo ? "Cambiar Logo" : "Subir Logo"}
        </h3>
        <input
          type="file"
          onChange={handleLogoChange}
          style={UserProfileStyles.fileInput}
        />
        {previewLogo && (
          <img
            src={previewLogo}
            alt="Logo"
            style={UserProfileStyles.previewImage}
          />
        )}
        <button
          onClick={handleUploadLogo}
          disabled={!logo}
          style={
            logo
              ? UserProfileStyles.uploadButton
              : UserProfileStyles.uploadButtonDisabled
          }
        >
          Subir Logotipo
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div style={UserProfileStyles.modalContainer}>
          <h3 style={UserProfileStyles.modalTitle}>Cambiar Contraseña</h3>
          <div style={UserProfileStyles.passwordContainer}>
            <label>Contraseña Actual:</label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={UserProfileStyles.input}
              />
              <button
                onMouseDown={() => setShowCurrentPassword(true)}
                onMouseUp={() => setShowCurrentPassword(false)}
                style={UserProfileStyles.showButton}
              >
                {showCurrentPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <label>Nueva Contraseña:</label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={validatePasswords} // Validar al perder el foco
                style={UserProfileStyles.input}
              />

              <button
                onMouseDown={() => setShowNewPassword(true)}
                onMouseUp={() => setShowNewPassword(false)}
                style={UserProfileStyles.showButton}
              >
                {showNewPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <label>Confirmar Nueva Contraseña:</label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                onBlur={validatePasswords} // Validar al perder el foco
                style={UserProfileStyles.input}
              />

              <button
                onMouseDown={() => setShowConfirmNewPassword(true)}
                onMouseUp={() => setShowConfirmNewPassword(false)}
                style={UserProfileStyles.showButton}
              >
                {showConfirmNewPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          {passwordError && (
            <p style={UserProfileStyles.error}>{passwordError}</p>
          )}

          <div style={UserProfileStyles.modalFooter}>
            <button
              onClick={handleChangePassword}
              disabled={
                !currentPassword ||
                !newPassword ||
                !confirmNewPassword ||
                !!passwordError
              }
              style={UserProfileStyles.saveButton}
            >
              Aceptar
            </button>

            <button onClick={closeModal} style={UserProfileStyles.cancelButton}>
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
