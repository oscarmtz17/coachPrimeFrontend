// src/components/EditRoutineForm.tsx
import React from "react";
import EditRoutineFormStyles from "../styles/EditRoutineFormStyles";
import { useEditRoutineForm } from "../hooks/useEditRoutineForm";
import Modal from "./Modal";
import ImageSelector from "./ImageSelector";

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
  const {
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    diasEntrenamiento,
    error,
    successMessage,
    handleUpdateRoutine,
    handleAddDay,
    handleRemoveDay,
    handleDayChange,
    handleAddGroup,
    handleRemoveGroup,
    handleExerciseChange,
    handleAddExercise,
    handleRemoveExercise,
    isImageSelectorOpen,
    openImageSelector,
    closeImageSelector,
    handleSelectImage,
    handleRemoveImage,
  } = useEditRoutineForm(rutinaId, onRoutineUpdated, onClose);

  return (
    <div style={EditRoutineFormStyles.container}>
      <h3 style={EditRoutineFormStyles.title}>Editar Rutina</h3>
      {error && <p style={EditRoutineFormStyles.error}>{error}</p>}
      {successMessage && (
        <p style={EditRoutineFormStyles.success}>{successMessage}</p>
      )}

      <div style={EditRoutineFormStyles.inputContainer}>
        <label style={EditRoutineFormStyles.label}>Nombre de la Rutina:</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={EditRoutineFormStyles.input}
        />
      </div>

      <div style={EditRoutineFormStyles.inputContainer}>
        <label style={EditRoutineFormStyles.label}>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={EditRoutineFormStyles.textarea}
        />
      </div>

      <button onClick={handleAddDay} style={EditRoutineFormStyles.addButton}>
        Agregar Día de Entrenamiento
      </button>

      {diasEntrenamiento.map((dia, dayIndex) => (
        <div key={dayIndex} style={EditRoutineFormStyles.dayContainer}>
          <div style={EditRoutineFormStyles.dayHeader}>
            <h4 style={EditRoutineFormStyles.dayTitle}>Día de la Semana</h4>
            <button
              onClick={() => handleRemoveDay(dayIndex)}
              style={EditRoutineFormStyles.removeButton}
            >
              Quitar Día
            </button>
          </div>

          <select
            value={dia.diaSemana}
            onChange={(e) => handleDayChange(dayIndex, e.target.value)}
            style={EditRoutineFormStyles.select}
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

          <h4 style={EditRoutineFormStyles.subtitle}>Agrupación</h4>
          <select
            onChange={(e) => handleAddGroup(dayIndex, e.target.value)}
            style={EditRoutineFormStyles.select}
          >
            <option value="">Selecciona una agrupación</option>
            <option value="Ejercicio Individual">Ejercicio Individual</option>
            <option value="Bi-Serie">Bi-Serie</option>
            <option value="Tri-Serie">Tri-Serie</option>
            <option value="Cuatri-Serie">Cuatri-Serie</option>
            <option value="Circuito">Circuito</option>
          </select>

          {dia.agrupaciones.map((agrupacion, groupIndex) => (
            <div key={groupIndex} style={EditRoutineFormStyles.groupContainer}>
              <div style={EditRoutineFormStyles.groupHeader}>
                <h5 style={EditRoutineFormStyles.groupTitle}>
                  {agrupacion.tipo}
                </h5>
                <button
                  onClick={() => handleRemoveGroup(dayIndex, groupIndex)}
                  style={EditRoutineFormStyles.removeButton}
                >
                  Quitar Agrupación
                </button>
              </div>

              {agrupacion.ejercicios.map((ejercicio, exerciseIndex) => (
                <div
                  key={exerciseIndex}
                  style={EditRoutineFormStyles.exerciseContainer}
                >
                  <label style={EditRoutineFormStyles.exerciseLabel}>
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
                    style={EditRoutineFormStyles.input}
                  />
                  <label style={EditRoutineFormStyles.exerciseLabel}>
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
                    style={EditRoutineFormStyles.input}
                  />
                  <label style={EditRoutineFormStyles.exerciseLabel}>
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
                    style={EditRoutineFormStyles.input}
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
                        style={EditRoutineFormStyles.removeButton}
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        openImageSelector(dayIndex, groupIndex, exerciseIndex)
                      }
                      style={EditRoutineFormStyles.addButton}
                    >
                      Seleccionar Imagen para Ejercicio
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={() => handleAddExercise(dayIndex, groupIndex)}
                style={EditRoutineFormStyles.addButton}
              >
                Agregar Ejercicio
              </button>
            </div>
          ))}
        </div>
      ))}

      <div style={EditRoutineFormStyles.buttonContainer}>
        <button
          onClick={handleUpdateRoutine}
          style={EditRoutineFormStyles.saveButton}
        >
          Guardar Cambios
        </button>
        <button onClick={onClose} style={EditRoutineFormStyles.cancelButton}>
          Cerrar
        </button>
      </div>

      <Modal isOpen={isImageSelectorOpen} onClose={closeImageSelector}>
        <ImageSelector onSelect={handleSelectImage} />
      </Modal>
    </div>
  );
};

export default EditRoutineForm;
