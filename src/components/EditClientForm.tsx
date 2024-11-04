// src/components/EditClientForm.tsx
import React, { useState } from "react";
import axios from "axios";
import api from "../services/api";

interface EditClientFormProps {
  client: {
    clienteId: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    sexo: string;
    usuarioId: number;
  };
  onClose: () => void;
  onSave: () => void;
}

const EditClientForm: React.FC<EditClientFormProps> = ({
  client,
  onClose,
  onSave,
}) => {
  const [nombre, setNombre] = useState(client.nombre);
  const [apellido, setApellido] = useState(client.apellido);
  const [email, setEmail] = useState(client.email);
  const [telefono, setTelefono] = useState(client.telefono);
  const [sexo, setSexo] = useState(client.sexo);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`/cliente/${client.clienteId}`, {
        nombre,
        apellido,
        email,
        telefono,
        sexo,
        usuarioId: client.usuarioId,
      });

      onSave();
    } catch (err) {
      setError("Error al actualizar el cliente. Intenta de nuevo.");
      console.error(err);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h3 style={titleStyle}>Editar Cliente</h3>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputContainerStyle}>
          <label htmlFor="nombre" style={labelStyle}>
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="apellido" style={labelStyle}>
            Apellido
          </label>
          <input
            id="apellido"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="email" style={labelStyle}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="telefono" style={labelStyle}>
            Teléfono
          </label>
          <input
            id="telefono"
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="sexo" style={labelStyle}>
            Sexo
          </label>
          <input
            id="sexo"
            type="text"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            required
            style={inputStyle}
          />
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

const formContainerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const titleStyle: React.CSSProperties = {
  color: "#ffcc00",
  textAlign: "center",
  fontSize: "1.8rem",
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

export default EditClientForm;
