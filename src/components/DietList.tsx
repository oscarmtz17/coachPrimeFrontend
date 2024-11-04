import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Diet {
  dietaId: number;
  nombre: string;
  descripcion: string;
  fechaAsignacion: string;
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

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Dietas del Cliente</h3>
      {error && <p style={errorStyle}>{error}</p>}
      {!error && (
        <table style={tableStyle}>
          <thead>
            <tr style={headerRowStyle}>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha de Inicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {diets.map((diet) => (
              <tr key={diet.dietaId} style={rowStyle}>
                <td style={cellStyle}>{diet.dietaId}</td>
                <td style={cellStyle}>{diet.nombre}</td>
                <td style={cellStyle}>{diet.descripcion}</td>
                <td style={cellStyle}>
                  {new Date(diet.fechaAsignacion).toLocaleDateString("es-ES")}
                </td>
                <td style={actionCellStyle}>
                  <button
                    onClick={() => handleDownloadPdf(diet.dietaId)}
                    style={actionButtonStyle("#007bff")}
                  >
                    Descargar PDF
                  </button>
                  <button
                    onClick={() => handleViewDiet(diet.dietaId)}
                    style={actionButtonStyle("#28a745")}
                  >
                    Ver Dieta
                  </button>
                  <button
                    onClick={() => handleEditDiet(diet.dietaId)}
                    style={actionButtonStyle("#ffc107")}
                  >
                    Editar Dieta
                  </button>
                  <button
                    onClick={() => handleDeleteDiet(diet.dietaId)}
                    style={actionButtonStyle("#dc3545")}
                  >
                    Eliminar Dieta
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={onClose} style={closeButtonStyle}>
        Cerrar
      </button>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  maxWidth: "800px",
  margin: "0 auto",
};

const titleStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontSize: "1.8rem",
  textAlign: "center",
  marginBottom: "1rem",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  textAlign: "center",
  marginBottom: "1rem",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "1rem",
};

const headerRowStyle: React.CSSProperties = {
  backgroundColor: "#444",
  color: "#ffcc00",
  textAlign: "center",
};

const rowStyle: React.CSSProperties = {
  textAlign: "center",
  borderBottom: "1px solid #555",
};

const cellStyle: React.CSSProperties = {
  padding: "0.8rem",
  color: "#fff",
};

const actionCellStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "0.3rem",
  flexWrap: "wrap",
};

const actionButtonStyle = (bgColor: string): React.CSSProperties => ({
  backgroundColor: bgColor,
  color: "#fff",
  border: "none",
  padding: "0.3rem 0.6rem",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.9rem",
  marginTop: "0.3rem",
});

const closeButtonStyle: React.CSSProperties = {
  backgroundColor: "#ffcc00",
  color: "#000",
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "5px",
  cursor: "pointer",
  display: "block",
  margin: "0 auto",
};

export default DietList;
