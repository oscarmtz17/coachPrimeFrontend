// src/hooks/useEditDietForm.ts
import { useState, useEffect } from "react";
import api from "../services/api";

interface Alimento {
  nombre: string;
  cantidad: number;
  unidad: string;
}

interface Comida {
  nombre: string;
  orden: number;
  hora: string;
  alimentos: Alimento[];
}

export const useEditDietForm = (
  clienteId: number,
  dietaId: number,
  onDietUpdated: () => void,
  onClose: () => void
) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [notas, setNotas] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDietDetails = async () => {
      try {
        const response = await api.get(`/dieta/${clienteId}/${dietaId}`);
        const adaptedDiet = {
          ...response.data,
          comidas: response.data.comidas.$values.map((comida: any) => ({
            ...comida,
            alimentos: comida.alimentos.$values,
          })),
        };

        setNombre(adaptedDiet.nombre);
        setDescripcion(adaptedDiet.descripcion);
        setComidas(adaptedDiet.comidas);
        setNotas(adaptedDiet.notas);
      } catch (error) {
        setError("Error al cargar los detalles de la dieta.");
        console.error(error);
      }
    };

    fetchDietDetails();
  }, [clienteId, dietaId]);

  const handleUpdateDiet = async () => {
    try {
      const diet = {
        nombre,
        descripcion,
        clienteId,
        comidas: comidas.map((comida) => ({
          nombre: comida.nombre,
          orden: comida.orden,
          hora: comida.hora,
          alimentos: comida.alimentos,
        })),
        notas,
      };

      await api.put(`/dieta/${clienteId}/${dietaId}`, diet);
      alert("Dieta actualizada exitosamente.");
      onDietUpdated();
      onClose();
    } catch (err: any) {
      setError(err.response?.data || "Error al actualizar la dieta");
      console.error(err);
    }
  };

  const handleComidaChange = (
    index: number,
    field: keyof Comida,
    value: any
  ) => {
    const updatedComidas = [...comidas];
    updatedComidas[index] = { ...updatedComidas[index], [field]: value };
    setComidas(updatedComidas);
  };

  const handleAlimentoChange = (
    comidaIndex: number,
    alimentoIndex: number,
    field: keyof Alimento,
    value: any
  ) => {
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos[alimentoIndex] = {
      ...updatedComidas[comidaIndex].alimentos[alimentoIndex],
      [field]: value,
    };
    setComidas(updatedComidas);
  };

  const handleAddComida = () => {
    setComidas([
      ...comidas,
      { nombre: "", orden: comidas.length + 1, hora: "", alimentos: [] },
    ]);
  };

  const handleRemoveComida = (index: number) => {
    const updatedComidas = comidas.filter((_, i) => i !== index);
    setComidas(updatedComidas);
  };

  const handleAddAlimento = (comidaIndex: number) => {
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos.push({
      nombre: "",
      cantidad: 0,
      unidad: "",
    });
    setComidas(updatedComidas);
  };

  const handleRemoveAlimento = (comidaIndex: number, alimentoIndex: number) => {
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos = updatedComidas[
      comidaIndex
    ].alimentos.filter((_, i) => i !== alimentoIndex);
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
    handleUpdateDiet,
    handleAddComida,
    handleRemoveComida,
    handleComidaChange,
    handleAddAlimento,
    handleRemoveAlimento,
    handleAlimentoChange,
  };
};
