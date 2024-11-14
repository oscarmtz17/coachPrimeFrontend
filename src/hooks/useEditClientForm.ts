// src/hooks/useEditClientForm.ts
import { useState } from "react";
import api from "../services/api";

interface Client {
  clienteId: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  sexo: string;
  usuarioId: number;
}

export const useEditClientForm = (client: Client, onSave: () => void) => {
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

  return {
    nombre,
    apellido,
    email,
    telefono,
    sexo,
    setNombre,
    setApellido,
    setEmail,
    setTelefono,
    setSexo,
    error,
    handleSubmit,
  };
};
