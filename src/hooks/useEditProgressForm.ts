// src/hooks/useEditProgressForm.ts
import { useState } from "react";
import api from "../services/api";

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

const useEditProgressForm = (
  clienteId: number,
  progress: Progress,
  onSave: () => void,
  onClose: () => void
) => {
  const [formData, setFormData] = useState<Progress>(progress);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: [
        "pesoKg",
        "estaturaCm",
        "factorActividad",
        "cinturaCm",
        "caderaCm",
        "pechoCm",
        "brazoCm",
        "piernaCm",
      ].includes(name)
        ? Math.max(1, parsedValue)
        : value,
    }));
  };

  const handleSave = async () => {
    try {
      await api.put(`/progreso/${clienteId}/${formData.progresoId}`, formData);
      onSave();
      onClose();
    } catch (err) {
      console.error("Error al actualizar el progreso:", err);
      setError("No se pudo actualizar el progreso.");
    }
  };

  return { formData, error, handleChange, handleSave };
};

export default useEditProgressForm;
