import React, { useState, useEffect } from "react";
import Modal from "../components/Modal"; // Asumimos que tienes el componente de modal
import api from "../services/api";

const UserProfile: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [originalTelefono, setOriginalTelefono] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const userId = localStorage.getItem("userId");

  const fetchUserData = async () => {
    try {
      if (!userId) {
        console.error(
          "No se ha encontrado el ID de usuario en el almacenamiento local."
        );
        return;
      }
      const response = await api.get(`/usuario/${userId}`);
      const { nombre, apellido, phone, email } = response.data;
      setNombre(nombre);
      setApellido(apellido || "");
      setTelefono(phone || "");
      setOriginalTelefono(phone || "");
      setEmail(email);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserLogo = async () => {
    try {
      const response = await api.get(`/images/user-logo`, {
        params: { userId },
      });
      if (response.status === 200) {
        const logoUrl = response.data.url; // Asegúrate de usar 'url' en minúsculas
        setPreviewLogo(logoUrl);
      }
    } catch (error) {
      console.error("No se encontró un logo para el usuario:", error);
      setPreviewLogo(null); // Si no hay logo, mantenemos null
    }
  };

  // Llamar a fetchUserLogo cuando se cargue el componente
  useEffect(() => {
    fetchUserLogo();
  }, []);

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNombre(e.target.value);
  const handleApellidoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setApellido(e.target.value);

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setTelefono(value);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    fetchUserData();
    setError(null);
  };

  const checkPhoneExists = async (): Promise<boolean> => {
    try {
      const response = await api.get("/usuario/check-phone", {
        params: { phone: telefono },
      });
      return response.data.exists;
    } catch (error) {
      console.error("Error checking phone:", error);
      return false;
    }
  };

  const handleSaveChanges = async () => {
    if (telefono && telefono.length !== 10) {
      setError("El número de teléfono debe tener exactamente 10 dígitos.");
      return;
    }

    if (telefono !== originalTelefono) {
      const phoneExists = await checkPhoneExists();
      if (phoneExists) {
        setError("El número de teléfono ya está registrado por otro usuario.");
        return;
      }
    }

    try {
      await api.put(`/usuario/${userId}`, {
        nombre,
        apellido,
        phone: telefono,
      });
      alert("Cambios guardados exitosamente");
      setIsEditing(false);
      setError(null);
      fetchUserData();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Hubo un error al intentar guardar los cambios");
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setLogo(file);
      setPreviewLogo(URL.createObjectURL(file));
    } else {
      alert("Por favor, seleccione un archivo en formato JPEG o PNG.");
      e.target.value = "";
    }
  };

  const handleUploadLogo = async () => {
    if (!logo) return;

    const formData = new FormData();
    formData.append("file", logo);

    try {
      const response = await api.post("/images/upload-logo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Logo subido exitosamente.");
      setPreviewLogo(response.data.Url); // Muestra el logo subido al usuario
    } catch (error) {
      console.error("Error al subir el logo:", error);
      alert("Hubo un problema al subir el logo. Intente nuevamente.");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordError(null);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError("Las nuevas contraseñas no coinciden.");
      return;
    }

    try {
      // Llama al nuevo endpoint para cambiar la contraseña
      await api.post(`/auth/change-password`, {
        currentPassword: currentPassword,
        newPassword: newPassword,
      });

      alert("Contraseña actualizada exitosamente");
      closeModal();
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setPasswordError(error.response.data);
      } else {
        setPasswordError(
          "Error al actualizar la contraseña. Intenta nuevamente."
        );
      }
      console.error("Error al cambiar la contraseña:", error);
    }
  };

  const handleNewPasswordBlur = () => {
    if (
      newPassword &&
      confirmNewPassword &&
      newPassword !== confirmNewPassword
    ) {
      setPasswordError("Las nuevas contraseñas no coinciden.");
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmNewPasswordBlur = () => {
    if (
      newPassword &&
      confirmNewPassword &&
      newPassword !== confirmNewPassword
    ) {
      setPasswordError("Las nuevas contraseñas no coinciden.");
    } else {
      setPasswordError(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#222",
        color: "#ffcc00",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
        Perfil del Usuario
      </h2>

      <div style={{ width: "100%", maxWidth: "500px", textAlign: "center" }}>
        {/* Aquí están todos los campos y botones originales */}

        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Nombre:
        </label>
        <input
          type="text"
          value={nombre}
          onChange={handleNombreChange}
          disabled={!isEditing}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #bbb",
            backgroundColor: isEditing ? "#333" : "#555",
            color: "#fff",
          }}
        />

        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Apellido:
        </label>
        <input
          type="text"
          value={apellido}
          onChange={handleApellidoChange}
          disabled={!isEditing}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #bbb",
            backgroundColor: isEditing ? "#333" : "#555",
            color: "#fff",
          }}
        />

        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Teléfono:
        </label>
        <input
          type="text"
          value={telefono}
          onChange={handleTelefonoChange}
          disabled={!isEditing}
          maxLength={10}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #bbb",
            backgroundColor: isEditing ? "#333" : "#555",
            color: "#fff",
          }}
        />

        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Email:
        </label>
        <input
          type="email"
          value={email}
          disabled
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #bbb",
            backgroundColor: "#555",
            color: "#fff",
          }}
        />
        <p
          style={{
            fontSize: "0.9rem",
            color: "#ffcc00",
            marginTop: "-0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          El email no se puede modificar
        </p>

        {isEditing ? (
          <>
            <button
              onClick={handleSaveChanges}
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
                marginBottom: "1rem",
              }}
            >
              Guardar Cambios
            </button>
            <button
              onClick={handleCancel}
              style={{
                backgroundColor: "#f44336",
                color: "#fff",
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
                marginBottom: "2rem",
              }}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              marginBottom: "2rem",
            }}
          >
            Editar Datos
          </button>
        )}

        <button
          onClick={openModal}
          style={{
            backgroundColor: "#ffcc00",
            color: "#000",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          Cambiar Contraseña
        </button>

        <h3
          style={{
            fontSize: "1.5rem",
            color: "#ffcc00",
            marginBottom: "1rem",
          }}
        >
          {previewLogo ? "Cambiar Logo" : "Subir Logo"}
        </h3>
        <input
          type="file"
          onChange={handleLogoChange}
          style={{ marginBottom: "1rem", color: "#fff" }}
        />

        {previewLogo && (
          <div style={{ marginBottom: "1rem" }}>
            <img
              src={previewLogo}
              alt="Preview Logo"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}

        <button
          onClick={handleUploadLogo}
          disabled={!logo}
          style={{
            backgroundColor: logo ? "#007bff" : "#ccc",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "5px",
            cursor: logo ? "pointer" : "not-allowed",
            width: "100%",
          }}
        >
          Subir Logotipo
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3 style={{ color: "#ffcc00", textAlign: "center" }}>
          Cambiar Contraseña
        </h3>
        <div
          style={{
            justifyContent: "center",
            width: "80%",
            marginLeft: "10%",
          }}
        >
          <label>Contraseña Actual:</label>
          <div style={{ position: "relative" }}>
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={inputStyle}
            />
            <button
              onMouseDown={() => setShowCurrentPassword(true)}
              onMouseUp={() => setShowCurrentPassword(false)}
              style={showButtonStyle}
            >
              Mostrar
            </button>
          </div>

          <label>Nueva Contraseña:</label>
          <div style={{ position: "relative" }}>
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={handleNewPasswordBlur}
              style={inputStyle}
            />
            <button
              onMouseDown={() => setShowNewPassword(true)}
              onMouseUp={() => setShowNewPassword(false)}
              style={showButtonStyle}
            >
              Mostrar
            </button>
          </div>

          <label>Confirmar Nueva Contraseña:</label>
          <div style={{ position: "relative" }}>
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              onBlur={handleConfirmNewPasswordBlur}
              style={inputStyle}
            />
            <button
              onMouseDown={() => setShowConfirmNewPassword(true)}
              onMouseUp={() => setShowConfirmNewPassword(false)}
              style={showButtonStyle}
            >
              Mostrar
            </button>
          </div>

          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button onClick={handleChangePassword} style={buttonStyle("#4CAF50")}>
            Aceptar
          </button>
          <button onClick={closeModal} style={buttonStyle("#f44336")}>
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

// Estilos adicionales
const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  marginBottom: "1rem",
  borderRadius: "4px",
  border: "1px solid #bbb",
  backgroundColor: "#333",
  color: "#fff",
};

const buttonStyle = (bgColor: string) => ({
  backgroundColor: bgColor,
  color: "#fff",
  padding: "0.75rem 1.5rem",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
});

const showButtonStyle: React.CSSProperties = {
  position: "absolute",
  right: "10px",
  top: "8px",
  backgroundColor: "transparent",
  border: "none",
  color: "#ffcc00",
  cursor: "pointer",
};

export default UserProfile;