import React, { useState } from "react";
import axios from "axios";

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
  const [pesoKg, setPesoKg] = useState<number>(1);
  const [estaturaCm, setEstaturaCm] = useState<number>(1);
  const [nivelActividad, setNivelActividad] = useState<string>("");
  const [factorActividad, setFactorActividad] = useState<number>(1.2);
  const [cinturaCm, setCinturaCm] = useState<number>(1);
  const [caderaCm, setCaderaCm] = useState<number>(1);
  const [pechoCm, setPechoCm] = useState<number>(1);
  const [brazoCm, setBrazoCm] = useState<number>(1);
  const [piernaCm, setPiernaCm] = useState<number>(1);
  const [notas, setNotas] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSaveProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const progresoData = {
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
      };

      await axios.post(
        `http://localhost:5267/api/progreso/${clienteId}`,
        progresoData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onProgressAdded();
      onClose();
    } catch (error) {
      console.error("Error al guardar el progreso:", error);
      setError("Hubo un error al guardar el progreso.");
    }
  };

  const handlePositiveInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(1, Number(event.target.value));
      setter(value);
    };

  return (
    <div style={formContainerStyle}>
      <h3 style={titleStyle}>Registrar Progreso</h3>
      {error && <p style={errorStyle}>{error}</p>}

      <label style={labelStyle}>Peso (kg):</label>
      <input
        type="number"
        value={pesoKg}
        onChange={handlePositiveInputChange(setPesoKg)}
        style={inputStyle}
      />

      <label style={labelStyle}>Estatura (cm):</label>
      <input
        type="number"
        value={estaturaCm}
        onChange={handlePositiveInputChange(setEstaturaCm)}
        style={inputStyle}
      />

      <label style={labelStyle}>Nivel de Actividad:</label>
      <select
        value={nivelActividad}
        onChange={(e) => setNivelActividad(e.target.value)}
        style={selectStyle}
      >
        <option value="">Selecciona nivel</option>
        <option value="Sedentario">Sedentario</option>
        <option value="Ligero">Ligero</option>
        <option value="Activo con moderación">Activo con moderación</option>
        <option value="Muy activo">Muy activo</option>
      </select>

      <label style={labelStyle}>Factor de Actividad:</label>
      <input
        type="number"
        value={factorActividad}
        onChange={(e) =>
          setFactorActividad(Math.max(1.2, Number(e.target.value)))
        }
        style={inputStyle}
      />

      <label style={labelStyle}>Cintura (cm):</label>
      <input
        type="number"
        value={cinturaCm}
        onChange={handlePositiveInputChange(setCinturaCm)}
        style={inputStyle}
      />

      <label style={labelStyle}>Cadera (cm):</label>
      <input
        type="number"
        value={caderaCm}
        onChange={handlePositiveInputChange(setCaderaCm)}
        style={inputStyle}
      />

      <label style={labelStyle}>Pecho (cm):</label>
      <input
        type="number"
        value={pechoCm}
        onChange={handlePositiveInputChange(setPechoCm)}
        style={inputStyle}
      />

      <label style={labelStyle}>Brazo (cm):</label>
      <input
        type="number"
        value={brazoCm}
        onChange={handlePositiveInputChange(setBrazoCm)}
        style={inputStyle}
      />

      <label style={labelStyle}>Pierna (cm):</label>
      <input
        type="number"
        value={piernaCm}
        onChange={handlePositiveInputChange(setPiernaCm)}
        style={inputStyle}
      />

      <label style={labelStyle}>Notas:</label>
      <textarea
        value={notas}
        onChange={(e) => setNotas(e.target.value)}
        style={textareaStyle}
      />

      <div style={buttonContainerStyle}>
        <button onClick={handleSaveProgress} style={saveButtonStyle}>
          Guardar Progreso
        </button>
        <button onClick={onClose} style={cancelButtonStyle}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

// Estilos
const formContainerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  maxWidth: "500px",
  margin: "0 auto",
};

const titleStyle: React.CSSProperties = {
  color: "#ffcc00",
  textAlign: "center",
  fontSize: "1.8rem",
  marginBottom: "1rem",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  textAlign: "center",
  marginBottom: "1rem",
};

const labelStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontWeight: "bold",
  display: "block",
  marginTop: "0.8rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#555",
  color: "#fff",
  marginBottom: "0.8rem",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#555",
  color: "#fff",
  marginBottom: "0.8rem",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#555",
  color: "#fff",
  resize: "vertical",
  marginBottom: "0.8rem",
};

const buttonContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  marginTop: "1rem",
};

const saveButtonStyle: React.CSSProperties = {
  backgroundColor: "#ffcc00",
  color: "#000",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  flex: 1,
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: "#bbb",
  color: "#333",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  flex: 1,
};

export default AddProgressForm;
