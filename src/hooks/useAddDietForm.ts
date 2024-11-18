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
      // Validar si hay al menos un alimento en la dieta
      const hasAlimentos = comidas.some(
        (comida) => comida.alimentos.length > 0
      );
      if (!hasAlimentos) {
        setError(
          "Debes agregar al menos un alimento a tu dieta antes de guardarla."
        );
        return; // Detener la ejecución si no hay alimentos
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
    updatedComidas[comidaIndex].alimentos[alimentoIndex] = {
      ...updatedComidas[comidaIndex].alimentos[alimentoIndex],
      [field]: value,
    };
    setComidas(updatedComidas);
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
