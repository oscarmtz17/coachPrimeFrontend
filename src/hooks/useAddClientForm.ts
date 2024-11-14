// src/hooks/useAddClientForm.ts
import { useState } from "react";
import api from "../services/api";

export const useAddClientForm = (onClose: () => void, onSave: () => void) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("Masculino");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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
      setNombre("");
      setApellido("");
      setEmail("");
      setTelefono("");
      setSexo("Masculino");
      onClose();
    } catch (error) {
      setError("Error al agregar el cliente.");
      console.error(error);
    }
  };

  return {
    nombre,
    apellido,
    email,
    telefono,
    sexo,
    error,
    setNombre,
    setApellido,
    setEmail,
    setTelefono,
    setSexo,
    handleSubmit,
  };
};
