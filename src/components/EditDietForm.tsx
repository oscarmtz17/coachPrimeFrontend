// src/components/EditDietForm.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useEditDietForm } from "../hooks/useEditDietForm";
import NumberInput from "../theme/NumberInput";

interface EditDietFormProps {
  clienteId: number;
  dietaId: number;
  onDietUpdated: () => void;
  onClose: () => void;
}

const EditDietForm: React.FC<EditDietFormProps> = ({
  clienteId,
  dietaId,
  onDietUpdated,
  onClose,
}) => {
  const { t } = useTranslation();
  const {
    nombre,
    setNombre,
    notas,
    setNotas,
    comidas,
    error,
    handleUpdateDiet,
    handleAddComida,
    handleRemoveComida,
    handleComidaChange,
    handleAddAlimento,
    handleRemoveAlimento,
    handleAlimentoChange,
    handleCantidadChange,
    handleCloseWithConfirmation,
  } = useEditDietForm(clienteId, dietaId, onDietUpdated, onClose);

  return (
    <div className="bg-zinc-800 text-white p-8 rounded-lg max-w-4xl mx-auto">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="mb-4">
        <label className="text-yellow-400 font-bold block">
          {t("editDiet.dietName")}:
        </label>
        <input
          className="w-full p-2 rounded border border-gray-300 bg-zinc-700 text-white mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          maxLength={70}
        />
      </div>
      <div className="mb-4">
        <label className="text-yellow-400 font-bold block">
          {t("editDiet.notes")}:
        </label>
        <textarea
          className="w-full p-2 rounded border border-gray-300 bg-zinc-700 text-white resize-y focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />
      </div>
      {comidas.map((comida, comidaIndex) => (
        <div key={comidaIndex} className="bg-zinc-700 p-4 rounded-lg mb-4">
          <h4 className="text-yellow-400 text-xl font-semibold mb-3">
            {t("editDiet.meal")} {comida.orden}
          </h4>
          <input
            className="w-full p-2 rounded border border-gray-300 bg-zinc-600 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder={t("editDiet.mealNamePlaceholder")}
            value={comida.nombre}
            onChange={(e) =>
              handleComidaChange(comidaIndex, "nombre", e.target.value)
            }
          />
          <input
            className="p-2 rounded border border-gray-300 bg-zinc-600 text-white mx-2 mb-2 w-40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            type="time"
            placeholder={t("editDiet.timePlaceholder")}
            value={comida.hora}
            onChange={(e) =>
              handleComidaChange(comidaIndex, "hora", e.target.value)
            }
          />
          <button
            onClick={() => handleRemoveComida(comidaIndex)}
            className="bg-red-600 text-white py-1 px-3 rounded text-sm mt-2 hover:bg-red-700 transition-colors"
          >
            {t("editDiet.removeMeal")}
          </button>

          {comida.alimentos.map((alimento, alimentoIndex) => (
            <div key={alimentoIndex} className="flex flex-col gap-2 mb-2">
              <input
                className="w-full p-2 rounded border border-gray-300 bg-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder={t("editDiet.foodNamePlaceholder")}
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
                placeholder={t("editDiet.quantityPlaceholder")}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid #d1d5db",
                  backgroundColor: "#52525b",
                  color: "#ffffff",
                  outline: "none",
                }}
              />
              <input
                className="w-full p-2 rounded border border-gray-300 bg-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder={t("editDiet.unitPlaceholder")}
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
                className="bg-red-600 text-white py-1 px-3 rounded text-sm hover:bg-red-700 transition-colors"
              >
                {t("editDiet.removeFood")}
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddAlimento(comidaIndex)}
            className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700 transition-colors"
          >
            {t("editDiet.addFood")}
          </button>
        </div>
      ))}
      <button
        onClick={handleAddComida}
        className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700 transition-colors"
      >
        {t("editDiet.addMeal")}
      </button>
      <div className="flex justify-between mt-6">
        <button
          onClick={handleUpdateDiet}
          className="bg-yellow-400 text-black py-2 px-4 rounded font-semibold hover:bg-yellow-300 transition-colors"
        >
          {t("editDiet.saveChanges")}
        </button>
        <button
          onClick={handleCloseWithConfirmation}
          className="bg-gray-300 text-zinc-800 py-2 px-4 rounded font-semibold hover:bg-gray-400 transition-colors"
        >
          {t("editDiet.close")}
        </button>
      </div>
    </div>
  );
};

export default EditDietForm;
