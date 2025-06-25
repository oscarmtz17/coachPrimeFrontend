import React from "react";
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

  return (
    <div className="bg-zinc-800 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-yellow-400 text-2xl text-center font-semibold mb-4">
        Editar Progreso
      </h3>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Campos de datos */}
      {[
        { label: "Peso (kg):", name: "pesoKg", value: formData.pesoKg },
        {
          label: "Estatura (cm):",
          name: "estaturaCm",
          value: formData.estaturaCm,
        },
        {
          label: "Cintura (cm):",
          name: "cinturaCm",
          value: formData.cinturaCm,
        },
        { label: "Cadera (cm):", name: "caderaCm", value: formData.caderaCm },
        { label: "Pecho (cm):", name: "pechoCm", value: formData.pechoCm },
        { label: "Brazo (cm):", name: "brazoCm", value: formData.brazoCm },
        { label: "Pierna (cm):", name: "piernaCm", value: formData.piernaCm },
      ].map(({ label, name, value }, index) => (
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
        <label className="text-yellow-400 font-bold">Nivel de Actividad:</label>
        <select
          name="nivelActividad"
          value={formData.nivelActividad}
          onChange={(e) => {
            const nivel = e.target.value;
            let factor = formData.factorActividad;
            switch (nivel) {
              case "Muy ligera":
                factor = 1.2;
                break;
              case "Ligera":
                factor = 1.375;
                break;
              case "Moderada":
                factor = 1.55;
                break;
              case "Activa":
                factor = 1.725;
                break;
              case "Muy activa":
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
          <option value="">Selecciona nivel</option>
          <option value="Muy ligera">
            Muy ligera (1.2) - Sentado, tumbado. Poco o nada ejercicio
          </option>
          <option value="Ligera">
            Ligera (1.375) - De pie, conducir, planchar, caminar. Deporte 1-3
            veces/semana
          </option>
          <option value="Moderada">
            Moderada (1.55) - Limpiar, caminar rápido, cargar peso. Deporte 3-5
            veces/semana
          </option>
          <option value="Activa">
            Activa (1.725) - Construcción, subir escaleras. Deporte 6-7
            veces/semana
          </option>
          <option value="Muy activa">
            Muy activa (1.9) - Trabajos de fuerza, correr. Deporte 2 horas/día
          </option>
        </select>
      </div>

      {/* Campo de Factor de Actividad */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-yellow-400 font-bold">
          Factor de Actividad:
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
        <label className="text-yellow-400 font-bold">Notas:</label>
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
          Imágenes Existentes
        </h4>
        <div className="flex flex-wrap gap-4">
          {existingImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
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
        <label className="text-yellow-400 font-bold">Añadir Imágenes:</label>
        <p className="text-sm text-gray-300">
          {existingImages.length + newImages.length}/10 imágenes seleccionadas
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
                  alt={`Nueva Imagen ${index + 1}`}
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
          Guardar Cambios
        </button>
        <button
          onClick={handleCloseWithConfirmation}
          className="bg-gray-300 text-zinc-800 py-2 px-4 rounded font-semibold flex-1 hover:bg-gray-400 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditProgressForm;
