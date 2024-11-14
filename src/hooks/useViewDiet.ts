// src/hooks/useViewDiet.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

interface DietDetails {
  nombre: string;
  descripcion: string;
  clienteId: number;
  comidas: Comida[];
  notas: string;
}

export const useViewDiet = (
  clienteId: string | undefined,
  dietaId: string | undefined,
  navigate: ReturnType<typeof useNavigate>
) => {
  const [diet, setDiet] = useState<DietDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiet = async () => {
      try {
        const response = await api.get(`/dieta/${clienteId}/${dietaId}`);
        const adaptedDiet = {
          ...response.data,
          comidas: response.data.comidas.$values.map((comida: any) => ({
            ...comida,
            alimentos: comida.alimentos.$values,
          })),
        };

        setDiet(adaptedDiet);
        setError(null);
      } catch (error: any) {
        setError("Error al cargar los detalles de la dieta");
        console.error(error);
      }
    };

    fetchDiet();
  }, [clienteId, dietaId]);

  const handleDownloadPdf = async () => {
    if (!diet) return;
    try {
      const response = await api.get(
        `/dieta/${diet.clienteId}/${dietaId}/pdf`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Dieta_${diet.nombre.replace(/\s+/g, "_")}.pdf`
      );
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      setError("No se pudo descargar el PDF de la dieta.");
    }
  };

  const handleDeleteDiet = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta dieta?")) {
      try {
        await api.delete(`/dieta/${diet?.clienteId}/${dietaId}`);
        alert("Dieta eliminada exitosamente.");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error al eliminar la dieta:", error);
        setError("Error al eliminar la dieta.");
      }
    }
  };

  const handleEditDiet = () => {
    if (diet) {
      navigate(`/editar-dieta/${clienteId}/${dietaId}`);
    }
  };

  return {
    diet,
    error,
    handleDownloadPdf,
    handleDeleteDiet,
    handleEditDiet,
  };
};
