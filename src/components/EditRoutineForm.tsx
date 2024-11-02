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
  series: number;
  repeticiones: number;
  imagenUrl: string;
}

interface EditRoutineFormProps {
  rutinaId: number;
  onRoutineUpdated: () => void;
  onClose: () => void;
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

  const handleDayChange = (index: number, diaSemana: string) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays[index].diaSemana = diaSemana;
    setDiasEntrenamiento(updatedDays);
  };

  const handleAddDay = () => {
    const newDay: DiaEntrenamiento = { diaSemana: "", agrupaciones: [] };
    setDiasEntrenamiento([...diasEntrenamiento, newDay]);
  };

  const handleRemoveDay = (dayIndex: number) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays.splice(dayIndex, 1);
    setDiasEntrenamiento(updatedDays);
  };

  const handleAddGroup = (dayIndex: number, tipo: string) => {
    const newGroup: Agrupacion = {
      tipo,
      ejercicios: createInitialExercises(tipo),
    };
    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones.push(newGroup);
    setDiasEntrenamiento(updatedDays);
  };

  const handleRemoveGroup = (dayIndex: number, groupIndex: number) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones.splice(groupIndex, 1);
    setDiasEntrenamiento(updatedDays);
  };

  const createInitialExercises = (tipo: string): Ejercicio[] => {
    let exerciseCount = 1;
    switch (tipo) {
      case "Bi-Serie":
        exerciseCount = 2;
        break;
      case "Tri-Serie":
        exerciseCount = 3;
        break;
      case "Cuatri-Serie":
        exerciseCount = 4;
        break;
      case "Circuito":
        exerciseCount = 0;
        break;
      default:
        exerciseCount = 1;
    }

    return Array.from({ length: exerciseCount }, () => ({
      nombre: "",
      series: 1,
      repeticiones: 1,
      imagenUrl: "",
    }));
  };

  const handleAddExercise = (dayIndex: number, groupIndex: number) => {
    const newExercise: Ejercicio = {
      nombre: "",
      series: 1,
      repeticiones: 1,
      imagenUrl: "",
    };
    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones[groupIndex].ejercicios.push(newExercise);
    setDiasEntrenamiento(updatedDays);
  };

  const handleRemoveExercise = (
    dayIndex: number,
    groupIndex: number,
    exerciseIndex: number
  ) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones[groupIndex].ejercicios.splice(
      exerciseIndex,
      1
    );
    setDiasEntrenamiento(updatedDays);
  };

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
        clienteId: 14,
        usuarioId: 17,
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

      setSuccessMessage(response.data);
      setError(null);
      alert(response.data);

      onRoutineUpdated();
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data || "Error al actualizar la rutina");
      setSuccessMessage(null);
      console.error(err);
    }
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Editar Rutina</h3>
      {error && <p style={errorStyle}>{error}</p>}
      {successMessage && <p style={successStyle}>{successMessage}</p>}
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Nombre de la Rutina:</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={textareaStyle}
        />
      </div>
      <button onClick={handleAddDay} style={addButtonStyle}>
        Agregar Día de Entrenamiento
      </button>
      {diasEntrenamiento.map((dia, dayIndex) => (
        <div key={dayIndex} style={dayContainerStyle}>
          <div style={dayHeaderStyle}>
            <h4 style={dayTitleStyle}>Día de la Semana</h4>
            <button
              onClick={() => handleRemoveDay(dayIndex)}
              style={removeButtonStyle}
            >
              Quitar Día
            </button>
          </div>
          <select
            value={dia.diaSemana}
            onChange={(e) => handleDayChange(dayIndex, e.target.value)}
            style={selectStyle}
          >
            <option value="">Selecciona un día</option>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
          <select
            onChange={(e) => handleAddGroup(dayIndex, e.target.value)}
            style={selectStyle}
          >
            <option value="">Selecciona una agrupación</option>
            <option value="Ejercicio Individual">Ejercicio Individual</option>
            <option value="Bi-Serie">Bi-Serie</option>
            <option value="Tri-Serie">Tri-Serie</option>
            <option value="Cuatri-Serie">Cuatri-Serie</option>
            <option value="Circuito">Circuito</option>
          </select>
          {dia.agrupaciones.map((agrupacion, groupIndex) => (
            <div key={groupIndex} style={groupContainerStyle}>
              <div style={groupHeaderStyle}>
                <h5 style={groupTitleStyle}>{agrupacion.tipo}</h5>
                <button
                  onClick={() => handleRemoveGroup(dayIndex, groupIndex)}
                  style={removeButtonStyle}
                >
                  Quitar Agrupación
                </button>
              </div>
              {agrupacion.ejercicios.map((ejercicio, exerciseIndex) => (
                <div key={exerciseIndex} style={exerciseContainerStyle}>
                  <label style={exerciseLabelStyle}>Nombre del Ejercicio</label>
                  <input
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
                    style={inputStyle}
                  />
                  <label style={exerciseLabelStyle}>Series</label>
                  <input
                    type="number"
                    value={ejercicio.series}
                    min="1"
                    onChange={(e) =>
                      handleExerciseChange(
                        dayIndex,
                        groupIndex,
                        exerciseIndex,
                        "series",
                        Number(e.target.value)
                      )
                    }
                    style={inputStyle}
                  />
                  <label style={exerciseLabelStyle}>Repeticiones</label>
                  <input
                    type="number"
                    value={ejercicio.repeticiones}
                    min="1"
                    onChange={(e) =>
                      handleExerciseChange(
                        dayIndex,
                        groupIndex,
                        exerciseIndex,
                        "repeticiones",
                        Number(e.target.value)
                      )
                    }
                    style={inputStyle}
                  />
                  <label style={exerciseLabelStyle}>URL de Imagen</label>
                  <input
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
                    style={inputStyle}
                  />
                </div>
              ))}
              <button
                onClick={() => handleAddExercise(dayIndex, groupIndex)}
                style={addButtonStyle}
              >
                Agregar Ejercicio
              </button>
            </div>
          ))}
        </div>
      ))}
      <div style={buttonContainerStyle}>
        <button onClick={handleUpdateRoutine} style={saveButtonStyle}>
          Guardar Cambios
        </button>
        <button onClick={onClose} style={cancelButtonStyle}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  width: "100%", // Para que ocupe el ancho completo
  maxWidth: "800px", // Ajuste adicional para controlar el ancho máximo
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

