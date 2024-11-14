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
      onClose();
    } catch (err) {
      setError("Error al agregar la dieta");
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
