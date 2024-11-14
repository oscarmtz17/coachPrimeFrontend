// src/components/RoutineList.tsx
import React from "react";
import { useRoutineList } from "../hooks/useRoutineList";
import RoutineListStyles from "../styles/RoutineListStyles";

interface RoutineListProps {
  clienteId: number;
  onClose: () => void;
}

const RoutineList: React.FC<RoutineListProps> = ({ clienteId, onClose }) => {
  const {
    routines,
    error,
    handleDownloadPdf,
    handleViewRoutine,
    handleEditRoutine,
    handleDeleteRoutine,
  } = useRoutineList(clienteId);

  const getActionButtonStyle = (bgColor: string) =>
    (
      RoutineListStyles.actionButton as (bgColor: string) => React.CSSProperties
    )(bgColor);

  return (
    <div style={RoutineListStyles.container}>
      <h3 style={RoutineListStyles.title}>Rutinas del Cliente</h3>
      {error && <p style={RoutineListStyles.error}>{error}</p>}
      {!error && (
        <table style={RoutineListStyles.table}>
          <thead>
            <tr style={RoutineListStyles.headerRow}>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha Inicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {routines.map((routine) => (
              <tr key={routine.rutinaId} style={RoutineListStyles.row}>
                <td style={RoutineListStyles.cell}>{routine.rutinaId}</td>
                <td style={RoutineListStyles.cell}>{routine.nombre}</td>
                <td style={RoutineListStyles.cell}>{routine.descripcion}</td>
                <td style={RoutineListStyles.cell}>
                  {new Date(routine.fechaInicio).toLocaleDateString()}
                </td>
                <td style={RoutineListStyles.actionCell}>
                  <button
                    onClick={() => handleDownloadPdf(routine.rutinaId)}
                    style={getActionButtonStyle("#007bff")}
                  >
                    Descargar PDF
                  </button>
                  <button
                    onClick={() => handleViewRoutine(routine.rutinaId)}
                    style={getActionButtonStyle("#28a745")}
                  >
                    Ver Rutina
                  </button>
                  <button
                    onClick={() => handleEditRoutine(routine.rutinaId)}
                    style={getActionButtonStyle("#ffc107")}
                  >
                    Editar Rutina
                  </button>
                  <button
                    onClick={() => handleDeleteRoutine(routine.rutinaId)}
                    style={getActionButtonStyle("#dc3545")}
                  >
                    Eliminar Rutina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={onClose} style={RoutineListStyles.closeButton}>
        Cerrar
      </button>
    </div>
  );
};

export default RoutineList;
