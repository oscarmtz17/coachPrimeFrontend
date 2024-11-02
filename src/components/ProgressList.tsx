import React, { useEffect, useState } from "react";
import axios from "axios";
import EditProgressForm from "./EditProgressForm";

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

interface ProgressListProps {
  clienteId: number;
  onClose: () => void;
}

const ProgressList: React.FC<ProgressListProps> = ({ clienteId, onClose }) => {
  const [progressList, setProgressList] = useState<Progress[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProgress, setSelectedProgress] = useState<Progress | null>(
    null
  );

  useEffect(() => {
    const fetchProgressList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5267/api/progreso/${clienteId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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
    setSelectedProgress(progress);
  };

  const handleDeleteProgress = async (progresoId: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este progreso?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `http://localhost:5267/api/progreso/${clienteId}/${progresoId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

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

  const handleSaveProgress = () => {
    setSelectedProgress(null);
    const fetchProgressList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5267/api/progreso/${clienteId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const progressData = response.data.$values || response.data;
        setProgressList(progressData);
      } catch (err) {
        console.error("Error al actualizar los registros de progreso:", err);
      }
    };
    fetchProgressList();
  };

  if (loading) {
    return <p style={loadingStyle}>Cargando registros de progreso...</p>;
  }

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Progresos del Cliente</h3>
      {error && <p style={errorStyle}>{error}</p>}
      {!error && progressList.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr style={headerRowStyle}>
              <th>Fecha</th>
              <th>Peso (kg)</th>
              <th>Estatura (cm)</th>
              <th>Nivel de Actividad</th>
              <th>Factor Actividad</th>
              <th>Cintura (cm)</th>
              <th>Cadera (cm)</th>
              <th>Pecho (cm)</th>
              <th>Brazo (cm)</th>
              <th>Pierna (cm)</th>
              <th>Notas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {progressList.map((progress) => (
              <tr key={progress.progresoId} style={rowStyle}>
                <td style={cellStyle}>
                  {new Date(progress.fechaRegistro).toLocaleDateString()}
                </td>
                <td style={cellStyle}>{progress.pesoKg}</td>
                <td style={cellStyle}>{progress.estaturaCm}</td>
                <td style={cellStyle}>{progress.nivelActividad}</td>
                <td style={cellStyle}>{progress.factorActividad}</td>
                <td style={cellStyle}>{progress.cinturaCm}</td>
                <td style={cellStyle}>{progress.caderaCm}</td>
                <td style={cellStyle}>{progress.pechoCm}</td>
                <td style={cellStyle}>{progress.brazoCm}</td>
                <td style={cellStyle}>{progress.piernaCm}</td>
                <td style={cellStyle}>{progress.notas}</td>
                <td style={actionCellStyle}>
                  <button
                    onClick={() => handleEditProgress(progress)}
                    style={actionButtonStyle("#28a745")}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProgress(progress.progresoId)}
                    style={actionButtonStyle("#dc3545")}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={noDataStyle}>No hay registros de progreso disponibles.</p>
      )}
      <button onClick={onClose} style={closeButtonStyle}>
        Cerrar
      </button>
      {selectedProgress && (
        <EditProgressForm
          clienteId={clienteId}
          progress={selectedProgress}
          onClose={() => setSelectedProgress(null)}
          onSave={handleSaveProgress}
        />
      )}
    </div>
  );
};

// Estilos
const containerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  maxWidth: "900px",
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

const loadingStyle: React.CSSProperties = {
  color: "#ffcc00",
  textAlign: "center",
  fontSize: "1.2rem",
};

const noDataStyle: React.CSSProperties = {
  color: "#ffcc00",
  textAlign: "center",
  fontSize: "1.2rem",
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

export default ProgressList;
