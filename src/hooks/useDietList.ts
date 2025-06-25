// src/hooks/useDietList.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Diet {
  dietaId: number;
  nombre: string;
  notas: string;
  fechaAsignacion: string;
}

export const useDietList = (clienteId: number) => {
  const [diets, setDiets] = useState<Diet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchDiets = async () => {
    try {
      const response = await api.get(`/dieta/${clienteId}`);
      if (response.data && Array.isArray(response.data.$values)) {
        setDiets(response.data.$values);
        setError(null);
      } else {
        setError("Error: La respuesta no es una lista de dietas.");
        setDiets([]);
        console.error("Respuesta inesperada de la API:", response.data);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setError(
          err.response.data || "No se encontraron dietas para este cliente."
        );
      } else {
        setError("Error al cargar las dietas");
        console.error(err);
      }
      setDiets([]);
    }
  };

  useEffect(() => {
    fetchDiets();
  }, [clienteId]);

  const handleDownloadPdf = async (dietaId: number) => {
    try {
      const response = await api.get(`/dieta/${clienteId}/${dietaId}/pdf`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Dieta_${dietaId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      setError("Error al descargar el PDF.");
    }
  };

  const handleViewDiet = (dietaId: number) => {
    navigate(`/dieta/${clienteId}/${dietaId}`);
  };

  const handleEditDiet = (dietaId: number) => {
    navigate(`/editar-dieta/${clienteId}/${dietaId}`);
  };

  const handleDeleteDiet = async (dietaId: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta dieta?")) {
      try {
        await api.delete(`/dieta/${clienteId}/${dietaId}`);
        setDiets((prevDiets) =>
          prevDiets.filter((diet) => diet.dietaId !== dietaId)
        );
        alert("Dieta eliminada exitosamente.");
      } catch (error) {
        console.error("Error al eliminar la dieta:", error);
        setError("Error al eliminar la dieta.");
      }
    }
  };

  return {
    diets,
    error,
    handleDownloadPdf,
    handleViewDiet,
    handleEditDiet,
    handleDeleteDiet,
  };
};
