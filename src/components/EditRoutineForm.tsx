// src/components/EditRoutineForm.tsx
import React from "react";
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
    isImageSelectorOpen,
    openImageSelector,
    closeImageSelector,
    handleSelectImage,
    handleRemoveImage,
    handleRemoveExerciseFromCircuit,
    handleCloseWithConfirmation,
  } = useEditRoutineForm(rutinaId, onRoutineUpdated, onClose);

  return (
    <div className="bg-zinc-800 text-white p-6 rounded-lg w-full max-w-4xl mx-auto">
      <h3 className="text-yellow-400 text-2xl text-center font-semibold mb-4">
        Editar Rutina
      </h3>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-center mb-4">{successMessage}</p>
      )}

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-yellow-400 font-bold">
          Nombre de la Rutina:
        </label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="p-2 rounded border border-gray-300 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-yellow-400 font-bold">Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="p-2 rounded border border-gray-300 bg-zinc-700 text-white resize-y focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <button
        onClick={handleAddDay}
        className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700 transition-colors"
      >
        Agregar Día de Entrenamiento
      </button>

      {diasEntrenamiento.map((dia, dayIndex) => (
        <div key={dayIndex} className="bg-zinc-700 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-yellow-400 text-xl font-semibold">
              Día de la Semana
            </h4>
            <button
              onClick={() => handleRemoveDay(dayIndex)}
              className="bg-red-600 text-white border-none py-1 px-3 rounded cursor-pointer text-sm hover:bg-red-700 transition-colors"
            >
              Quitar Día
            </button>
          </div>

          <select
            value={dia.diaSemana}
            onChange={(e) => handleDayChange(dayIndex, e.target.value)}
            className="p-2 rounded border border-gray-300 bg-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
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

          <h4 className="text-yellow-400 text-xl font-semibold mt-4 mb-2">
            Agrupación
          </h4>
          <select
            onChange={(e) => handleAddGroup(dayIndex, e.target.value)}
            className="p-2 rounded border border-gray-300 bg-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
          >
            <option value="">Selecciona una agrupación</option>
            <option value="Ejercicio Individual">Ejercicio Individual</option>
            <option value="Bi-Serie">Bi-Serie</option>
            <option value="Tri-Serie">Tri-Serie</option>
            <option value="Cuatri-Serie">Cuatri-Serie</option>
            <option value="Circuito">Circuito</option>
          </select>

          {dia.agrupaciones.map((agrupacion, groupIndex) => (
            <div key={groupIndex} className="p-3 rounded bg-zinc-600 mt-2">
              <div className="flex justify-between items-center mb-3">
                <h5 className="font-bold text-yellow-400">{agrupacion.tipo}</h5>
                <button
                  onClick={() => handleRemoveGroup(dayIndex, groupIndex)}
                  className="bg-red-600 text-white border-none py-1 px-3 rounded cursor-pointer text-sm hover:bg-red-700 transition-colors"
                >
                  Quitar Agrupación
                </button>
              </div>

              {agrupacion.ejercicios.map((ejercicio, exerciseIndex) => (
                <div key={exerciseIndex} className="flex flex-col gap-2 mb-2">
                  <label className="text-yellow-400 text-sm font-bold">
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
                    className="p-2 rounded border border-gray-300 bg-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <label className="text-yellow-400 text-sm font-bold">
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
                    className="p-2 rounded border border-gray-300 bg-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <label className="text-yellow-400 text-sm font-bold">
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
                    className="p-2 rounded border border-gray-300 bg-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />

                  {ejercicio.imagenKey || ejercicio.imagenUrl ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={ejercicio.imagenUrl || ejercicio.imagenKey}
                        alt="Imagen del Ejercicio"
                        className="w-24 h-24 object-cover rounded border border-gray-300"
                      />
                      <button
                        onClick={() =>
                          handleRemoveImage(dayIndex, groupIndex, exerciseIndex)
                        }
                        className="bg-red-600 text-white border-none py-1 px-3 rounded cursor-pointer text-sm hover:bg-red-700 transition-colors"
                      >
                        Quitar Imagen
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        openImageSelector(dayIndex, groupIndex, exerciseIndex)
                      }
                      className="bg-blue-600 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700 transition-colors"
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
                      className="bg-red-600 text-white border-none py-1 px-3 rounded cursor-pointer text-sm hover:bg-red-700 transition-colors"
                    >
                      Quitar Ejercicio
                    </button>
                  )}
                </div>
              ))}

              {agrupacion.tipo === "Circuito" && (
                <button
                  onClick={() => handleAddExercise(dayIndex, groupIndex)}
                  className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700 transition-colors"
                >
                  Agregar Ejercicio
                </button>
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          onClick={handleUpdateRoutine}
          className="bg-yellow-400 text-black py-2 px-4 rounded font-semibold hover:bg-yellow-300 transition-colors"
        >
          Guardar Cambios
        </button>
        <button
          onClick={handleCloseWithConfirmation}
          className="bg-gray-300 text-zinc-800 py-2 px-4 rounded font-semibold hover:bg-gray-400 transition-colors"
        >
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
