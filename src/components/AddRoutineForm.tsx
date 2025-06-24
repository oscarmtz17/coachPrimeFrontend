// src/components/AddRoutineForm.tsx
import React from "react";
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
    handleRemoveExerciseFromCircuit,
    handleCloseWithConfirmation,
  } = useAddRoutineForm(clienteId, usuarioId, onRoutineAdded, onClose);

  return (
    <div className="w-full max-w-3xl mx-auto bg-black bg-opacity-90 p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-primary mb-6 text-center">
        Agregar Nueva Rutina
      </h3>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <label className="text-primary font-semibold">
            Nombre de la Rutina:
          </label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-primary font-semibold">Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary resize-vertical min-h-[60px]"
            placeholder="Agrega una descripcion opcional"
          />
        </div>
      </div>
      <button
        onClick={handleAddDay}
        className="mb-6 bg-primary text-black py-2 px-6 rounded-md font-semibold cursor-pointer transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
      >
        Agregar Día de Entrenamiento
      </button>
      {diasEntrenamiento.map((dia, dayIndex) => (
        <div key={dayIndex} className="mb-8 p-4 rounded-lg bg-dark-gray">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
            <h4 className="text-lg font-bold text-primary">Día de la Semana</h4>
            <button
              onClick={() => handleRemoveDay(dayIndex)}
              className="bg-danger text-white py-1 px-4 rounded-md font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Quitar Día
            </button>
          </div>
          <select
            value={dia.diaSemana}
            onChange={(e) => handleDayChange(dayIndex, e.target.value)}
            className="w-full p-2 rounded-md border border-border-gray bg-secondary text-white mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
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

          <h4 className="text-lg font-bold text-primary mt-4">Agrupación</h4>
          <select
            onChange={(e) => handleAddGroup(dayIndex, e.target.value)}
            className="w-full p-2 rounded-md border border-border-gray bg-secondary text-white mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Selecciona una agrupación</option>
            <option value="Ejercicio Individual">Ejercicio Individual</option>
            <option value="Bi-Serie">Bi-Serie</option>
            <option value="Tri-Serie">Tri-Serie</option>
            <option value="Cuatri-Serie">Cuatri-Serie</option>
            <option value="Circuito">Circuito</option>
          </select>

          {dia.agrupaciones.map((agrupacion, groupIndex) => (
            <div
              key={groupIndex}
              className="mb-6 p-4 rounded-md bg-black bg-opacity-60"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                <h5 className="text-base font-bold text-primary">
                  {agrupacion.tipo}
                </h5>
                <button
                  onClick={() => handleRemoveGroup(dayIndex, groupIndex)}
                  className="bg-danger text-white py-1 px-4 rounded-md font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Quitar Agrupación
                </button>
              </div>
              {agrupacion.ejercicios.map((ejercicio, exerciseIndex) => (
                <div
                  key={exerciseIndex}
                  className="mb-4 p-2 rounded bg-dark flex flex-col gap-2"
                >
                  <label className="text-primary text-sm font-semibold">
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
                    className="w-full p-2 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <label className="text-primary text-sm font-semibold">
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
                    className="w-full p-2 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <label className="text-primary text-sm font-semibold">
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
                    className="w-full p-2 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {ejercicio.imagenUrl ? (
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={ejercicio.imagenUrl}
                        alt="Imagen del Ejercicio"
                        className="w-24 h-24 object-cover rounded mr-2"
                      />
                      <button
                        onClick={() =>
                          handleRemoveImage(dayIndex, groupIndex, exerciseIndex)
                        }
                        className="bg-danger text-white py-1 px-3 rounded-md font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        openImageSelector(dayIndex, groupIndex, exerciseIndex)
                      }
                      className="bg-primary text-black py-1 px-4 rounded-md font-semibold cursor-pointer transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      Seleccionar Imagen para Ejercicio
                    </button>
                  )}
                  {/* Botón para quitar ejercicio solo si la agrupación es tipo Circuito */}
                  {agrupacion.tipo === "Circuito" && (
                    <button
                      onClick={() =>
                        handleRemoveExerciseFromCircuit(
                          dayIndex,
                          groupIndex,
                          exerciseIndex
                        )
                      }
                      className="bg-danger text-white py-1 px-4 rounded-md font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Quitar Ejercicio
                    </button>
                  )}
                </div>
              ))}
              {agrupacion.tipo === "Circuito" && (
                <button
                  onClick={() =>
                    handleAddExerciseToCircuit(dayIndex, groupIndex)
                  }
                  className="bg-primary text-black py-1 px-4 rounded-md font-semibold cursor-pointer transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-2"
                >
                  Agregar Ejercicio al Circuito
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-between gap-4 mt-8">
        <button
          onClick={handleAddRoutine}
          className="flex-1 bg-primary text-black py-3 px-6 rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          Guardar Rutina
        </button>
        <button
          onClick={handleCloseWithConfirmation}
          className="flex-1 bg-danger text-white py-3 px-6 rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          Cancelar
        </button>
      </div>

      <Modal isOpen={isImageSelectorOpen} onClose={closeImageSelector}>
        <ImageSelector onSelect={(key, url) => handleSelectImage(key, url)} />
      </Modal>
    </div>
  );
};

export default AddRoutineForm;
