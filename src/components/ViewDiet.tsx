import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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

const ViewDiet: React.FC = () => {
  const { clienteId, dietaId } = useParams<{
    clienteId: string;
    dietaId: string;
  }>();

  const navigate = useNavigate();
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
  }, [dietaId]);

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

  return (
    <div style={backgroundStyle}>
      {error && <p style={errorStyle}>{error}</p>}
      {diet && (
        <div style={containerStyle}>
          <h3 style={titleStyle}>{diet.nombre}</h3>
          <p style={descriptionStyle}>{diet.descripcion}</p>
          <div style={buttonContainerStyle}>
            <button onClick={handleDownloadPdf} style={downloadButtonStyle}>
              Descargar PDF
            </button>
            <button onClick={handleEditDiet} style={editButtonStyle}>
              Editar Dieta
            </button>
            <button onClick={handleDeleteDiet} style={deleteButtonStyle}>
              Eliminar Dieta
            </button>
          </div>
          {diet.comidas.map((comida, index) => (
            <div key={index} style={mealContainerStyle}>
              <h4
                style={mealTitleStyle}
              >{`Comida ${comida.orden} - ${comida.hora}`}</h4>
              <h5 style={mealSubtitleStyle}>{comida.nombre}</h5>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Alimento</th>
                    <th style={tableHeaderStyle}>Cantidad</th>
                    <th style={tableHeaderStyle}>Unidad</th>
                  </tr>
                </thead>
                <tbody>
                  {comida.alimentos.map((alimento, idx) => (
                    <tr key={idx} style={tableRowStyle}>
                      <td style={tableCellStyle}>{alimento.nombre}</td>
                      <td style={tableCellStyle}>{alimento.cantidad}</td>
                      <td style={tableCellStyle}>{alimento.unidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <h4 style={notesTitleStyle}>Notas</h4>
          <p style={notesStyle}>{diet.notas}</p>
        </div>
      )}
    </div>
  );
};

// Estilos
const backgroundStyle: React.CSSProperties = {
  backgroundColor: "#222",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
};

const containerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  maxWidth: "800px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
};

const titleStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontSize: "1.8rem",
  textAlign: "center",
  marginBottom: "1rem",
};

const descriptionStyle: React.CSSProperties = {
  color: "#bbb",
  fontSize: "1rem",
  marginBottom: "1rem",
  textAlign: "center",
};

const buttonContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  marginBottom: "1.5rem",
};

const downloadButtonStyle: React.CSSProperties = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
};

const editButtonStyle: React.CSSProperties = {
  backgroundColor: "#ffcc00",
  color: "#000",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: "#dc3545",
  color: "#fff",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
};

const mealContainerStyle: React.CSSProperties = {
  backgroundColor: "#444",
  padding: "1rem",
  borderRadius: "8px",
  marginBottom: "1rem",
};

const mealTitleStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontSize: "1.2rem",
  marginBottom: "0.5rem",
};

const mealSubtitleStyle: React.CSSProperties = {
  color: "#bbb",
  fontSize: "1rem",
  marginBottom: "0.5rem",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "1rem",
};

const tableHeaderStyle: React.CSSProperties = {
  backgroundColor: "#555",
  color: "#ffcc00",
  padding: "0.5rem",
  textAlign: "left",
};

const tableRowStyle: React.CSSProperties = {
  borderBottom: "1px solid #666",
};

const tableCellStyle: React.CSSProperties = {
  padding: "0.5rem",
  color: "#fff",
};

const notesTitleStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontSize: "1.2rem",
  marginTop: "1rem",
};

const notesStyle: React.CSSProperties = {
  color: "#bbb",
  fontSize: "1rem",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  textAlign: "center",
  marginBottom: "1rem",
};

export default ViewDiet;
