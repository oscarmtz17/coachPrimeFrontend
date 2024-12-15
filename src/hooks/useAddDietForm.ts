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
  cantidad: string | number;
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
  const [isFormDirty, setIsFormDirty] = useState(false);

  const markAsDirty = () => setIsFormDirty(true);

  const handleAddDiet = async () => {
    try {
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
      setError(null);
      setIsFormDirty(false);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al agregar la dieta");
    }
  };

  const handleCloseWithConfirmation = () => {
    if (isFormDirty) {
      const confirmClose = window.confirm(
        "Si cierras el formulario sin guardar, se perderán los cambios. ¿Deseas continuar?"
      );
      if (confirmClose) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleAddComida = () => {
    markAsDirty();
    setComidas([
      ...comidas,
      {
        nombre: `Comida ${comidas.length + 1}`,
        orden: comidas.length + 1,
        hora: "00:00",
        alimentos: [],
      },
    ]);
  };

  const handleRemoveComida = (index: number) => {
    markAsDirty();
    const updatedComidas = [...comidas];
    updatedComidas.splice(index, 1);
    setComidas(updatedComidas);
  };

  const handleComidaChange = (
    index: number,
    field: keyof Comida,
    value: string
  ) => {
    markAsDirty();
    const updatedComidas = [...comidas];
    updatedComidas[index] = { ...updatedComidas[index], [field]: value };
    setComidas(updatedComidas);
  };

  const handleAddAlimento = (comidaIndex: number) => {
    markAsDirty();
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos.push({
      nombre: "",
      cantidad: 0,
      unidad: "",
    });
    setComidas(updatedComidas);
  };

  const handleRemoveAlimento = (comidaIndex: number, alimentoIndex: number) => {
    markAsDirty();
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
    markAsDirty();
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

  const handleCantidadChange = (
    value: string,
    comidaIndex: number,
    alimentoIndex: number
  ) => {
    markAsDirty();
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos[alimentoIndex] = {
      ...updatedComidas[comidaIndex].alimentos[alimentoIndex],
      cantidad: value,
    };
    setComidas(updatedComidas);
  };

  return {
    nombre,
    descripcion,
    notas,
    comidas,
    error,
    setNombre: (value: string) => {
      setNombre(value);
      markAsDirty();
    },
    setDescripcion: (value: string) => {
      setDescripcion(value);
      markAsDirty();
    },
    setNotas: (value: string) => {
      setNotas(value);
      markAsDirty();
    },
    handleAddDiet,
    handleAddComida,
    handleRemoveComida,
    handleComidaChange,
    handleAddAlimento,
    handleRemoveAlimento,
    handleAlimentoChange,
    handleCantidadChange,
    handleCloseWithConfirmation,
  };
};
