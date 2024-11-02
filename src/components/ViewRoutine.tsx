import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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

const ViewRoutine: React.FC = () => {
  const { rutinaId } = useParams<{ rutinaId: string }>();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState<RoutineDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5267/api/rutina/${rutinaId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5267/api/rutina/${routine.clienteId}/${rutinaId}/pdf`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5267/api/rutina/${rutinaId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Rutina eliminada exitosamente.");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error al eliminar la rutina:", error);
        setError("Error al eliminar la rutina.");
      }
    }
  };

  return (
    <div style={backgroundStyle}>
      <div style={containerStyle}>
        {error && <p style={errorStyle}>{error}</p>}
        {routine && (
          <>
            <h3 style={titleStyle}>{routine.nombre}</h3>
            <p style={descriptionStyle}>{routine.descripcion}</p>
            <div style={buttonContainerStyle}>
              <button
                onClick={handleDownloadPdf}
                style={actionButtonStyle("#007bff")}
              >
                Descargar PDF
              </button>
              <button
                onClick={handleEditRoutine}
                style={actionButtonStyle("#ffc107")}
              >
                Editar Rutina
              </button>
              <button
                onClick={handleDeleteRoutine}
                style={actionButtonStyle("#dc3545")}
              >
                Eliminar Rutina
              </button>
            </div>
            {routine.diasEntrenamiento.map((dia, diaIndex) => (
              <div key={diaIndex} style={dayContainerStyle}>
                <h4 style={dayTitleStyle}>{dia.diaSemana}</h4>
                {dia.agrupaciones.map((agrupacion, groupIndex) => (
                  <div key={groupIndex} style={groupContainerStyle}>
                    <h5 style={groupTitleStyle}>{agrupacion.tipo}</h5>
                    <table style={tableStyle}>
                      <thead>
                        <tr style={headerRowStyle}>
                          <th>Nombre</th>
                          <th>Series</th>
                          <th>Repeticiones</th>
                          <th>Imagen</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agrupacion.ejercicios.map((ejercicio, exIndex) => (
                          <tr key={exIndex} style={rowStyle}>
                            <td style={cellStyle}>{ejercicio.nombre}</td>
                            <td style={cellStyle}>{ejercicio.series}</td>
                            <td style={cellStyle}>{ejercicio.repeticiones}</td>
                            <td style={cellStyle}>
                              {ejercicio.imagenUrl ? (
                                <img
                                  src={ejercicio.imagenUrl}
                                  alt={ejercicio.nombre}
                                  style={imageStyle}
                                />
                              ) : (
                                <p style={noImageStyle}>Imagen no disponible</p>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

// Estilos
const backgroundStyle: React.CSSProperties = {
  backgroundColor: "#222",
  minHeight: "100vh",
  paddingTop: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const containerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  maxWidth: "800px",
  width: "100%",
};

const titleStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontSize: "1.8rem",
  textAlign: "center",
  marginBottom: "1rem",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "1rem",
  color: "#ddd",
  marginBottom: "1rem",
  textAlign: "center",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  textAlign: "center",
  marginBottom: "1rem",
};

const buttonContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  marginBottom: "1.5rem",
};

const actionButtonStyle = (bgColor: string): React.CSSProperties => ({
  backgroundColor: bgColor,
  color: "#fff",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.9rem",
});

const dayContainerStyle: React.CSSProperties = {
  marginBottom: "1.5rem",
};

const dayTitleStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontSize: "1.4rem",
  marginBottom: "0.5rem",
};

const groupContainerStyle: React.CSSProperties = {
  backgroundColor: "#444",
  padding: "1rem",
  borderRadius: "8px",
  marginBottom: "1rem",
};

const groupTitleStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  color: "#ffcc00",
  marginBottom: "0.5rem",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "1rem",
};

const headerRowStyle: React.CSSProperties = {
  backgroundColor: "#555",
  color: "#ffcc00",
  textAlign: "center",
};

const rowStyle: React.CSSProperties = {
  textAlign: "center",
  borderBottom: "1px solid #666",
};

const cellStyle: React.CSSProperties = {
  padding: "0.8rem",
  color: "#fff",
};

const imageStyle: React.CSSProperties = {
  width: "100px",
  height: "auto",
  borderRadius: "4px",
};

const noImageStyle: React.CSSProperties = {
  color: "#aaa",
  fontStyle: "italic",
};

export default ViewRoutine;
