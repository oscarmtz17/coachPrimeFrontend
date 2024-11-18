// src/hooks/useEditRoutineForm.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
}

export const useEditRoutineForm = (
  rutinaId: number,
  onRoutineUpdated: () => void,
  onClose: () => void
) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [diasEntrenamiento, setDiasEntrenamiento] = useState<
    DiaEntrenamiento[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<{
    dayIndex: number;
    groupIndex: number;
    exerciseIndex: number;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutineDetails = async () => {
      try {
        const response = await api.get(`/rutina/${rutinaId}`);
        const adaptedRoutine = {
          ...response.data,
          diasEntrenamiento: response.data.diasEntrenamiento.$values.map(
            (dia: any) => ({
              ...dia,
              agrupaciones: dia.agrupaciones.$values.map((agrupacion: any) => ({
                ...agrupacion,
                ejercicios: agrupacion.ejerciciosAgrupados.$values.map(
                  (ejercicioAgrupado: any) => ejercicioAgrupado.ejercicio
                ),
              })),
            })
          ),
        };
        setNombre(adaptedRoutine.nombre);
        setDescripcion(adaptedRoutine.descripcion);
        setDiasEntrenamiento(adaptedRoutine.diasEntrenamiento);
      } catch (error) {
        setError("Error al cargar la rutina.");
      }
    };
    fetchRoutineDetails();
  }, [rutinaId]);

  const handleDayChange = (index: number, diaSemana: string) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays[index].diaSemana = diaSemana;
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

  const handleAddGroup = (dayIndex: number, tipo: string) => {
    const newGroup: Agrupacion = {
      tipo,
      ejercicios: createInitialExercises(tipo),
    };
    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones.push(newGroup);
    setDiasEntrenamiento(updatedDays);
  };

  const handleRemoveGroup = (dayIndex: number, groupIndex: number) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones.splice(groupIndex, 1);
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
    }));
  };

  const handleAddExercise = (dayIndex: number, groupIndex: number) => {
    const newExercise: Ejercicio = {
      nombre: "",
      series: 1,
      repeticiones: 1,
      imagenUrl: "",
    };
    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones[groupIndex].ejercicios.push(newExercise);
    setDiasEntrenamiento(updatedDays);
  };

  const handleRemoveExercise = (
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

  const handleExerciseChange = (
    dayIndex: number,
    groupIndex: number,
    exerciseIndex: number,
    field: keyof Ejercicio,
    value: string | number
  ) => {
    const updatedDays = [...diasEntrenamiento];
    const group = updatedDays[dayIndex].agrupaciones[groupIndex];
    group.ejercicios[exerciseIndex] = {
      ...group.ejercicios[exerciseIndex],
      [field]: value,
    };
    setDiasEntrenamiento(updatedDays);
  };

  const handleUpdateRoutine = async () => {
    try {
      const routine = {
        nombre,
        descripcion,
        clienteId: 14, // Esto podría ajustarse según tus necesidades
        usuarioId: 17, // Esto también podría ajustarse
        diasEntrenamiento: diasEntrenamiento.map((dia) => ({
          diaSemana: dia.diaSemana,
          agrupaciones: dia.agrupaciones.map((agrupacion) => ({
            tipo: agrupacion.tipo,
            ejercicios: agrupacion.ejercicios,
          })),
        })),
      };

      const response = await api.put(`/rutina/${rutinaId}`, routine);

      setSuccessMessage(response.data);
      setError(null);
      onRoutineUpdated();
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data || "Error al actualizar la rutina");
      setSuccessMessage(null);
    }
  };

  // Funciones para seleccionar y eliminar imágenes
  const openImageSelector = (
    dayIndex: number,
    groupIndex: number,
    exerciseIndex: number
  ) => {
    setSelectedExercise({ dayIndex, groupIndex, exerciseIndex });
    setIsImageSelectorOpen(true);
  };

  const closeImageSelector = () => setIsImageSelectorOpen(false);

  const handleSelectImage = (url: string) => {
    if (selectedExercise) {
      const { dayIndex, groupIndex, exerciseIndex } = selectedExercise;
      const updatedDays = [...diasEntrenamiento];
      updatedDays[dayIndex].agrupaciones[groupIndex].ejercicios[
        exerciseIndex
      ].imagenUrl = url;
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
    error,
    successMessage,
    handleDayChange,
    handleAddDay,
    handleRemoveDay,
    handleAddGroup,
    handleRemoveGroup,
    handleRemoveExercise,
    handleExerciseChange,
    handleAddExercise,
    handleRemoveExerciseFromCircuit,
    handleUpdateRoutine,
    isImageSelectorOpen,
    openImageSelector,
    closeImageSelector,
    handleSelectImage,
    handleRemoveImage,
  };
};
