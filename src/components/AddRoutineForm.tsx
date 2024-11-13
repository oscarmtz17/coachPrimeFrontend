// src/components/AddRoutineForm.tsx
import React from "react";
import {
  formContainerStyle,
  titleStyle,
  errorStyle,
  inputContainerStyle,
  labelStyle,
  inputStyle,
  textareaStyle,
  selectStyle,
  dayContainerStyle,
  dayHeaderStyle,
  subtitleStyle,
  removeButtonStyle,
  groupContainerStyle,
  groupHeaderStyle,
  groupTitleStyle,
  exerciseContainerStyle,
  exerciseLabelStyle,
  buttonContainerStyle,
  saveButtonStyle,
  cancelButtonStyle,
  addButtonStyle,
} from "../styles/AddRoutineFormStyles";
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
                        style={removeButtonStyle}
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        openImageSelector(dayIndex, groupIndex, exerciseIndex)
                      }
                      style={addButtonStyle}
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

      <Modal isOpen={isImageSelectorOpen} onClose={closeImageSelector}>
        <ImageSelector onSelect={handleSelectImage} />
      </Modal>
    </div>
  );
};

export default AddRoutineForm;
