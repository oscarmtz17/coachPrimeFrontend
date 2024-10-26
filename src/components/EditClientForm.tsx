// src/components/EditClientForm.tsx
import React, { useState } from "react";
import axios from "axios";

interface EditClientFormProps {
  client: {
    clienteId: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    sexo: string;
    usuarioId: number; // Asegúrate de que el usuarioId esté presente
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
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5267/api/cliente/${client.clienteId}`,
        {
          nombre,
          apellido,
          email,
          telefono,
          sexo,
          usuarioId: client.usuarioId, // Asegura que el usuarioId esté incluido en el cuerpo
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSave();
    } catch (err) {
      setError("Error al actualizar el cliente. Intenta de nuevo.");
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Editar Cliente</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="apellido">Apellido</label>
          <input
            id="apellido"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="sexo">Sexo</label>
          <input
            id="sexo"
            type="text"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditClientForm;
