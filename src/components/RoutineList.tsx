// src/components/RoutineList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

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
        // Manejar el error 404 específicamente
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
            </tr>
          </thead>
          <tbody>
            {routines.map((routine) => (
              <tr key={routine.rutinaId}>
                <td>{routine.rutinaId}</td>
                <td>{routine.nombre}</td>
                <td>{routine.descripcion}</td>
                <td>{new Date(routine.fechaInicio).toLocaleDateString()}</td>
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
