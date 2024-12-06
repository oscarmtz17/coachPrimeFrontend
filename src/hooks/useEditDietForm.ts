// src/hooks/useEditDietForm.ts
import { useState, useEffect } from "react";
import api from "../services/api";

interface Alimento {
  nombre: string;
  cantidad: string | number;
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
          "Debes agregar al menos un alimento a tu dieta antes de actualizarla."
        );
        return;
      }

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
      setError(null); // Limpiar cualquier error previo
      onDietUpdated();
      onClose();
    } catch (err: any) {
      // Manejar error del backend
      if (err.response?.data?.error) {
        setError(err.response.data.error); // Mostrar el mensaje específico del backend
      } else {
        setError("Error al actualizar la dieta"); // Mensaje genérico en caso de error inesperado
      }
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

  const handleCantidadChange = (
    value: string,
    comidaIndex: number,
    alimentoIndex: number
  ) => {
    const updatedComidas = [...comidas];

    // Actualizar el estado directamente con la cadena
    updatedComidas[comidaIndex].alimentos[alimentoIndex] = {
      ...updatedComidas[comidaIndex].alimentos[alimentoIndex],
      cantidad: value, // Almacenar temporalmente como cadena
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
    handleUpdateDiet,
    handleAddComida,
    handleRemoveComida,
    handleComidaChange,
    handleAddAlimento,
    handleRemoveAlimento,
    handleAlimentoChange,
    handleCantidadChange,
  };
};
