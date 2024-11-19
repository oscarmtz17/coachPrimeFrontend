// src/hooks/useAddDietForm.ts
import { useState } from "react";
import api from "../services/api";

interface Diet {
  nombre: string;
  descripcion: string;
  clienteId: number;
  comidas: Comida[];
  notas: string;
}

interface Comida {
  nombre: string;
  orden: number;
  hora: string;
  alimentos: Alimento[];
}

interface Alimento {
  nombre: string;
  cantidad: number;
  unidad: string;
}

export const useAddDietForm = (
  clienteId: number,
  onDietAdded: () => void,
  onClose: () => void
) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [notas, setNotas] = useState("");
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddDiet = async () => {
    try {
      // Validar que el nombre de la dieta no esté vacío y no exceda 100 caracteres
      if (!nombre.trim()) {
        setError("El nombre de la dieta es obligatorio.");
        return;
      }

      if (nombre.length > 100) {
        setError("El nombre de la dieta no puede exceder 100 caracteres.");
        return;
      }

      // Validar si hay al menos una comida con nombre y al menos un alimento
      const invalidComida = comidas.some((comida) => !comida.nombre.trim());
      if (invalidComida) {
        setError("Todas las comidas deben tener un nombre.");
        return;
      }

      const invalidAlimento = comidas.some((comida) =>
        comida.alimentos.some((alimento) => !alimento.nombre.trim())
      );
      if (invalidAlimento) {
        setError("Todos los alimentos deben tener un nombre.");
        return;
      }

      // Validar si hay al menos un alimento en la dieta
      const hasAlimentos = comidas.some(
        (comida) => comida.alimentos.length > 0
      );
      if (!hasAlimentos) {
        setError(
          "Debes agregar al menos un alimento a tu dieta antes de guardarla."
        );
        return;
      }

      const diet: Diet = {
        nombre,
        descripcion,
        clienteId,
        comidas,
        notas,
      };

      await api.post(`/dieta/${clienteId}`, diet);

      onDietAdded();
      setNombre("");
      setDescripcion("");
      setNotas("");
      setComidas([]);
      setError(null); // Limpiar cualquier error previo
      onClose();
    } catch (err: any) {
      // Manejar error del backend
      if (err.response?.data?.error) {
        setError(err.response.data.error); // Mostrar el mensaje específico del backend
      } else {
        setError("Error al agregar la dieta"); // Mensaje genérico en caso de error inesperado
      }
      console.error(err);
    }
  };

  const handleAddComida = () => {
    const newComida: Comida = {
      nombre: "",
      orden: comidas.length + 1,
      hora: "",
      alimentos: [],
    };
    setComidas([...comidas, newComida]);
  };

  const handleRemoveComida = (index: number) => {
    const updatedComidas = [...comidas];
    updatedComidas.splice(index, 1);
    setComidas(updatedComidas);
  };

  const handleComidaChange = (
    index: number,
    field: keyof Comida,
    value: string
  ) => {
    const updatedComidas = [...comidas];
    updatedComidas[index] = { ...updatedComidas[index], [field]: value };
    setComidas(updatedComidas);
  };

  const handleAddAlimento = (comidaIndex: number) => {
    const newAlimento: Alimento = { nombre: "", cantidad: 0, unidad: "" };
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos.push(newAlimento);
    setComidas(updatedComidas);
  };

  const handleRemoveAlimento = (comidaIndex: number, alimentoIndex: number) => {
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos.splice(alimentoIndex, 1);
    setComidas(updatedComidas);
  };

  const handleAlimentoChange = (
    comidaIndex: number,
    alimentoIndex: number,
    field: keyof Alimento,
    value: string | number
  ) => {
    const updatedComidas = [...comidas];

    if (field === "cantidad") {
      // Validar que la cantidad no sea negativa
      const numericValue = Number(value);
      if (numericValue < 0) {
        setError("La cantidad no puede ser negativa.");
        return;
      }
    }

    updatedComidas[comidaIndex].alimentos[alimentoIndex] = {
      ...updatedComidas[comidaIndex].alimentos[alimentoIndex],
      [field]: value,
    };
    setComidas(updatedComidas);
    setError(null); // Limpiar cualquier mensaje de error anterior
  };

  return {
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    notas,
    setNotas,
    comidas,
    error,
    handleAddDiet,
    handleAddComida,
    handleRemoveComida,
    handleComidaChange,
    handleAddAlimento,
    handleRemoveAlimento,
    handleAlimentoChange,
  };
};
