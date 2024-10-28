// src/components/ViewRoutine.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

        // Adaptar la estructura de la respuesta para convertir $values en arrays normales
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
          responseType: "blob", // Importante para manejar el PDF
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

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {routine && (
        <>
          <h3>{routine.nombre}</h3>
          <p>{routine.descripcion}</p>
          <button onClick={handleDownloadPdf}>Descargar PDF</button>
          {routine.diasEntrenamiento.map((dia, diaIndex) => (
            <div key={diaIndex}>
              <h4>{dia.diaSemana}</h4>
              {dia.agrupaciones.map((agrupacion, groupIndex) => (
                <div key={groupIndex}>
                  <h5>{agrupacion.tipo}</h5>
                  <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Series</th>
                        <th>Repeticiones</th>
                        <th>Imagen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agrupacion.ejercicios.map((ejercicio, exIndex) => (
                        <tr key={exIndex}>
                          <td>{ejercicio.nombre}</td>
                          <td>{ejercicio.series}</td>
                          <td>{ejercicio.repeticiones}</td>
                          <td>
                            {ejercicio.imagenUrl ? (
                              <img
                                src={ejercicio.imagenUrl}
                                alt={ejercicio.nombre}
                                style={{ width: "100px", height: "auto" }}
                              />
                            ) : (
                              <p>Imagen no disponible</p>
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
  );
};

export default ViewRoutine;
