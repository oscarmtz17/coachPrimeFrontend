// src/components/EditProgressForm.tsx
import React, { useState } from "react";
import axios from "axios";

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
  const [formData, setFormData] = useState<Progress>(progress);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "pesoKg" || name === "estaturaCm" || name === "factorActividad"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5267/api/progreso/${clienteId}/${formData.progresoId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSave();
      onClose();
    } catch (err) {
      console.error("Error al actualizar el progreso:", err);
      setError("No se pudo actualizar el progreso.");
    }
  };

  return (
    <div>
      <h3>Editar Progreso</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Peso (kg):</label>
        <input
          type="number"
          name="pesoKg"
          value={formData.pesoKg}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Estatura (cm):</label>
        <input
          type="number"
          name="estaturaCm"
          value={formData.estaturaCm}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Nivel de Actividad:</label>
        <input
          type="text"
          name="nivelActividad"
          value={formData.nivelActividad}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Factor de Actividad:</label>
        <input
          type="number"
          name="factorActividad"
          value={formData.factorActividad}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Cintura (cm):</label>
        <input
          type="number"
          name="cinturaCm"
          value={formData.cinturaCm}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Cadera (cm):</label>
        <input
          type="number"
          name="caderaCm"
          value={formData.caderaCm}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Pecho (cm):</label>
        <input
          type="number"
          name="pechoCm"
          value={formData.pechoCm}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Brazo (cm):</label>
        <input
          type="number"
          name="brazoCm"
          value={formData.brazoCm}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Pierna (cm):</label>
        <input
          type="number"
          name="piernaCm"
          value={formData.piernaCm}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Notas:</label>
        <textarea name="notas" value={formData.notas} onChange={handleChange} />
      </div>
      <button onClick={handleSave}>Guardar Cambios</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default EditProgressForm;
