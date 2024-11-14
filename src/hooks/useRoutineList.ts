// src/hooks/useRoutineList.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Routine {
  rutinaId: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
}

export const useRoutineList = (clienteId: number) => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await api.get(`/rutina/cliente/${clienteId}`);
        if (response.data && Array.isArray(response.data.$values)) {
          setRoutines(response.data.$values);
          setError(null);
        } else {
          setError("Error: La respuesta no es una lista de rutinas.");
          setRoutines([]);
          console.error("Respuesta inesperada de la API:", response.data);
        }
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          setError(
            err.response.data || "No se encontraron rutinas para este cliente."
          );
        } else {
          setError("Error al cargar las rutinas");
          console.error(err);
        }
        setRoutines([]);
      }
    };

    fetchRoutines();
  }, [clienteId]);

  const handleDeleteRoutine = async (rutinaId: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta rutina?")) {
      try {
        await api.delete(`/rutina/${rutinaId}`);
        setRoutines((prevRoutines) =>
          prevRoutines.filter((routine) => routine.rutinaId !== rutinaId)
        );
        alert("Rutina eliminada exitosamente.");
      } catch (error) {
        console.error("Error al eliminar la rutina:", error);
        setError("Error al eliminar la rutina.");
      }
    }
  };

  const handleDownloadPdf = async (rutinaId: number) => {
    try {
      const response = await api.get(`/rutina/${clienteId}/${rutinaId}/pdf`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Rutina_${rutinaId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      setError("Error al descargar el PDF.");
    }
  };

  const handleViewRoutine = (rutinaId: number) => {
    navigate(`/rutina/${rutinaId}`);
  };

  const handleEditRoutine = (rutinaId: number) => {
    navigate(`/editar-rutina/${rutinaId}`);
  };

  return {
    routines,
    error,
    handleDownloadPdf,
    handleViewRoutine,
    handleEditRoutine,
    handleDeleteRoutine,
  };
};
