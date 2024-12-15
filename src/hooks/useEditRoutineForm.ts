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
  imagenKey: string;
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
  const [isFormDirty, setIsFormDirty] = useState(false);
  const navigate = useNavigate();

  const markAsDirty = () => setIsFormDirty(true);

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
                  (ejercicioAgrupado: any) => ({
                    nombre: ejercicioAgrupado.ejercicio.nombre,
                    series: ejercicioAgrupado.ejercicio.series,
                    repeticiones: ejercicioAgrupado.ejercicio.repeticiones,
                    imagenKey: ejercicioAgrupado.ejercicio.imagenKey, // Conservar key
                    imagenUrl: ejercicioAgrupado.ejercicio.imagenUrl, // Usar URL firmada para mostrar
                  })
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
    markAsDirty();
  };

  const handleAddDay = () => {
    const newDay: DiaEntrenamiento = { diaSemana: "", agrupaciones: [] };
    setDiasEntrenamiento([...diasEntrenamiento, newDay]);
    markAsDirty();
  };

  const handleRemoveDay = (dayIndex: number) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays.splice(dayIndex, 1);
    setDiasEntrenamiento(updatedDays);
    markAsDirty();
  };

  const handleAddGroup = (dayIndex: number, tipo: string) => {
    const newGroup: Agrupacion = {
      tipo,
      ejercicios: createInitialExercises(tipo),
    };
    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones.push(newGroup);
    setDiasEntrenamiento(updatedDays);
    markAsDirty();
  };

  const handleRemoveGroup = (dayIndex: number, groupIndex: number) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones.splice(groupIndex, 1);
    setDiasEntrenamiento(updatedDays);
    markAsDirty();
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

  const handleAddExercise = (dayIndex: number, groupIndex: number) => {
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
    markAsDirty();
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
    markAsDirty();
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
    markAsDirty();
  };

  const handleUpdateRoutine = async () => {
    // Validación previa en el frontend
    const hasExercises = diasEntrenamiento.some((dia) =>
      dia.agrupaciones.some((agrupacion) => agrupacion.ejercicios.length > 0)
    );

    if (!hasExercises) {
      setError("Debes agregar al menos un ejercicio a tu rutina.");
      return; // Detenemos la ejecución si no hay ejercicios
    }

    try {
      const routine = {
        nombre,
        descripcion,
        diasEntrenamiento: diasEntrenamiento.map((dia) => ({
          diaSemana: dia.diaSemana,
          agrupaciones: dia.agrupaciones.map((agrupacion) => ({
            tipo: agrupacion.tipo,
            ejercicios: agrupacion.ejercicios.map((ejercicio) => ({
              nombre: ejercicio.nombre,
              series: ejercicio.series,
              repeticiones: ejercicio.repeticiones,
              imagenKey: ejercicio.imagenKey, // Asegurarse de enviar el key
            })),
          })),
        })),
      };

      const response = await api.put(`/rutina/${rutinaId}`, routine);
      setSuccessMessage(response.data);
      setError(null);
      alert("Rutina actualizada correctamente.");
      onRoutineUpdated();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al actualizar la rutina:", error);
      alert("Error al actualizar la rutina.");
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

  const handleSelectImage = (key: string, url: string) => {
    if (selectedExercise) {
      const { dayIndex, groupIndex, exerciseIndex } = selectedExercise;
      const updatedDays = [...diasEntrenamiento];
      updatedDays[dayIndex].agrupaciones[groupIndex].ejercicios[
        exerciseIndex
      ].imagenKey = key; // Actualizar la key
      updatedDays[dayIndex].agrupaciones[groupIndex].ejercicios[
        exerciseIndex
      ].imagenUrl = url; // Actualizar la URL para visualización
      setDiasEntrenamiento(updatedDays);
    }
    closeImageSelector();
    markAsDirty();
  };

  const handleRemoveImage = (
    dayIndex: number,
    groupIndex: number,
    exerciseIndex: number
  ) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones[groupIndex].ejercicios[
      exerciseIndex
    ].imagenKey = ""; // Eliminar referencia de la base de datos
    updatedDays[dayIndex].agrupaciones[groupIndex].ejercicios[
      exerciseIndex
    ].imagenUrl = ""; // Quitar imagen de la vista
    setDiasEntrenamiento(updatedDays);
    markAsDirty();
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
    markAsDirty();
  };

  return {
    nombre,
    setNombre: (value: string) => {
      setNombre(value);
      markAsDirty();
    },
    descripcion,
    setDescripcion: (value: string) => {
      setDescripcion(value);
      markAsDirty();
    },
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
    handleCloseWithConfirmation,
  };
};
