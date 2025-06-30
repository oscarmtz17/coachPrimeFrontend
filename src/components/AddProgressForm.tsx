// src/components/AddProgressForm.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import useAddProgressForm from "../hooks/useAddProgressForm";

interface AddProgressFormProps {
  clienteId: number;
  onProgressAdded: () => void;
  onClose: () => void;
}

const AddProgressForm: React.FC<AddProgressFormProps> = ({
  clienteId,
  onProgressAdded,
  onClose,
}) => {
  const { t } = useTranslation();
  const {
    pesoKg,
    estaturaCm,
    nivelActividad,
    factorActividad,
    cinturaCm,
    caderaCm,
    pechoCm,
    brazoCm,
    piernaCm,
    notas,
    error,
    images,
    setImages,
    isSubmitting,
    handleImageUpload,
    handleRemoveImage,
    setPesoKg,
    setEstaturaCm,
    setNivelActividad,
    setFactorActividad,
    setCinturaCm,
    setCaderaCm,
    setPechoCm,
    setBrazoCm,
    setPiernaCm,
    setNotas,
    handleSaveProgress,
    handlePositiveInputChange,
    handleCloseWithConfirmation,
  } = useAddProgressForm(clienteId, onProgressAdded, onClose);

  // Relacionar keys con valores y setters
  const values: Record<string, any> = {
    pesoKg,
    estaturaCm,
    cinturaCm,
    caderaCm,
    pechoCm,
    brazoCm,
    piernaCm,
  };
  const setters: Record<string, any> = {
    setPesoKg,
    setEstaturaCm,
    setCinturaCm,
    setCaderaCm,
    setPechoCm,
    setBrazoCm,
    setPiernaCm,
  };

  const PROGRESS_FIELDS = [
    {
      label: t("addProgress.weight"),
      valueKey: "pesoKg",
      setterKey: "setPesoKg",
    },
    {
      label: t("addProgress.height"),
      valueKey: "estaturaCm",
      setterKey: "setEstaturaCm",
    },
    {
      label: t("addProgress.waist"),
      valueKey: "cinturaCm",
      setterKey: "setCinturaCm",
    },
    {
      label: t("addProgress.hip"),
      valueKey: "caderaCm",
      setterKey: "setCaderaCm",
    },
    {
      label: t("addProgress.chest"),
      valueKey: "pechoCm",
      setterKey: "setPechoCm",
    },
    {
      label: t("addProgress.arm"),
      valueKey: "brazoCm",
      setterKey: "setBrazoCm",
    },
    {
      label: t("addProgress.leg"),
      valueKey: "piernaCm",
      setterKey: "setPiernaCm",
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-black bg-opacity-90 p-8 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-primary text-center">
          {t("addProgress.title")}
        </h3>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Campos de progreso */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {PROGRESS_FIELDS.map(({ label, valueKey, setterKey }, index) => (
          <div key={index} className="flex flex-col gap-2">
            <label className="text-primary font-semibold">{label}</label>
            <input
              type="number"
              value={values[valueKey]}
              onChange={handlePositiveInputChange(setters[setterKey])}
              className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-primary font-semibold">
          {t("addProgress.activityLevel")}:
        </label>
        <select
          value={nivelActividad}
          onChange={(e) => {
            const nivel = e.target.value; // Siempre en inglés
            let factor = factorActividad;
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
            setNivelActividad(nivel); // Siempre en inglés
            setFactorActividad(factor);
          }}
          className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
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

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-primary font-semibold">
          {t("addProgress.activityFactor")}:
        </label>
        <input
          type="number"
          value={factorActividad}
          min={1.2}
          step={0.01}
          onChange={(e) => setFactorActividad(Number(e.target.value))}
          className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-primary font-semibold">
          {t("addProgress.notes")}:
        </label>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary resize-vertical min-h-[40px]"
        />
      </div>

      {/* Sección para subir imágenes */}
      <div className="flex flex-col gap-2 mb-2">
        <label className="text-primary font-semibold">
          {t("addProgress.progressPhotos")} ({t("addProgress.max10")}):
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          disabled={images.length >= 10}
          className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
        <p className="text-gray-400 text-sm">
          {images.length}/10 {t("addProgress.imagesSelected")}
        </p>
      </div>

      {/* Previsualización de imágenes */}
      <div className="flex flex-wrap gap-4 mb-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-24 h-24 rounded overflow-hidden border-2 border-primary bg-dark flex items-center justify-center"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`preview-${index}`}
              className="object-cover w-full h-full"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-danger text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              type="button"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-4 mt-8">
        <button
          onClick={handleSaveProgress}
          className="flex-1 bg-primary text-black py-3 px-6 rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t("addProgress.saving")
            : t("addProgress.saveProgress")}
        </button>
        <button
          onClick={handleCloseWithConfirmation}
          className="flex-1 bg-danger text-white py-3 px-6 rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          {t("addProgress.cancel")}
        </button>
      </div>
    </div>
  );
};

export default AddProgressForm;
