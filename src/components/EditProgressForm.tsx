// src/components/EditProgressForm.tsx
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
  const { formData, error, handleChange, handleSave } = useEditProgressForm(
    clienteId,
    progress,
    onSave,
    onClose
  );

  return (
    <div style={EditProgressFormStyles.container}>
      <h3 style={EditProgressFormStyles.title}>Editar Progreso</h3>
      {error && <p style={EditProgressFormStyles.error}>{error}</p>}

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

      <div style={EditProgressFormStyles.inputContainer}>
        <label style={EditProgressFormStyles.label}>Nivel de Actividad:</label>
        <input
          type="text"
          name="nivelActividad"
          value={formData.nivelActividad}
          onChange={handleChange}
          style={EditProgressFormStyles.input}
        />
      </div>

      <div style={EditProgressFormStyles.inputContainer}>
        <label style={EditProgressFormStyles.label}>Factor de Actividad:</label>
        <input
          type="number"
          name="factorActividad"
          value={formData.factorActividad}
          min="1"
          onChange={handleChange}
          style={EditProgressFormStyles.input}
        />
      </div>

      <div style={EditProgressFormStyles.inputContainer}>
        <label style={EditProgressFormStyles.label}>Notas:</label>
        <textarea
          name="notas"
          value={formData.notas}
          onChange={handleChange}
          style={EditProgressFormStyles.textarea}
        />
      </div>

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
