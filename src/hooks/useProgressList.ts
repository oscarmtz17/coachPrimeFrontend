// src/hooks/useProgressList.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Progress {
  progresoId: number;
  fechaRegistro: string;
  pesoKg: number;
  estaturaCm: number;
  nivelActividad: string;
  factorActividad: number;
  cinturaCm: number;
  caderaCm: number;
  pechoCm: number;
  brazoCm: number;
  piernaCm: number;
  notas: string;
}

export const useProgressList = (clienteId: number) => {
  const [progressList, setProgressList] = useState<Progress[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgressList = async () => {
      try {
        const response = await api.get(`/progreso/${clienteId}`);
        const progressData = response.data.$values || response.data;
        setProgressList(progressData);
        setError(null);
      } catch (err) {
        console.error("Error al cargar los registros de progreso:", err);
        setError("No se pudieron cargar los registros de progreso.");
      } finally {
        setLoading(false);
      }
    };

    fetchProgressList();
  }, [clienteId]);

  const handleEditProgress = (progress: Progress) => {
    navigate(`/editar-progreso/${clienteId}/${progress.progresoId}`);
  };

  const handleDeleteProgress = async (progresoId: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este progreso?")) {
      try {
        await api.delete(`/progreso/${clienteId}/${progresoId}`);
        setProgressList((prevList) =>
          prevList.filter((progress) => progress.progresoId !== progresoId)
        );
        alert("Progreso eliminado exitosamente.");
      } catch (error) {
        console.error("Error al eliminar el progreso:", error);
        setError("No se pudo eliminar el progreso.");
      }
    }
  };

  return {
    progressList,
    error,
    loading,
    handleEditProgress,
    handleDeleteProgress,
  };
};
