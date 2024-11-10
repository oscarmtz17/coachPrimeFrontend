import React, { useState } from "react";

const UserProfile: React.FC = () => {
  const [nombre, setNombre] = useState("Grecia Dancer");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNombre(e.target.value);
  const handleApellidoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setApellido(e.target.value);
  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTelefono(e.target.value);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setLogo(file);
      setPreviewLogo(URL.createObjectURL(file));
    } else {
      alert("Por favor, seleccione un archivo en formato JPEG o PNG.");
      e.target.value = ""; // Limpiar el input de archivo si el formato no es válido
    }
  };

  const handleSaveChanges = () => {
    // Aquí iría la lógica para guardar los cambios del perfil
    alert("Cambios guardados");
  };

  const handleUploadLogo = () => {
    if (logo) {
      // Aquí iría la lógica para subir el logo
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
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #bbb",
            backgroundColor: "#333",
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
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #bbb",
            backgroundColor: "#333",
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
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "2rem",
            borderRadius: "4px",
            border: "1px solid #bbb",
            backgroundColor: "#333",
            color: "#fff",
          }}
        />

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
            marginBottom: "2rem",
          }}
        >
          Guardar Cambios
        </button>

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
