// src/components/AddClientForm.tsx
import React, { useState } from "react";
import axios from "axios";
import api from "../services/api";

interface AddClientFormProps {
  onClose: () => void;
  onSave: () => void;
}

const AddClientForm: React.FC<AddClientFormProps> = ({ onClose, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("Masculino");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const newClient = {
        nombre,
        apellido,
        email,
        telefono,
        sexo,
        dietas: [], // Asumimos que dietas es una lista vacía inicialmente
      };

      await api.post("/cliente", newClient);

      onSave(); // Actualiza la lista y cierra el formulario
    } catch (error) {
      setError("Error al agregar el cliente.");
      console.error(error);
    }
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Agregar Cliente</h3>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Teléfono</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Sexo</label>
          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            style={selectStyle}
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div style={buttonContainerStyle}>
          <button type="submit" style={saveButtonStyle}>
            Guardar
          </button>
          <button type="button" onClick={onClose} style={cancelButtonStyle}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

// Estilos
const containerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  maxWidth: "400px",
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

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const inputContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
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

const selectStyle: React.CSSProperties = {
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#555",
  color: "#fff",
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

export default AddClientForm;
