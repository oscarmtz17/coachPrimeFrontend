// src/components/AddProgressForm.tsx
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
  const [pesoKg, setPesoKg] = useState<number>(0);
  const [estaturaCm, setEstaturaCm] = useState<number>(0);
  const [nivelActividad, setNivelActividad] = useState<string>("");
  const [factorActividad, setFactorActividad] = useState<number>(1.2);
  const [cinturaCm, setCinturaCm] = useState<number>(0);
  const [caderaCm, setCaderaCm] = useState<number>(0);
  const [pechoCm, setPechoCm] = useState<number>(0);
  const [brazoCm, setBrazoCm] = useState<number>(0);
  const [piernaCm, setPiernaCm] = useState<number>(0);
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

  return (
    <div>
      <h3>Registrar Progreso</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>Peso (kg):</label>
      <input
        type="number"
        value={pesoKg}
        onChange={(e) => setPesoKg(Number(e.target.value))}
      />

      <label>Estatura (cm):</label>
      <input
        type="number"
        value={estaturaCm}
        onChange={(e) => setEstaturaCm(Number(e.target.value))}
      />

      <label>Nivel de Actividad:</label>
      <select
        value={nivelActividad}
        onChange={(e) => setNivelActividad(e.target.value)}
      >
        <option value="">Selecciona nivel</option>
        <option value="Sedentario">Sedentario</option>
        <option value="Ligero">Ligero</option>
        <option value="Activo con moderación">Activo con moderación</option>
        <option value="Muy activo">Muy activo</option>
      </select>

      <label>Factor de Actividad:</label>
      <input
        type="number"
        value={factorActividad}
        onChange={(e) => setFactorActividad(Number(e.target.value))}
      />

      <label>Cintura (cm):</label>
      <input
        type="number"
        value={cinturaCm}
        onChange={(e) => setCinturaCm(Number(e.target.value))}
      />

      <label>Cadera (cm):</label>
      <input
        type="number"
        value={caderaCm}
        onChange={(e) => setCaderaCm(Number(e.target.value))}
      />

      <label>Pecho (cm):</label>
      <input
        type="number"
        value={pechoCm}
        onChange={(e) => setPechoCm(Number(e.target.value))}
      />

      <label>Brazo (cm):</label>
      <input
        type="number"
        value={brazoCm}
        onChange={(e) => setBrazoCm(Number(e.target.value))}
      />

      <label>Pierna (cm):</label>
      <input
        type="number"
        value={piernaCm}
        onChange={(e) => setPiernaCm(Number(e.target.value))}
      />

      <label>Notas:</label>
      <textarea value={notas} onChange={(e) => setNotas(e.target.value)} />

      <button onClick={handleSaveProgress}>Guardar Progreso</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default AddProgressForm;
