import React, { useState } from "react";
import { useAddDietForm } from "../hooks/useAddDietForm";
import NumberInput from "../theme/NumberInput";
import AIGenerator from "./AIGenerator";
import { useTranslation } from "react-i18next";

interface AddDietFormProps {
  clienteId: number;
  onDietAdded: () => void;
  onClose: () => void;
}

const AddDietForm: React.FC<AddDietFormProps> = ({
  clienteId,
  onDietAdded,
  onClose,
}) => {
  const {
    nombre,
    notas,
    comidas,
    error,
    setNombre,
    setNotas,
    handleAddDiet,
    handleAddComida,
    handleRemoveComida,
    handleComidaChange,
    handleAddAlimento,
    handleRemoveAlimento,
    handleAlimentoChange,
    handleCantidadChange,
    handleCloseWithConfirmation,
  } = useAddDietForm(clienteId, onDietAdded, onClose);

  const { t } = useTranslation();
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto bg-black bg-opacity-90 p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-primary mb-6 text-center">
        {t("addDiet.title")}
      </h3>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <label className="text-primary font-semibold">
            {t("addDiet.dietName")}:
          </label>
          <input
            className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            maxLength={70}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-primary font-semibold">
            {t("addDiet.notes")}:
          </label>
          <textarea
            className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary resize-vertical min-h-[40px]"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleAddComida}
          className="flex-1 bg-primary text-black py-2 px-6 rounded-md font-semibold cursor-pointer transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          {t("addDiet.addMeal")}
        </button>
        <button
          onClick={() => setShowAIGenerator(true)}
          className="flex-1 bg-blue-600 text-white py-2 px-6 rounded-md font-semibold cursor-pointer transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          🤖 {t("ai.generar")}
        </button>
      </div>

      {comidas.map((comida, comidaIndex) => (
        <div key={comidaIndex} className="mb-8 p-4 rounded-lg bg-dark-gray">
          <h4 className="text-lg font-bold text-primary mb-2">
            {t("addDiet.meal")} {comidaIndex + 1}
          </h4>

          <div className="flex gap-2 mb-2">
            <button
              onClick={() => handleAddAlimento(comidaIndex)}
              className="bg-primary text-black py-1 px-4 rounded-md font-semibold cursor-pointer transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              {t("addDiet.addFood")}
            </button>
            <button
              onClick={() => handleRemoveComida(comidaIndex)}
              className="bg-danger text-white py-1 px-4 rounded-md font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              {t("addDiet.removeMeal")}
            </button>
          </div>

          <input
            className="w-full p-2 rounded-md border border-border-gray bg-secondary text-white mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t("addDiet.mealNamePlaceholder")}
            value={comida.nombre}
            onChange={(e) =>
              handleComidaChange(comidaIndex, "nombre", e.target.value)
            }
          />
          <input
            className="w-full p-2 rounded-md border border-border-gray bg-secondary text-white mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
            type="time"
            placeholder={t("addDiet.timePlaceholder")}
            value={comida.hora}
            onChange={(e) =>
              handleComidaChange(comidaIndex, "hora", e.target.value)
            }
          />

          {comida.alimentos.map((alimento, alimentoIndex) => (
            <div
              key={alimentoIndex}
              className="grid grid-cols-1 md:grid-cols-4 gap-2 items-stretch mb-2 bg-black bg-opacity-60 p-2 rounded-md"
            >
              <input
                className="flex-1 p-2 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={t("addDiet.foodNamePlaceholder")}
                value={alimento.nombre}
                onChange={(e) =>
                  handleAlimentoChange(
                    comidaIndex,
                    alimentoIndex,
                    "nombre",
                    e.target.value
                  )
                }
              />
              <NumberInput
                value={alimento.cantidad}
                onChange={(newValue) =>
                  handleCantidadChange(newValue, comidaIndex, alimentoIndex)
                }
                placeholder={t("addDiet.quantityPlaceholder")}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  border: "1px solid var(--border-gray)",
                  backgroundColor: "var(--secondary)",
                  color: "white",
                  textAlign: "center",
                  height: "100%",
                }}
              />
              <input
                className="flex-1 p-2 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={t("addDiet.unitPlaceholder")}
                maxLength={10}
                value={alimento.unidad}
                onChange={(e) =>
                  handleAlimentoChange(
                    comidaIndex,
                    alimentoIndex,
                    "unidad",
                    e.target.value
                  )
                }
              />
              <button
                onClick={() => handleRemoveAlimento(comidaIndex, alimentoIndex)}
                className="bg-danger text-white py-1 px-3 rounded-md font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 h-full"
              >
                {t("addDiet.removeFood")}
              </button>
            </div>
          ))}
        </div>
      ))}

      <div className="flex justify-between gap-4 mt-8">
        <button
          onClick={handleAddDiet}
          className="flex-1 bg-primary text-black py-3 px-6 rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          {t("addDiet.saveDiet")}
        </button>
        <button
          onClick={handleCloseWithConfirmation}
          className="flex-1 bg-danger text-white py-3 px-6 rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          {t("common.cancel")}
        </button>
      </div>

      {showAIGenerator && (
        <AIGenerator
          clienteId={clienteId}
          allowedTypes={["Dieta", "Ambos"]}
          defaultType="Dieta"
          onDietaGenerada={(dieta) => {
            // Aquí podrías pre-llenar el formulario con los datos de la IA
            console.log("Dieta generada por IA:", dieta);
            setShowAIGenerator(false);
          }}
          onClose={() => setShowAIGenerator(false)}
        />
      )}
    </div>
  );
};

export default AddDietForm;
