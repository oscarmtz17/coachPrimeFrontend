// src/hooks/useAddRoutineForm.ts
import { useState } from "react";
import api from "../services/api";

interface DiaEntrenamiento {
  diaSemana: string;
  agrupaciones: Agrupacion[];
}

interface Agrupacion {
  tipo: string;
  ejercicios: Ejercicio[];
}

interface Ejercicio {
  nombre: string;
  series: number;
  repeticiones: number;
  imagenUrl: string;
  imagenKey: string;
}

interface Routine {
  nombre: string;
  descripcion: string;
  clienteId: number;
  usuarioId: number;
  diasEntrenamiento: DiaEntrenamiento[];
}

export const useAddRoutineForm = (
  clienteId: number,
  usuarioId: number,
  onRoutineAdded: () => void,
  onClose: () => void
) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [diasEntrenamiento, setDiasEntrenamiento] = useState<
    DiaEntrenamiento[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<{
    dayIndex: number;
    groupIndex: number;
    exerciseIndex: number;
  } | null>(null);

  const handleAddRoutine = async () => {
    if (
      !diasEntrenamiento.some((dia) =>
        dia.agrupaciones.some((agrupacion) => agrupacion.ejercicios.length > 0)
      )
    ) {
      alert("Debes agregar al menos un ejercicio a tu rutina.");
      return;
    }

    try {
      const routine: Routine = {
        nombre,
        descripcion,
        clienteId,
        usuarioId,
        diasEntrenamiento,
      };

      await api.post("/rutina", routine);
      onRoutineAdded();
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Error al agregar la rutina.");
    }
  };

  const resetForm = () => {
    setNombre("");
    setDescripcion("");
    setDiasEntrenamiento([]);
  };

  const openImageSelector = (
    dayIndex: number,
    groupIndex: number,
    exerciseIndex: number
  ) => {
    setSelectedExercise({ dayIndex, groupIndex, exerciseIndex });
    setIsImageSelectorOpen(true);
  };

  const closeImageSelector = () => setIsImageSelectorOpen(false);

  const handleSelectImage = (key: string, url: string) => {
    if (selectedExercise) {
      const { dayIndex, groupIndex, exerciseIndex } = selectedExercise;
      const updatedDays = [...diasEntrenamiento];

      updatedDays[dayIndex].agrupaciones[groupIndex].ejercicios[
        exerciseIndex
      ].imagenUrl = url; // Guardar URL completa para la vista en el form
      updatedDays[dayIndex].agrupaciones[groupIndex].ejercicios[
        exerciseIndex
      ].imagenKey = key;
      setDiasEntrenamiento(updatedDays);
    }
    closeImageSelector();
  };

  const handleRemoveImage = (
    dayIndex: number,
    groupIndex: number,
    exerciseIndex: number
  ) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones[groupIndex].ejercicios[
      exerciseIndex
    ].imagenUrl = "";
    setDiasEntrenamiento(updatedDays);
  };

  const handleAddDay = () => {
    const newDay: DiaEntrenamiento = { diaSemana: "", agrupaciones: [] };
    setDiasEntrenamiento([...diasEntrenamiento, newDay]);
  };

  const handleRemoveDay = (dayIndex: number) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays.splice(dayIndex, 1);
    setDiasEntrenamiento(updatedDays);
  };

  const handleDayChange = (index: number, diaSemana: string) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays[index].diaSemana = diaSemana;
    setDiasEntrenamiento(updatedDays);
  };

  const handleAddGroup = (index: number, tipo: string) => {
    const newGroup: Agrupacion = {
      tipo,
      ejercicios: createInitialExercises(tipo),
    };

    const updatedDays = [...diasEntrenamiento];
    updatedDays[index].agrupaciones.push(newGroup);
    setDiasEntrenamiento(updatedDays);
  };

  const createInitialExercises = (tipo: string): Ejercicio[] => {
    let exerciseCount = 1;
    switch (tipo) {
      case "Bi-Serie":
        exerciseCount = 2;
        break;
      case "Tri-Serie":
        exerciseCount = 3;
        break;
      case "Cuatri-Serie":
        exerciseCount = 4;
        break;
      case "Circuito":
        exerciseCount = 0;
        break;
      default:
        exerciseCount = 1;
    }

    return Array.from({ length: exerciseCount }, () => ({
      nombre: "",
      series: 1,
      repeticiones: 1,
      imagenUrl: "",
      imagenKey: "",
    }));
  };

  const handleRemoveGroup = (dayIndex: number, groupIndex: number) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones.splice(groupIndex, 1);
    setDiasEntrenamiento(updatedDays);
  };

  const handleExerciseChange = (
    dayIndex: number,
    groupIndex: number,
    exerciseIndex: number,
    field: keyof Ejercicio,
    value: string | number
  ) => {
    const updatedDays = [...diasEntrenamiento];
    const group = updatedDays[dayIndex].agrupaciones[groupIndex];
    const updatedValue =
      field === "series" || field === "repeticiones"
        ? Math.max(1, Number(value))
        : value;

    group.ejercicios[exerciseIndex] = {
      ...group.ejercicios[exerciseIndex],
      [field]: updatedValue,
    };
    setDiasEntrenamiento(updatedDays);
  };

  const handleAddExerciseToCircuit = (dayIndex: number, groupIndex: number) => {
    const newExercise: Ejercicio = {
      nombre: "",
      series: 1,
      repeticiones: 1,
      imagenUrl: "",
      imagenKey: "",
    };

    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones[groupIndex].ejercicios.push(newExercise);
    setDiasEntrenamiento(updatedDays);
  };

  const handleRemoveExerciseFromCircuit = (
    dayIndex: number,
    groupIndex: number,
    exerciseIndex: number
  ) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones[groupIndex].ejercicios.splice(
      exerciseIndex,
      1
    );
    setDiasEntrenamiento(updatedDays);
  };

  return {
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    diasEntrenamiento,
    setDiasEntrenamiento,
    error,
    setError,
    isImageSelectorOpen,
    openImageSelector,
    closeImageSelector,
    handleSelectImage,
    handleRemoveImage,
    handleAddDay,
    handleRemoveDay,
    handleDayChange,
    handleAddGroup,
    handleRemoveGroup,
    handleExerciseChange,
    handleAddExerciseToCircuit,
    handleAddRoutine,
    handleRemoveExerciseFromCircuit,
  };
};
