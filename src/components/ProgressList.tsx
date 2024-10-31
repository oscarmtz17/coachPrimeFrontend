// src/components/ProgressList.tsx
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

        // Actualizar la lista de progreso después de eliminar
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
    // Refrescar la lista de progreso después de guardar
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
    return <p>Cargando registros de progreso...</p>;
  }

  return (
    <div>
      <h3>Progresos del Cliente</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && progressList.length > 0 ? (
        <table>
          <thead>
            <tr>
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
              <tr key={progress.progresoId}>
                <td>{new Date(progress.fechaRegistro).toLocaleDateString()}</td>
                <td>{progress.pesoKg}</td>
                <td>{progress.estaturaCm}</td>
                <td>{progress.nivelActividad}</td>
                <td>{progress.factorActividad}</td>
                <td>{progress.cinturaCm}</td>
                <td>{progress.caderaCm}</td>
                <td>{progress.pechoCm}</td>
                <td>{progress.brazoCm}</td>
                <td>{progress.piernaCm}</td>
                <td>{progress.notas}</td>
                <td>
                  <button onClick={() => handleEditProgress(progress)}>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProgress(progress.progresoId)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay registros de progreso disponibles.</p>
      )}
      <button onClick={onClose}>Cerrar</button>
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

export default ProgressList;
