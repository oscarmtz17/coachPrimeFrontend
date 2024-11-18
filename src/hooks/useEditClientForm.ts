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

export const useEditClientForm = (
  client: Client,
  onSave: () => void,
  onClose: () => void // Añadimos onClose
) => {
  const [nombre, setNombre] = useState(client.nombre);
  const [apellido, setApellido] = useState(client.apellido);
  const [email, setEmail] = useState(client.email);
  const [telefono, setTelefono] = useState(client.telefono);
  const [sexo, setSexo] = useState(client.sexo); // Aseguramos que esto se actualice correctamente
  const [error, setError] = useState<string | null>(null);

  const handleCapitalize = (value: string, setter: (arg0: string) => void) => {
    const capitalized = value
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setter(capitalized);
  };

  const handleTelefonoChange = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
    setTelefono(onlyNumbers.slice(0, 10)); // Limitar a 10 dígitos
  };

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
      onClose(); // Cerramos el formulario al finalizar
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
    handleCapitalize,
    handleTelefonoChange,
  };
};
