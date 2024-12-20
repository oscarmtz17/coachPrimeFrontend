// src/components/AddProgressForm.tsx
import React from "react";
import useAddProgressForm from "../hooks/useAddProgressForm";
import AddProgressFormStyles from "../styles/AddProgressFormStyles";

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

  return (
    <div style={AddProgressFormStyles.formContainer}>
      <h3 style={AddProgressFormStyles.title}>Registrar Progreso</h3>
      {error && <p style={AddProgressFormStyles.error}>{error}</p>}

      {/* Campos de progreso */}
      {[
        { label: "Peso (kg):", value: pesoKg, setter: setPesoKg },
        { label: "Estatura (cm):", value: estaturaCm, setter: setEstaturaCm },
        { label: "Cintura (cm):", value: cinturaCm, setter: setCinturaCm },
        { label: "Cadera (cm):", value: caderaCm, setter: setCaderaCm },
        { label: "Pecho (cm):", value: pechoCm, setter: setPechoCm },
        { label: "Brazo (cm):", value: brazoCm, setter: setBrazoCm },
        { label: "Pierna (cm):", value: piernaCm, setter: setPiernaCm },
      ].map(({ label, value, setter }, index) => (
        <div key={index}>
          <label style={AddProgressFormStyles.label}>{label}</label>
          <input
            type="number"
            value={value}
            onChange={handlePositiveInputChange(setter)}
            style={AddProgressFormStyles.input}
          />
        </div>
      ))}

      <label style={AddProgressFormStyles.label}>Nivel de Actividad:</label>
      <select
        value={nivelActividad}
        onChange={(e) => setNivelActividad(e.target.value)}
        style={AddProgressFormStyles.select}
      >
        <option value="">Selecciona nivel</option>
        <option value="Sedentario">Sedentario</option>
        <option value="Ligero">Ligero</option>
        <option value="Activo con moderación">Activo con moderación</option>
        <option value="Muy activo">Muy activo</option>
      </select>

      <label style={AddProgressFormStyles.label}>Factor de Actividad:</label>
      <input
        type="number"
        value={factorActividad}
        onChange={(e) =>
          setFactorActividad(Math.max(1.2, Number(e.target.value)))
        }
        style={AddProgressFormStyles.input}
      />

      <label style={AddProgressFormStyles.label}>Notas:</label>
      <textarea
        value={notas}
        onChange={(e) => setNotas(e.target.value)}
        style={AddProgressFormStyles.textarea}
      />

      {/* Sección para subir imágenes */}
      <label style={AddProgressFormStyles.label}>
        Fotos de Progreso (Máximo 10):
      </label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        disabled={images.length >= 10}
        style={AddProgressFormStyles.fileInput}
      />
      <p style={AddProgressFormStyles.imageLimitText}>
        {images.length}/10 imágenes seleccionadas
      </p>

      {/* Previsualización de imágenes */}
      <div style={AddProgressFormStyles.imagePreviewContainer}>
        {images.map((image, index) => (
          <div key={index} style={AddProgressFormStyles.imagePreview}>
            <img
              src={URL.createObjectURL(image)}
              alt={`preview-${index}`}
              style={AddProgressFormStyles.previewImage}
            />
            <button
              onClick={() => handleRemoveImage(index)}
              style={AddProgressFormStyles.removeImageButton}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div style={AddProgressFormStyles.buttonContainer}>
        <button
          onClick={handleSaveProgress}
          style={AddProgressFormStyles.saveButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Guardar Progreso"}
        </button>
        <button
          onClick={handleCloseWithConfirmation}
          style={AddProgressFormStyles.cancelButton}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AddProgressForm;
