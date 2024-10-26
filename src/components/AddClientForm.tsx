// src/components/AddClientForm.tsx
import React, { useState } from "react";
import axios from "axios";

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

      await axios.post("http://localhost:5267/api/cliente", newClient, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onSave(); // Actualiza la lista y cierra el formulario
    } catch (error) {
      setError("Error al agregar el cliente.");
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Agregar Cliente</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Teléfono</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sexo</label>
          <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default AddClientForm;
