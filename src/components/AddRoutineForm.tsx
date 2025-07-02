// src/components/AddRoutineForm.tsx
import React, { useState } from "react";
import { useAddRoutineForm } from "../hooks/useAddRoutineForm";
import Modal from "./Modal";
import ImageSelector from "./ImageSelector";
import AIGenerator from "./AIGenerator";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [showAIGenerator, setShowAIGenerator] = useState(false);
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

  // Días de la semana (valores en inglés, textos traducidos)
  const weekDays = [
    { value: "Monday", label: t("addRoutine.monday") },
    { value: "Tuesday", label: t("addRoutine.tuesday") },
    { value: "Wednesday", label: t("addRoutine.wednesday") },
    { value: "Thursday", label: t("addRoutine.thursday") },
    { value: "Friday", label: t("addRoutine.friday") },
    { value: "Saturday", label: t("addRoutine.saturday") },
    { value: "Sunday", label: t("addRoutine.sunday") },
  ];

  // Agrupaciones (valores en inglés, textos traducidos)
  const groupTypes = [
    { value: "Single Exercise", label: t("addRoutine.singleExercise") },
    { value: "Bi-Set", label: t("addRoutine.biSet") },
    { value: "Tri-Set", label: t("addRoutine.triSet") },
    { value: "Quad-Set", label: t("addRoutine.quadSet") },
    { value: "Circuit", label: t("addRoutine.circuit") },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-black bg-opacity-90 p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-primary mb-6 text-center">
        {t("addRoutine.title")}
      </h3>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <label className="text-primary font-semibold">
            {t("addRoutine.routineName")}:
          </label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-primary font-semibold">
            {t("addRoutine.description")}:
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary resize-vertical min-h-[60px]"
            placeholder={t("addRoutine.descriptionPlaceholder")}
          />
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleAddDay}
          className="flex-1 bg-primary text-black py-2 px-6 rounded-md font-semibold cursor-pointer transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          {t("addRoutine.addDay")}
        </button>
        <button
          onClick={() => setShowAIGenerator(true)}
          className="flex-1 bg-blue-600 text-white py-2 px-6 rounded-md font-semibold cursor-pointer transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          🤖 {t("ai.generar")}
        </button>
      </div>
      {diasEntrenamiento.map((dia, dayIndex) => (
        <div key={dayIndex} className="mb-8 p-4 rounded-lg bg-dark-gray">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
            <h4 className="text-lg font-bold text-primary">
              {t("addRoutine.weekDay")}
            </h4>
            <button
              onClick={() => handleRemoveDay(dayIndex)}
              className="bg-danger text-white py-1 px-4 rounded-md font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              {t("addRoutine.removeDay")}
            </button>
          </div>
          <select
            value={dia.diaSemana}
            onChange={(e) => handleDayChange(dayIndex, e.target.value)}
            className="w-full p-2 rounded-md border border-border-gray bg-secondary text-white mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">{t("addRoutine.selectDay")}</option>
            {weekDays.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>

          <h4 className="text-lg font-bold text-primary mt-4">
            {t("addRoutine.group")}
          </h4>
          <select
            onChange={(e) => handleAddGroup(dayIndex, e.target.value)}
            className="w-full p-2 rounded-md border border-border-gray bg-secondary text-white mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">{t("addRoutine.selectGroup")}</option>
            {groupTypes.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>

          {dia.agrupaciones.map((agrupacion, groupIndex) => (
            <div
              key={groupIndex}
              className="mb-6 p-4 rounded-md bg-black bg-opacity-60"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                <h5 className="text-base font-bold text-primary">
                  {groupTypes.find((g) => g.value === agrupacion.tipo)?.label ||
                    agrupacion.tipo}
                </h5>
                <button
                  onClick={() => handleRemoveGroup(dayIndex, groupIndex)}
                  className="bg-danger text-white py-1 px-4 rounded-md font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  {t("addRoutine.removeGroup")}
                </button>
              </div>
              {agrupacion.ejercicios.map((ejercicio, exerciseIndex) => (
                <div
                  key={exerciseIndex}
                  className="mb-4 p-2 rounded bg-dark flex flex-col gap-2"
                >
                  <label className="text-primary text-sm font-semibold">
                    {t("addRoutine.exerciseName")}
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
                    {t("addRoutine.series")}
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
                    {t("addRoutine.repetitions")}
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
                        alt={t("addRoutine.exerciseImage")}
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
                      {t("addRoutine.selectExerciseImage")}
                    </button>
                  )}
                  {/* Botón para quitar ejercicio solo si la agrupación es tipo Circuito */}
                  {agrupacion.tipo === "Circuit" && (
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
                      {t("addRoutine.removeExercise")}
                    </button>
                  )}
                </div>
              ))}
              {agrupacion.tipo === "Circuit" && (
                <button
                  onClick={() =>
                    handleAddExerciseToCircuit(dayIndex, groupIndex)
                  }
                  className="bg-primary text-black py-1 px-4 rounded-md font-semibold cursor-pointer transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-2"
                >
                  {t("addRoutine.addExerciseToCircuit")}
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
          {t("addRoutine.saveRoutine")}
        </button>
        <button
          onClick={handleCloseWithConfirmation}
          className="flex-1 bg-danger text-white py-3 px-6 rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          {t("addRoutine.cancel")}
        </button>
      </div>

      <Modal isOpen={isImageSelectorOpen} onClose={closeImageSelector}>
        <ImageSelector onSelect={(key, url) => handleSelectImage(key, url)} />
      </Modal>

      {showAIGenerator && (
        <AIGenerator
          clienteId={clienteId}
          allowedTypes={["Rutina", "Ambos"]}
          defaultType="Rutina"
          onRutinaGenerada={(rutina) => {
            // Aquí podrías pre-llenar el formulario con los datos de la IA
            console.log("Rutina generada por IA:", rutina);
            setShowAIGenerator(false);
          }}
          onClose={() => setShowAIGenerator(false)}
        />
      )}
    </div>
  );
};

export default AddRoutineForm;