const successStyle: React.CSSProperties = {
  color: "green",
  textAlign: "center",
  marginBottom: "1rem",
};

const inputContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginBottom: "1rem",
};

const labelStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontWeight: "bold",
};

const dayHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const groupHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const removeButtonStyle: React.CSSProperties = {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "0.3rem 0.6rem",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.9rem",
};

const exerciseLabelStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontSize: "0.9rem",
  fontWeight: "bold",
  marginBottom: "0.3rem",
};

const dayTitleStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontSize: "1.2rem",
};

const dayContainerStyle: React.CSSProperties = {
  backgroundColor: "#444",
  padding: "1rem",
  borderRadius: "8px",
  marginBottom: "1rem",
};

const groupContainerStyle: React.CSSProperties = {
  padding: "0.5rem",
  borderRadius: "4px",
  backgroundColor: "#555",
  marginTop: "0.5rem",
};

const groupTitleStyle: React.CSSProperties = {
  fontWeight: "bold",
  color: "#ffcc00",
};

const exerciseContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginBottom: "0.5rem",
};

const inputStyle: React.CSSProperties = {
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#555",
  color: "#fff",
};

const textareaStyle: React.CSSProperties = {
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#555",
  color: "#fff",
  resize: "vertical",
};

const selectStyle: React.CSSProperties = {
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#555",
  color: "#fff",
};

const addButtonStyle: React.CSSProperties = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "0.5rem",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "1rem",
};

const buttonContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
};

const saveButtonStyle: React.CSSProperties = {
  backgroundColor: "#ffcc00",
  color: "#000",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: "#bbb",
  color: "#333",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default EditRoutineForm;
