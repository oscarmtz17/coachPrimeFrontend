import React, { useState, useEffect } from "react";
import api from "../services/api"; // Servicio para realizar peticiones HTTP al backend

const UserProfile: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState(""); // Nuevo estado para el email
  const [isEditing, setIsEditing] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
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
      setEmail(email); // Precargar el email
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNombre(e.target.value);
  const handleApellidoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setApellido(e.target.value);
  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTelefono(e.target.value);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    fetchUserData();
  };

  const handleSaveChanges = async () => {
    try {
      await api.put(`/usuario/${userId}`, {
        nombre,
        apellido,
        phone: telefono,
      });
      alert("Cambios guardados exitosamente");
      setIsEditing(false);
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

  const handleUploadLogo = () => {
    if (logo) {
      alert("Logotipo subido");
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
          type="number"
          value={telefono}
          onChange={handleTelefonoChange}
          disabled={!isEditing}
          maxLength={10}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "2rem",
            borderRadius: "4px",
            border: "1px solid #bbb",
            backgroundColor: isEditing ? "#333" : "#555",
            color: "#fff",
          }}
        />

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

        <h3
          style={{ fontSize: "1.5rem", color: "#ffcc00", marginBottom: "1rem" }}
        >
          Subir Logotipo
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
    </div>
  );
};

export default UserProfile;
