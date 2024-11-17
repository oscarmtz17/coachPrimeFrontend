import React from "react";
import useEditProgressForm from "../hooks/useEditProgressForm";
import EditProgressFormStyles from "../styles/EditProgressFormStyles";

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
  } = useEditProgressForm(clienteId, progress, onSave, onClose);

  return (
    <div style={EditProgressFormStyles.container}>
      <h3 style={EditProgressFormStyles.title}>Editar Progreso</h3>
      {error && <p style={EditProgressFormStyles.error}>{error}</p>}

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
        <div style={EditProgressFormStyles.inputContainer} key={index}>
          <label style={EditProgressFormStyles.label}>{label}</label>
          <input
            type="number"
            name={name}
            value={value}
            min="1"
            onChange={handleChange}
            style={EditProgressFormStyles.input}
          />
        </div>
      ))}

      {/* Sección de imágenes existentes */}
      <div style={EditProgressFormStyles.imageSection}>
        <h4>Imágenes Existentes</h4>
        <div style={EditProgressFormStyles.imageContainer}>
          {existingImages.map((image, index) => (
            <div key={index} style={EditProgressFormStyles.imageWrapper}>
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
                style={EditProgressFormStyles.image}
              />
              <button
                style={EditProgressFormStyles.removeButton}
                onClick={() => handleRemoveImage(index, true)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Añadir nuevas imágenes */}
      <div style={EditProgressFormStyles.inputContainer}>
        <label style={EditProgressFormStyles.label}>Añadir Imágenes:</label>
        <p>
          {existingImages.length + newImages.length}/10 imágenes seleccionadas
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleAddImages}
          disabled={existingImages.length + newImages.length >= 10}
          style={EditProgressFormStyles.input}
        />
        {newImages.length > 0 && (
          <div style={EditProgressFormStyles.imageContainer}>
            {newImages.map((image, index) => (
              <div key={index} style={EditProgressFormStyles.imageWrapper}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Nueva Imagen ${index + 1}`}
                  style={EditProgressFormStyles.image}
                />
                <button
                  style={EditProgressFormStyles.removeButton}
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
      <div style={EditProgressFormStyles.buttonContainer}>
        <button onClick={handleSave} style={EditProgressFormStyles.saveButton}>
          Guardar Cambios
        </button>
        <button onClick={onClose} style={EditProgressFormStyles.cancelButton}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditProgressForm;
