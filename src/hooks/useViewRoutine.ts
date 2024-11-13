// src/hooks/useViewRoutine.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Ejercicio {
  nombre: string;
  series: number;
  repeticiones: number;
  imagenUrl: string;
}

interface Agrupacion {
  tipo: string;
  ejercicios: Ejercicio[];
}

interface DiaEntrenamiento {
  diaSemana: string;
  agrupaciones: Agrupacion[];
}

interface RoutineDetails {
  nombre: string;
  descripcion: string;
  clienteId: number;
  diasEntrenamiento: DiaEntrenamiento[];
}

export const useViewRoutine = (
  rutinaId: string | undefined,
  navigate: ReturnType<typeof useNavigate>
) => {
  const [routine, setRoutine] = useState<RoutineDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutine = async () => {
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
        setRoutine(adaptedRoutine);
        setError(null);
      } catch (error: any) {
        setError("Error al cargar los detalles de la rutina");
        console.error(error);
      }
    };

    fetchRoutine();
  }, [rutinaId]);

  const handleDownloadPdf = async () => {
    if (!routine) return;
    try {
      const response = await api.get(
        `/rutina/${routine.clienteId}/${rutinaId}/pdf`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Rutina_${routine.nombre.replace(/\s+/g, "_")}.pdf`
      );
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      setError("No se pudo descargar el PDF de la rutina.");
    }
  };

  const handleEditRoutine = () => {
    if (rutinaId) {
      navigate(`/editar-rutina/${rutinaId}`);
    }
  };

  const handleDeleteRoutine = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta rutina?")) {
      try {
        await api.delete(`/rutina/${rutinaId}`);
        alert("Rutina eliminada exitosamente.");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error al eliminar la rutina:", error);
        setError("Error al eliminar la rutina.");
      }
    }
  };

  return {
    routine,
    error,
    handleDownloadPdf,
    handleEditRoutine,
    handleDeleteRoutine,
  };
};
