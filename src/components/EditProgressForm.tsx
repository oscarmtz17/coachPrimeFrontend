// src/components/EditProgressForm.tsx
import React, { useState } from "react";
import axios from "axios";

interface Progress {
  progresoId: number;
  fechaRegistro: string;
  pesoKg: number;
  estaturaCm: number;
  nivelActividad: string;
  factorActividad: number;
  cinturaCm: number;
  caderaCm: number;
  pechoCm: number;
  brazoCm: number;
  piernaCm: number;
  notas: string;
}

interface EditProgressFormProps {
  clienteId: number;
  progress: Progress;
  onSave: () => void;
  onClose: () => void;
}

const EditProgressForm: React.FC<EditProgressFormProps> = ({
  clienteId,
  progress,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<Progress>(progress);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "pesoKg" ||
        name === "estaturaCm" ||
        name === "factorActividad" ||
        name === "cinturaCm" ||
        name === "caderaCm" ||
        name === "pechoCm" ||
        name === "brazoCm" ||
        name === "piernaCm"
          ? Math.max(1, parsedValue) // Asegura que el valor sea al menos 1
          : value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5267/api/progreso/${clienteId}/${formData.progresoId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSave();
      onClose();
    } catch (err) {
      console.error("Error al actualizar el progreso:", err);
      setError("No se pudo actualizar el progreso.");
    }
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Editar Progreso</h3>
      {error && <p style={errorStyle}>{error}</p>}
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Peso (kg):</label>
        <input
          type="number"
          name="pesoKg"
          value={formData.pesoKg}
          min="1"
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Estatura (cm):</label>
        <input
          type="number"
          name="estaturaCm"
          value={formData.estaturaCm}
          min="1"
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Nivel de Actividad:</label>
        <input
          type="text"
          name="nivelActividad"
          value={formData.nivelActividad}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Factor de Actividad:</label>
        <input
          type="number"
          name="factorActividad"
          value={formData.factorActividad}
          min="1"
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Cintura (cm):</label>
        <input
          type="number"
          name="cinturaCm"
          value={formData.cinturaCm}
          min="1"
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Cadera (cm):</label>
        <input
          type="number"
          name="caderaCm"
          value={formData.caderaCm}
          min="1"
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Pecho (cm):</label>
        <input
          type="number"
          name="pechoCm"
          value={formData.pechoCm}
          min="1"
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Brazo (cm):</label>
        <input
          type="number"
          name="brazoCm"
          value={formData.brazoCm}
          min="1"
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Pierna (cm):</label>
        <input
          type="number"
          name="piernaCm"
          value={formData.piernaCm}
          min="1"
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Notas:</label>
        <textarea
          name="notas"
          value={formData.notas}
          onChange={handleChange}
          style={textareaStyle}
        />
      </div>
      <div style={buttonContainerStyle}>
        <button onClick={handleSave} style={saveButtonStyle}>
          Guardar Cambios
        </button>
        <button onClick={onClose} style={cancelButtonStyle}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

// Estilos adicionales
const containerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  maxWidth: "500px",
  margin: "0 auto",
};

const titleStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontSize: "1.8rem",
  textAlign: "center",
  marginBottom: "1rem",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  textAlign: "center",
  marginBottom: "1rem",
};

const inputContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginBottom: "1rem",
};

const labelStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontWeight: "bold",
};

const inputStyle: React.CSSProperties = {
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#555",
  color: "#fff",
};

const textareaStyle: React.CSSProperties = {
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#555",
  color: "#fff",
  resize: "vertical",
};

const buttonContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  marginTop: "1rem",
};

const saveButtonStyle: React.CSSProperties = {
  backgroundColor: "#ffcc00",
  color: "#000",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  flex: 1,
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: "#bbb",
  color: "#333",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  flex: 1,
};

export default EditProgressForm;
