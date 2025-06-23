// src/components/AddProgressForm.tsx
import React from "react";
import useAddProgressForm from "../hooks/useAddProgressForm";

interface AddProgressFormProps {
  clienteId: number;
  onProgressAdded: () => void;
  onClose: () => void;
}

const PROGRESS_FIELDS = [
  { label: "Peso (kg):", valueKey: "pesoKg", setterKey: "setPesoKg" },
  {
    label: "Estatura (cm):",
    valueKey: "estaturaCm",
    setterKey: "setEstaturaCm",
  },
  { label: "Cintura (cm):", valueKey: "cinturaCm", setterKey: "setCinturaCm" },
  { label: "Cadera (cm):", valueKey: "caderaCm", setterKey: "setCaderaCm" },
  { label: "Pecho (cm):", valueKey: "pechoCm", setterKey: "setPechoCm" },
  { label: "Brazo (cm):", valueKey: "brazoCm", setterKey: "setBrazoCm" },
  { label: "Pierna (cm):", valueKey: "piernaCm", setterKey: "setPiernaCm" },
];

const AddProgressForm: React.FC<AddProgressFormProps> = ({
  clienteId,
  onProgressAdded,
  onClose,
}) => {
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

  return (
    <div className="w-full max-w-2xl mx-auto bg-black bg-opacity-90 p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-primary mb-6 text-center">
        Registrar Progreso
      </h3>
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
          Nivel de Actividad:
        </label>
        <select
          value={nivelActividad}
          onChange={(e) => setNivelActividad(e.target.value)}
          className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Selecciona nivel</option>
          <option value="Sedentario">Sedentario</option>
          <option value="Ligero">Ligero</option>
          <option value="Activo con moderación">Activo con moderación</option>
          <option value="Muy activo">Muy activo</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-primary font-semibold">
          Factor de Actividad:
        </label>
        <input
          type="number"
          value={factorActividad}
          onChange={(e) =>
            setFactorActividad(Math.max(1.2, Number(e.target.value)))
          }
          className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-primary font-semibold">Notas:</label>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary resize-vertical min-h-[40px]"
        />
      </div>

      {/* Sección para subir imágenes */}
      <div className="flex flex-col gap-2 mb-2">
        <label className="text-primary font-semibold">
          Fotos de Progreso (Máximo 10):
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
          {images.length}/10 imágenes seleccionadas
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
          {isSubmitting ? "Guardando..." : "Guardar Progreso"}
        </button>
        <button
          onClick={handleCloseWithConfirmation}
          className="flex-1 bg-danger text-white py-3 px-6 rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AddProgressForm;
