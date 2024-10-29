// src/components/EditRoutineForm.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface DiaEntrenamiento {
  diaSemana: string;
  agrupaciones: Agrupacion[];
}

interface Agrupacion {
  tipo: string;
  ejercicios: Ejercicio[];
}

interface Ejercicio {
  nombre: string;
  descripcion?: string;
  series: number;
  repeticiones: number;
  imagenUrl: string;
}

interface EditRoutineFormProps {
  rutinaId: number;
  onRoutineUpdated: () => void; // Para actualizar después de editar la rutina
  onClose: () => void; // Para cerrar el formulario
}

const EditRoutineForm: React.FC<EditRoutineFormProps> = ({
  rutinaId,
  onRoutineUpdated,
  onClose,
}) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [diasEntrenamiento, setDiasEntrenamiento] = useState<
    DiaEntrenamiento[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutineDetails = async () => {
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

        setNombre(adaptedRoutine.nombre);
        setDescripcion(adaptedRoutine.descripcion);
        setDiasEntrenamiento(adaptedRoutine.diasEntrenamiento);
      } catch (error) {
        setError("Error al cargar la rutina.");
        console.error(error);
      }
    };

    fetchRoutineDetails();
  }, [rutinaId]);

  const handleExerciseChange = (
    dayIndex: number,
    groupIndex: number,
    exerciseIndex: number,
    field: keyof Ejercicio,
    value: string | number
  ) => {
    const updatedDays = [...diasEntrenamiento];
    const group = updatedDays[dayIndex].agrupaciones[groupIndex];
    group.ejercicios[exerciseIndex] = {
      ...group.ejercicios[exerciseIndex],
      [field]: value,
    };
    setDiasEntrenamiento(updatedDays);
  };

  const handleUpdateRoutine = async () => {
    try {
      const token = localStorage.getItem("token");
      const routine = {
        nombre,
        descripcion,
        clienteId: 14, // Ajusta según tu lógica o selecciona dinámicamente
        usuarioId: 17, // Ajusta según tu lógica o selecciona dinámicamente
        diasEntrenamiento: diasEntrenamiento.map((dia) => ({
          diaSemana: dia.diaSemana,
          agrupaciones: dia.agrupaciones.map((agrupacion) => ({
            tipo: agrupacion.tipo,
            ejercicios: agrupacion.ejercicios,
          })),
        })),
      };

      const response = await axios.put(
        `http://localhost:5267/api/rutina/${rutinaId}`,
        routine,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage(response.data); // Mostrar mensaje de éxito del backend
      setError(null); // Limpiar cualquier error previo
      alert(response.data); // Mostrar mensaje de éxito

      onRoutineUpdated();
      navigate("/dashboard"); // Redirigir al Dashboard después de guardar exitosamente
    } catch (err: any) {
      setError(err.response?.data || "Error al actualizar la rutina");
      setSuccessMessage(null); // Limpiar cualquier mensaje de éxito previo
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Editar Rutina</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div>
        <label>Nombre de la Rutina:</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      {diasEntrenamiento.map((dia, dayIndex) => (
        <div key={dayIndex}>
          <h4>{dia.diaSemana}</h4>
          {dia.agrupaciones.map((agrupacion, groupIndex) => (
            <div key={groupIndex}>
              <h5>{agrupacion.tipo}</h5>
              {agrupacion.ejercicios.map((ejercicio, exerciseIndex) => (
                <div key={exerciseIndex}>
                  <input
                    placeholder="Nombre del ejercicio"
                    value={ejercicio.nombre}
                    onChange={(e) =>
                      handleExerciseChange(
                        dayIndex,
                        groupIndex,
                        exerciseIndex,
                        "nombre",
                        e.target.value
                      )
                    }
                  />
                  <input
                    placeholder="Series"
                    type="number"
                    value={ejercicio.series}
                    onChange={(e) =>
                      handleExerciseChange(
                        dayIndex,
                        groupIndex,
                        exerciseIndex,
                        "series",
                        Number(e.target.value)
                      )
                    }
                  />
                  <input
                    placeholder="Repeticiones"
                    type="number"
                    value={ejercicio.repeticiones}
                    onChange={(e) =>
                      handleExerciseChange(
                        dayIndex,
                        groupIndex,
                        exerciseIndex,
                        "repeticiones",
                        Number(e.target.value)
                      )
                    }
                  />
                  <input
                    placeholder="URL de Imagen"
                    value={ejercicio.imagenUrl}
                    onChange={(e) =>
                      handleExerciseChange(
                        dayIndex,
                        groupIndex,
                        exerciseIndex,
                        "imagenUrl",
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleUpdateRoutine}>Guardar Cambios</button>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default EditRoutineForm;
