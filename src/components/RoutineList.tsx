// src/components/RoutineList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Routine {
  rutinaId: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
}

interface RoutineListProps {
  clienteId: number;
  onClose: () => void;
}

const RoutineList: React.FC<RoutineListProps> = ({ clienteId, onClose }) => {
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

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Rutinas del Cliente</h3>
      {error && <p style={errorStyle}>{error}</p>}
      {!error && (
        <table style={tableStyle}>
          <thead>
            <tr style={headerRowStyle}>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha Inicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {routines.map((routine) => (
              <tr key={routine.rutinaId} style={rowStyle}>
                <td style={cellStyle}>{routine.rutinaId}</td>
                <td style={cellStyle}>{routine.nombre}</td>
                <td style={cellStyle}>{routine.descripcion}</td>
                <td style={cellStyle}>
                  {new Date(routine.fechaInicio).toLocaleDateString()}
                </td>
                <td style={actionCellStyle}>
                  <button
                    onClick={() => handleDownloadPdf(routine.rutinaId)}
                    style={actionButtonStyle("#007bff")}
                  >
                    Descargar PDF
                  </button>
                  <button
                    onClick={() => handleViewRoutine(routine.rutinaId)}
                    style={actionButtonStyle("#28a745")}
                  >
                    Ver Rutina
                  </button>
                  <button
                    onClick={() => handleEditRoutine(routine.rutinaId)}
                    style={actionButtonStyle("#ffc107")}
                  >
                    Editar Rutina
                  </button>
                  <button
                    onClick={() => handleDeleteRoutine(routine.rutinaId)}
                    style={actionButtonStyle("#dc3545")}
                  >
                    Eliminar Rutina
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

export default RoutineList;
