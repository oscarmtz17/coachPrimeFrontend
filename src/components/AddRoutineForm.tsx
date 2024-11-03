// src/components/AddRoutineForm.tsx
import React, { useState } from "react";
import axios from "axios";
import api from "../services/api";

interface Routine {
  nombre: string;
  descripcion: string;
  clienteId: number;
  usuarioId: number;
  diasEntrenamiento: DiaEntrenamiento[];
}

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

interface AddRoutineFormProps {
  clienteId: number;
  usuarioId: number;
  onRoutineAdded: () => void;
  onClose: () => void;
}

const AddRoutineForm: React.FC<AddRoutineFormProps> = ({
  clienteId,
  usuarioId,
  onRoutineAdded,
  onClose,
}) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [diasEntrenamiento, setDiasEntrenamiento] = useState<
    DiaEntrenamiento[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddRoutine = async () => {
    try {
      const routine: Routine = {
        nombre,
        descripcion,
        clienteId,
        usuarioId,
        diasEntrenamiento,
      };

      await api.post("/rutina", routine);

      onRoutineAdded();
      setNombre("");
      setDescripcion("");
      setDiasEntrenamiento([]);
      onClose();
    } catch (err) {
      setError("Error al agregar la rutina");
      console.error(err);
    }
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

  const handleDayChange = (index: number, diaSemana: string) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays[index].diaSemana = diaSemana;
    setDiasEntrenamiento(updatedDays);
  };

  const handleAddGroup = (index: number, tipo: string) => {
    const newGroup: Agrupacion = {
      tipo,
      ejercicios: createInitialExercises(tipo),
    };

    const updatedDays = [...diasEntrenamiento];
    updatedDays[index].agrupaciones.push(newGroup);
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

  const handleRemoveGroup = (dayIndex: number, groupIndex: number) => {
    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones.splice(groupIndex, 1);
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
    const updatedValue =
      field === "series" || field === "repeticiones"
        ? Math.max(1, Number(value))
        : value;

    group.ejercicios[exerciseIndex] = {
      ...group.ejercicios[exerciseIndex],
      [field]: updatedValue,
    };
    setDiasEntrenamiento(updatedDays);
  };

  const handleAddExerciseToCircuit = (dayIndex: number, groupIndex: number) => {
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

  return (
    <div style={formContainerStyle}>
      <h3 style={titleStyle}>Agregar Nueva Rutina</h3>
      {error && <p style={errorStyle}>{error}</p>}
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
            <h4 style={subtitleStyle}>Día de la Semana</h4>
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

          <h4 style={subtitleStyle}>Agrupación</h4>
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

              {agrupacion.tipo === "Circuito" && (
                <button
                  onClick={() =>
                    handleAddExerciseToCircuit(dayIndex, groupIndex)
                  }
                  style={addButtonStyle}
                >
                  Agregar Ejercicio al Circuito
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
      <div style={buttonContainerStyle}>
        <button onClick={handleAddRoutine} style={saveButtonStyle}>
          Guardar Rutina
        </button>
        <button onClick={onClose} style={cancelButtonStyle}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

// Additional styles
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

const formContainerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const titleStyle: React.CSSProperties = {
  color: "#ffcc00",
  textAlign: "center",
  fontSize: "1.8rem",
  marginBottom: "1rem",
};

const subtitleStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontSize: "1.2rem",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  textAlign: "center",
  marginBottom: "1rem",
};

const inputContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginBottom: "1rem",
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

const labelStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontWeight: "bold",
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

const buttonContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  marginTop: "1rem",
};

const saveButtonStyle: React.CSSProperties = {
  backgroundColor: "#ffcc00",
  color: "#000",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  flex: 1,
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: "#bbb",
  color: "#333",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  flex: 1,
};

const addButtonStyle: React.CSSProperties = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "0.5rem",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "1rem",
};

export default AddRoutineForm;
