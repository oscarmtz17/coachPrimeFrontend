// src/components/ViewRoutine.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ViewRoutineStyles, {
  actionButtonStyle,
} from "../styles/ViewRoutineStyles";
import { useViewRoutine } from "../hooks/useViewRoutine";

const ViewRoutine: React.FC = () => {
  const { rutinaId } = useParams<{ rutinaId: string }>();
  const navigate = useNavigate();

  const {
    routine,
    error,
    handleDownloadPdf,
    handleEditRoutine,
    handleDeleteRoutine,
  } = useViewRoutine(rutinaId, navigate);

  return (
    <div style={ViewRoutineStyles.background}>
      <div style={ViewRoutineStyles.container}>
        {error && <p style={ViewRoutineStyles.error}>{error}</p>}
        {routine && (
          <>
            <h3 style={ViewRoutineStyles.title}>{routine.nombre}</h3>
            <p style={ViewRoutineStyles.description}>{routine.descripcion}</p>
            <div style={ViewRoutineStyles.buttonContainer}>
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
              <div key={diaIndex} style={ViewRoutineStyles.dayContainer}>
                <h4 style={ViewRoutineStyles.dayTitle}>{dia.diaSemana}</h4>
                {dia.agrupaciones.map((agrupacion, groupIndex) => (
                  <div
                    key={groupIndex}
                    style={ViewRoutineStyles.groupContainer}
                  >
                    <h5 style={ViewRoutineStyles.groupTitle}>
                      {agrupacion.tipo}
                    </h5>
                    <table style={ViewRoutineStyles.table}>
                      <thead>
                        <tr style={ViewRoutineStyles.headerRow}>
                          <th>Nombre</th>
                          <th>Series</th>
                          <th>Repeticiones</th>
                          <th>Imagen</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agrupacion.ejercicios.map((ejercicio, exIndex) => (
                          <tr key={exIndex} style={ViewRoutineStyles.row}>
                            <td style={ViewRoutineStyles.cell}>
                              {ejercicio.nombre}
                            </td>
                            <td style={ViewRoutineStyles.cell}>
                              {ejercicio.series}
                            </td>
                            <td style={ViewRoutineStyles.cell}>
                              {ejercicio.repeticiones}
                            </td>
                            <td style={ViewRoutineStyles.cell}>
                              {ejercicio.imagenKey ? (
                                <img
                                  src={ejercicio.imagenKey} // Usar la URL firmada
                                  alt={ejercicio.nombre}
                                  style={ViewRoutineStyles.image}
                                />
                              ) : (
                                <p style={ViewRoutineStyles.noImage}>
                                  Imagen no disponible
                                </p>
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

export default ViewRoutine;
