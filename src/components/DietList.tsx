// src/components/DietList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Diet {
  dietaId: number;
  nombre: string;
  descripcion: string;
}

interface DietListProps {
  clienteId: number;
  onClose: () => void;
}

const DietList: React.FC<DietListProps> = ({ clienteId, onClose }) => {
  const [diets, setDiets] = useState<Diet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5267/api/dieta/${clienteId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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

    fetchDiets();
  }, [clienteId]);

  const handleDownloadPdf = async (dietaId: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5267/api/dieta/${clienteId}/${dietaId}/pdf`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

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
        const token = localStorage.getItem("token");
        await axios.delete(
          `http://localhost:5267/api/dieta/${clienteId}/${dietaId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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

  return (
    <div>
      <h3>Dietas del Cliente</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {diets.map((diet) => (
              <tr key={diet.dietaId}>
                <td>{diet.dietaId}</td>
                <td>{diet.nombre}</td>
                <td>{diet.descripcion}</td>
                <td>
                  <button onClick={() => handleDownloadPdf(diet.dietaId)}>
                    Descargar PDF
                  </button>
                  <button onClick={() => handleViewDiet(diet.dietaId)}>
                    Ver Dieta
                  </button>
                  <button onClick={() => handleEditDiet(diet.dietaId)}>
                    Editar Dieta
                  </button>
                  <button onClick={() => handleDeleteDiet(diet.dietaId)}>
                    Eliminar Dieta
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default DietList;
