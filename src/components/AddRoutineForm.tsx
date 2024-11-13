// src/components/AddRoutineForm.tsx
import React from "react";
import AddRoutineFormStyles from "../styles/AddRoutineFormStyles";
import { useAddRoutineForm } from "../hooks/useAddRoutineForm";
import Modal from "./Modal";
import ImageSelector from "./ImageSelector";

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
  const {
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    diasEntrenamiento,
    error,
    handleAddRoutine,
    handleAddDay,
    handleRemoveDay,
    handleDayChange,
    handleAddGroup,
    handleRemoveGroup,
    handleExerciseChange,
    handleAddExerciseToCircuit,
    isImageSelectorOpen,
    openImageSelector,
    closeImageSelector,
    handleSelectImage,
    handleRemoveImage,
  } = useAddRoutineForm(clienteId, usuarioId, onRoutineAdded, onClose);

  return (
    <div style={AddRoutineFormStyles.formContainer}>
      <h3 style={AddRoutineFormStyles.title}>Agregar Nueva Rutina</h3>
      {error && <p style={AddRoutineFormStyles.error}>{error}</p>}
      <div style={AddRoutineFormStyles.inputContainer}>
        <label style={AddRoutineFormStyles.label}>Nombre de la Rutina:</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={AddRoutineFormStyles.input}
        />
      </div>
      <div style={AddRoutineFormStyles.inputContainer}>
        <label style={AddRoutineFormStyles.label}>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={AddRoutineFormStyles.textarea}
        />
      </div>

      <button onClick={handleAddDay} style={AddRoutineFormStyles.addButton}>
        Agregar Día de Entrenamiento
      </button>
      {diasEntrenamiento.map((dia, dayIndex) => (
        <div key={dayIndex} style={AddRoutineFormStyles.dayContainer}>
          <div style={AddRoutineFormStyles.dayHeader}>
            <h4 style={AddRoutineFormStyles.subtitle}>Día de la Semana</h4>
            <button
              onClick={() => handleRemoveDay(dayIndex)}
              style={AddRoutineFormStyles.removeButton}
            >
              Quitar Día
            </button>
          </div>
          <select
            value={dia.diaSemana}
            onChange={(e) => handleDayChange(dayIndex, e.target.value)}
            style={AddRoutineFormStyles.select}
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

          <h4 style={AddRoutineFormStyles.subtitle}>Agrupación</h4>
          <select
            onChange={(e) => handleAddGroup(dayIndex, e.target.value)}
            style={AddRoutineFormStyles.select}
          >
            <option value="">Selecciona una agrupación</option>
            <option value="Ejercicio Individual">Ejercicio Individual</option>
            <option value="Bi-Serie">Bi-Serie</option>
            <option value="Tri-Serie">Tri-Serie</option>
            <option value="Cuatri-Serie">Cuatri-Serie</option>
            <option value="Circuito">Circuito</option>
          </select>

          {dia.agrupaciones.map((agrupacion, groupIndex) => (
            <div key={groupIndex} style={AddRoutineFormStyles.groupContainer}>
              <div style={AddRoutineFormStyles.groupHeader}>
                <h5 style={AddRoutineFormStyles.groupTitle}>
                  {agrupacion.tipo}
                </h5>
                <button
                  onClick={() => handleRemoveGroup(dayIndex, groupIndex)}
                  style={AddRoutineFormStyles.removeButton}
                >
                  Quitar Agrupación
                </button>
              </div>
              {agrupacion.ejercicios.map((ejercicio, exerciseIndex) => (
                <div
                  key={exerciseIndex}
                  style={AddRoutineFormStyles.exerciseContainer}
                >
                  <label style={AddRoutineFormStyles.exerciseLabel}>
                    Nombre del Ejercicio
                  </label>
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
                    style={AddRoutineFormStyles.input}
                  />
                  <label style={AddRoutineFormStyles.exerciseLabel}>
                    Series
                  </label>
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
                    style={AddRoutineFormStyles.input}
                  />
                  <label style={AddRoutineFormStyles.exerciseLabel}>
                    Repeticiones
                  </label>
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
                    style={AddRoutineFormStyles.input}
                  />
                  {ejercicio.imagenUrl ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={ejercicio.imagenUrl}
                        alt="Imagen del Ejercicio"
                        style={{
                          width: 100,
                          height: 100,
                          marginRight: "0.5rem",
                        }}
                      />
                      <button
                        onClick={() =>
                          handleRemoveImage(dayIndex, groupIndex, exerciseIndex)
                        }
                        style={AddRoutineFormStyles.removeButton}
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        openImageSelector(dayIndex, groupIndex, exerciseIndex)
                      }
                      style={AddRoutineFormStyles.addButton}
                    >
                      Seleccionar Imagen para Ejercicio
                    </button>
                  )}
                </div>
              ))}

              {agrupacion.tipo === "Circuito" && (
                <button
                  onClick={() =>
                    handleAddExerciseToCircuit(dayIndex, groupIndex)
                  }
                  style={AddRoutineFormStyles.addButton}
                >
                  Agregar Ejercicio al Circuito
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
      <div style={AddRoutineFormStyles.buttonContainer}>
        <button
          onClick={handleAddRoutine}
          style={AddRoutineFormStyles.saveButton}
        >
          Guardar Rutina
        </button>
        <button onClick={onClose} style={AddRoutineFormStyles.cancelButton}>
          Cancelar
        </button>
      </div>

      <Modal isOpen={isImageSelectorOpen} onClose={closeImageSelector}>
        <ImageSelector onSelect={handleSelectImage} />
      </Modal>
    </div>
  );
};

export default AddRoutineForm;
