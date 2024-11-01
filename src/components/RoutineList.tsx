// src/components/RoutineList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5267/api/rutina/cliente/${clienteId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data && Array.isArray(response.data.$values)) {
          setRoutines(response.data.$values);
          setError(null); // Limpiar cualquier error previo
        } else {
          setError("Error: La respuesta no es una lista de rutinas.");
          setRoutines([]); // Vaciar la lista si la respuesta no es válida
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
        setRoutines([]); // Vaciar la lista si ocurre un error
      }
    };

    fetchRoutines();
  }, [clienteId]);

  const handleDeleteRoutine = async (rutinaId: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta rutina?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5267/api/rutina/${rutinaId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

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
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5267/api/rutina/${clienteId}/${rutinaId}/pdf`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Para manejar la respuesta como un archivo binario
        }
      );

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
    <div>
      <h3>Rutinas del Cliente</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha Inicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {routines.map((routine) => (
              <tr key={routine.rutinaId}>
                <td>{routine.rutinaId}</td>
                <td>{routine.nombre}</td>
                <td>{routine.descripcion}</td>
                <td>{new Date(routine.fechaInicio).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDownloadPdf(routine.rutinaId)}>
                    Descargar PDF
                  </button>
                  <button onClick={() => handleViewRoutine(routine.rutinaId)}>
                    Ver Rutina
                  </button>
                  <button onClick={() => handleEditRoutine(routine.rutinaId)}>
                    Editar Rutina
                  </button>
                  <button onClick={() => handleDeleteRoutine(routine.rutinaId)}>
                    Eliminar Rutina
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

export default RoutineList;
