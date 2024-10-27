// src/components/AddRoutineForm.tsx
import React, { useState } from "react";
import axios from "axios";

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
  onRoutineAdded: () => void; // Para actualizar la lista de rutinas después de agregar una nueva
  onClose: () => void; // Para cerrar el formulario
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
      const token = localStorage.getItem("token");
      const routine: Routine = {
        nombre,
        descripcion,
        clienteId,
        usuarioId,
        diasEntrenamiento,
      };

      await axios.post("http://localhost:5267/api/rutina", routine, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
    const newDay: DiaEntrenamiento = {
      diaSemana: "",
      agrupaciones: [],
    };
    setDiasEntrenamiento([...diasEntrenamiento, newDay]);
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
        exerciseCount = 0; // Para permitir agregar ejercicios dinámicamente
        break;
      default:
        exerciseCount = 1;
    }

    return Array.from({ length: exerciseCount }, () => ({
      nombre: "",
      series: 0,
      repeticiones: 0,
      imagenUrl: "",
    }));
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

  const handleAddExerciseToCircuit = (dayIndex: number, groupIndex: number) => {
    const newExercise: Ejercicio = {
      nombre: "",
      series: 0,
      repeticiones: 0,
      imagenUrl: "",
    };

    const updatedDays = [...diasEntrenamiento];
    updatedDays[dayIndex].agrupaciones[groupIndex].ejercicios.push(newExercise);
    setDiasEntrenamiento(updatedDays);
  };

  return (
    <div>
      <h3>Agregar Nueva Rutina</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
      <div>
        <button onClick={handleAddDay}>Agregar Día de Entrenamiento</button>
      </div>
      {diasEntrenamiento.map((dia, dayIndex) => (
        <div key={dayIndex}>
          <h4>Día de la Semana</h4>
          <select
            value={dia.diaSemana}
            onChange={(e) => handleDayChange(dayIndex, e.target.value)}
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

          <h4>Agrupación</h4>
          <select onChange={(e) => handleAddGroup(dayIndex, e.target.value)}>
            <option value="">Selecciona una agrupación</option>
            <option value="Ejercicio Individual">Ejercicio Individual</option>
            <option value="Bi-Serie">Bi-Serie</option>
            <option value="Tri-Serie">Tri-Serie</option>
            <option value="Cuatri-Serie">Cuatri-Serie</option>
            <option value="Circuito">Circuito</option>
          </select>

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

              {agrupacion.tipo === "Circuito" && (
                <button
                  onClick={() =>
                    handleAddExerciseToCircuit(dayIndex, groupIndex)
                  }
                >
                  Agregar Ejercicio al Circuito
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleAddRoutine}>Guardar Rutina</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default AddRoutineForm;
