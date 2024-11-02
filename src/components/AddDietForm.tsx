import React, { useState } from "react";
import axios from "axios";

interface Diet {
  nombre: string;
  descripcion: string;
  clienteId: number;
  comidas: Comida[];
  notas: string;
}

interface Comida {
  nombre: string;
  orden: number;
  hora: string;
  alimentos: Alimento[];
}

interface Alimento {
  nombre: string;
  cantidad: number;
  unidad: string;
}

interface AddDietFormProps {
  clienteId: number;
  onDietAdded: () => void;
  onClose: () => void;
}

const AddDietForm: React.FC<AddDietFormProps> = ({
  clienteId,
  onDietAdded,
  onClose,
}) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [notas, setNotas] = useState("");
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddDiet = async () => {
    try {
      const token = localStorage.getItem("token");
      const diet: Diet = {
        nombre,
        descripcion,
        clienteId,
        comidas,
        notas,
      };

      await axios.post(`http://localhost:5267/api/dieta/${clienteId}`, diet, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onDietAdded();
      setNombre("");
      setDescripcion("");
      setNotas("");
      setComidas([]);
      onClose();
    } catch (err) {
      setError("Error al agregar la dieta");
      console.error(err);
    }
  };

  const handleAddComida = () => {
    const newComida: Comida = {
      nombre: "",
      orden: comidas.length + 1,
      hora: "",
      alimentos: [],
    };
    setComidas([...comidas, newComida]);
  };

  const handleRemoveComida = (index: number) => {
    const updatedComidas = [...comidas];
    updatedComidas.splice(index, 1);
    setComidas(updatedComidas);
  };

  const handleComidaChange = (
    index: number,
    field: keyof Comida,
    value: string
  ) => {
    const updatedComidas = [...comidas];
    updatedComidas[index] = { ...updatedComidas[index], [field]: value };
    setComidas(updatedComidas);
  };

  const handleAddAlimento = (comidaIndex: number) => {
    const newAlimento: Alimento = { nombre: "", cantidad: 0, unidad: "" };
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos.push(newAlimento);
    setComidas(updatedComidas);
  };

  const handleRemoveAlimento = (comidaIndex: number, alimentoIndex: number) => {
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos.splice(alimentoIndex, 1);
    setComidas(updatedComidas);
  };

  const handleAlimentoChange = (
    comidaIndex: number,
    alimentoIndex: number,
    field: keyof Alimento,
    value: string | number
  ) => {
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos[alimentoIndex] = {
      ...updatedComidas[comidaIndex].alimentos[alimentoIndex],
      [field]: value,
    };
    setComidas(updatedComidas);
  };

  return (
    <div style={formContainerStyle}>
      <h3 style={titleStyle}>Agregar Nueva Dieta</h3>
      {error && <p style={errorStyle}>{error}</p>}

      <div style={inputContainerStyle}>
        <label style={labelStyle}>Nombre de la Dieta:</label>
        <input
          style={inputStyle}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Descripción:</label>
        <textarea
          style={textareaStyle}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Notas:</label>
        <textarea
          style={textareaStyle}
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />
      </div>

      <button onClick={handleAddComida} style={addButtonStyle}>
        Agregar Comida
      </button>

      {comidas.map((comida, comidaIndex) => (
        <div key={comidaIndex} style={dayContainerStyle}>
          <h4 style={subtitleStyle}>Comida {comidaIndex + 1}</h4>

          <div style={buttonWrapperStyle}>
            <button
              onClick={() => handleAddAlimento(comidaIndex)}
              style={addButtonStyle}
            >
              Agregar Alimento
            </button>
          </div>

          <input
            style={inputStyle}
            placeholder="Nombre de la comida"
            value={comida.nombre}
            onChange={(e) =>
              handleComidaChange(comidaIndex, "nombre", e.target.value)
            }
          />
          <input
            style={inputStyle}
            placeholder="Hora"
            value={comida.hora}
            onChange={(e) =>
              handleComidaChange(comidaIndex, "hora", e.target.value)
            }
          />
          <button
            onClick={() => handleRemoveComida(comidaIndex)}
            style={removeButtonStyle}
          >
            Quitar Comida
          </button>

          {comida.alimentos.map((alimento, alimentoIndex) => (
            <div key={alimentoIndex} style={alimentoContainerStyle}>
              <input
                style={inputStyle}
                placeholder="Nombre del alimento"
                value={alimento.nombre}
                onChange={(e) =>
                  handleAlimentoChange(
                    comidaIndex,
                    alimentoIndex,
                    "nombre",
                    e.target.value
                  )
                }
              />
              <input
                style={inputStyle}
                placeholder="Cantidad"
                type="number"
                value={alimento.cantidad}
                onChange={(e) =>
                  handleAlimentoChange(
                    comidaIndex,
                    alimentoIndex,
                    "cantidad",
                    Number(e.target.value)
                  )
                }
              />
              <input
                style={inputStyle}
                placeholder="Unidad"
                value={alimento.unidad}
                onChange={(e) =>
                  handleAlimentoChange(
                    comidaIndex,
                    alimentoIndex,
                    "unidad",
                    e.target.value
                  )
                }
              />
              <button
                onClick={() => handleRemoveAlimento(comidaIndex, alimentoIndex)}
                style={removeButtonStyle}
              >
                Quitar Alimento
              </button>
            </div>
          ))}
        </div>
      ))}

      <div style={buttonContainerStyle}>
        <button onClick={handleAddDiet} style={saveButtonStyle}>
          Guardar Dieta
        </button>
        <button onClick={onClose} style={cancelButtonStyle}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

const formContainerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
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

const inputContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginBottom: "1rem",
};

const dayContainerStyle: React.CSSProperties = {
  backgroundColor: "#444",
  padding: "1rem",
  borderRadius: "8px",
  marginBottom: "1rem",
};

const buttonWrapperStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
  marginBottom: "0.5rem",
};

const alimentoContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.5rem",
  marginBottom: "0.5rem",
  alignItems: "center",
};

const subtitleStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontSize: "1.2rem",
};

const labelStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontWeight: "bold",
};

const inputStyle: React.CSSProperties = {
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#555",
  color: "#fff",
};

const textareaStyle: React.CSSProperties = {
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#555",
  color: "#fff",
  resize: "vertical",
};

const buttonContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  marginTop: "1rem",
};

const addButtonStyle: React.CSSProperties = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "0.5rem",
  borderRadius: "4px",
  cursor: "pointer",
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

const removeButtonStyle: React.CSSProperties = {
  backgroundColor: "#dc3545",
  color: "#fff",
  padding: "0.5rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default AddDietForm;
