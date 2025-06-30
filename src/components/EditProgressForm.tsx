import React from "react";
import { useTranslation } from "react-i18next";
import useEditProgressForm from "../hooks/useEditProgressForm";

interface Progress {
  progresoId: number;
  fechaRegistro: string;
  pesoKg: number;
  estaturaCm: number;
  nivelActividad: string;
  factorActividad: number;
  cinturaCm: number;
  caderaCm: number;
  pechoCm: number;
  brazoCm: number;
  piernaCm: number;
  notas: string;
}

interface EditProgressFormProps {
  clienteId: number;
  progress: Progress;
  onSave: () => void;
  onClose: () => void;
}

const EditProgressForm: React.FC<EditProgressFormProps> = ({
  clienteId,
  progress,
  onSave,
  onClose,
}) => {
  const { t } = useTranslation();
  const {
    formData,
    error,
    existingImages,
    newImages,
    handleChange,
    handleSave,
    handleAddImages,
    handleRemoveImage,
    handleCloseWithConfirmation,
  } = useEditProgressForm(clienteId, progress, onSave, onClose);

  const PROGRESS_FIELDS = [
    { label: t("addProgress.weight"), name: "pesoKg", value: formData.pesoKg },
    {
      label: t("addProgress.height"),
      name: "estaturaCm",
      value: formData.estaturaCm,
    },
    {
      label: t("addProgress.waist"),
      name: "cinturaCm",
      value: formData.cinturaCm,
    },
    { label: t("addProgress.hip"), name: "caderaCm", value: formData.caderaCm },
    { label: t("addProgress.chest"), name: "pechoCm", value: formData.pechoCm },
    { label: t("addProgress.arm"), name: "brazoCm", value: formData.brazoCm },
    { label: t("addProgress.leg"), name: "piernaCm", value: formData.piernaCm },
  ];

  return (
    <div className="bg-zinc-800 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-yellow-400 text-2xl text-center font-semibold">
          {t("editProgress.title")}
        </h3>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Campos de datos */}
      {PROGRESS_FIELDS.map(({ label, name, value }, index) => (
        <div className="flex flex-col gap-2 mb-4" key={index}>
          <label className="text-yellow-400 font-bold">{label}</label>
          <input
            type="number"
            name={name}
            value={value}
            min="1"
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      ))}

      {/* Campo de Nivel de Actividad */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-yellow-400 font-bold">
          {t("addProgress.activityLevel")}:
        </label>
        <select
          name="nivelActividad"
          value={formData.nivelActividad}
          onChange={(e) => {
            const nivel = e.target.value; // Siempre en inglés
            let factor = formData.factorActividad;
            switch (nivel) {
              case "Very Light":
                factor = 1.2;
                break;
              case "Light":
                factor = 1.375;
                break;
              case "Moderate":
                factor = 1.55;
                break;
              case "Active":
                factor = 1.725;
                break;
              case "Very Active":
                factor = 1.9;
                break;
              default:
                break;
            }
            // Actualiza ambos campos
            handleChange({
              target: { name: "nivelActividad", value: nivel },
            } as React.ChangeEvent<HTMLInputElement>);
            handleChange({
              target: { name: "factorActividad", value: factor.toString() },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          className="p-2 rounded border border-gray-300 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">{t("addProgress.selectLevel")}</option>
          <option value="Very Light">
            {t("addProgress.veryLight")} (1.2) -{" "}
            {t("addProgress.veryLightDesc")}
          </option>
          <option value="Light">
            {t("addProgress.light")} (1.375) - {t("addProgress.lightDesc")}
          </option>
          <option value="Moderate">
            {t("addProgress.moderate")} (1.55) - {t("addProgress.moderateDesc")}
          </option>
          <option value="Active">
            {t("addProgress.active")} (1.725) - {t("addProgress.activeDesc")}
          </option>
          <option value="Very Active">
            {t("addProgress.veryActive")} (1.9) -{" "}
            {t("addProgress.veryActiveDesc")}
          </option>
        </select>
      </div>

      {/* Campo de Factor de Actividad */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-yellow-400 font-bold">
          {t("addProgress.activityFactor")}:
        </label>
        <input
          type="number"
          name="factorActividad"
          value={formData.factorActividad}
          min="1.2"
          step="0.01"
          onChange={handleChange}
          className="p-2 rounded border border-gray-300 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Campo de Notas */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-yellow-400 font-bold">
          {t("addProgress.notes")}:
        </label>
        <textarea
          name="notas"
          value={formData.notas}
          onChange={handleChange}
          className="p-2 rounded border border-gray-300 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-vertical min-h-[80px]"
        />
      </div>

      {/* Sección de imágenes existentes */}
      <div className="mt-6">
        <h4 className="text-yellow-400 font-semibold mb-3">
          {t("editProgress.existingImages")}
        </h4>
        <div className="flex flex-wrap gap-4">
          {existingImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`${t("editProgress.image")} ${index + 1}`}
                className="w-24 h-24 object-cover rounded border border-gray-300"
              />
              <button
                className="absolute -top-2 -right-2 bg-red-600 text-white border-none rounded-full cursor-pointer text-xs w-5 h-5 flex items-center justify-center hover:bg-red-700 transition-colors"
                onClick={() => handleRemoveImage(index, true)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Añadir nuevas imágenes */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-yellow-400 font-bold">
          {t("editProgress.addImages")}:
        </label>
        <p className="text-sm text-gray-300">
          {existingImages.length + newImages.length}/10{" "}
          {t("addProgress.imagesSelected")}
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleAddImages}
          disabled={existingImages.length + newImages.length >= 10}
          className="p-2 rounded border border-gray-300 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {newImages.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-3">
            {newImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`${t("editProgress.newImage")} ${index + 1}`}
                  className="w-24 h-24 object-cover rounded border border-gray-300"
                />
                <button
                  className="absolute -top-2 -right-2 bg-red-600 text-white border-none rounded-full cursor-pointer text-xs w-5 h-5 flex items-center justify-center hover:bg-red-700 transition-colors"
                  onClick={() => handleRemoveImage(index, false)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-between gap-4 mt-6">
        <button
          onClick={handleSave}
          className="bg-yellow-400 text-black py-2 px-4 rounded font-semibold flex-1 hover:bg-yellow-300 transition-colors"
        >
          {t("editProgress.saveChanges")}
        </button>
        <button
          onClick={handleCloseWithConfirmation}
          className="bg-gray-300 text-zinc-800 py-2 px-4 rounded font-semibold flex-1 hover:bg-gray-400 transition-colors"
        >
          {t("addProgress.cancel")}
        </button>
      </div>
    </div>
  );
};

export default EditProgressForm;
