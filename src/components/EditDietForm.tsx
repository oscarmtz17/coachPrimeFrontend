// src/components/EditDietForm.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Alimento {
  nombre: string;
  cantidad: number;
  unidad: string;
}

interface Comida {
  nombre: string;
  orden: number;
  hora: string;
  alimentos: Alimento[];
}

interface EditDietFormProps {
  clienteId: number;
  dietaId: number;
  onDietUpdated: () => void;
  onClose: () => void;
}

const EditDietForm: React.FC<EditDietFormProps> = ({
  clienteId,
  dietaId,
  onDietUpdated,
  onClose,
}) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [notas, setNotas] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDietDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5267/api/dieta/${clienteId}/${dietaId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const adaptedDiet = {
          ...response.data,
          comidas: response.data.comidas.$values.map((comida: any) => ({
            ...comida,
            alimentos: comida.alimentos.$values,
          })),
        };

        setNombre(adaptedDiet.nombre);
        setDescripcion(adaptedDiet.descripcion);
        setComidas(adaptedDiet.comidas);
        setNotas(adaptedDiet.notas);
      } catch (error) {
        setError("Error al cargar los detalles de la dieta.");
        console.error(error);
      }
    };

    fetchDietDetails();
  }, [clienteId, dietaId]);

  const handleUpdateDiet = async () => {
    try {
      const token = localStorage.getItem("token");
      const diet = {
        nombre,
        descripcion,
        clienteId,
        comidas: comidas.map((comida) => ({
          nombre: comida.nombre,
          orden: comida.orden,
          hora: comida.hora,
          alimentos: comida.alimentos,
        })),
        notas,
      };

      const response = await axios.put(
        `http://localhost:5267/api/dieta/${clienteId}/${dietaId}`,
        diet,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Dieta actualizada exitosamente.");
      onDietUpdated();
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data || "Error al actualizar la dieta");
      console.error(err);
    }
  };

  const handleComidaChange = (
    index: number,
    field: keyof Comida,
    value: any
  ) => {
    const updatedComidas = [...comidas];
    updatedComidas[index] = { ...updatedComidas[index], [field]: value };
    setComidas(updatedComidas);
  };

  const handleAlimentoChange = (
    comidaIndex: number,
    alimentoIndex: number,
    field: keyof Alimento,
    value: any
  ) => {
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos[alimentoIndex] = {
      ...updatedComidas[comidaIndex].alimentos[alimentoIndex],
      [field]: value,
    };
    setComidas(updatedComidas);
  };

  const handleAddComida = () => {
    setComidas([
      ...comidas,
      { nombre: "", orden: comidas.length + 1, hora: "", alimentos: [] },
    ]);
  };

  const handleAddAlimento = (comidaIndex: number) => {
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos.push({
      nombre: "",
      cantidad: 0,
      unidad: "",
    });
    setComidas(updatedComidas);
  };

  const handleDeleteComida = (index: number) => {
    const updatedComidas = comidas.filter((_, i) => i !== index);
    setComidas(updatedComidas);
  };

  const handleDeleteAlimento = (comidaIndex: number, alimentoIndex: number) => {
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos = updatedComidas[
      comidaIndex
    ].alimentos.filter((_, i) => i !== alimentoIndex);
    setComidas(updatedComidas);
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Editar Dieta</h3>
      {error && <p style={errorStyle}>{error}</p>}
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Nombre de la Dieta:</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={textareaStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Notas:</label>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          style={textareaStyle}
        />
      </div>
      {comidas.map((comida, comidaIndex) => (
        <div key={comidaIndex} style={mealContainerStyle}>
          <h4 style={mealTitleStyle}>Comida {comida.orden}</h4>
          <input
            placeholder="Nombre de la comida"
            value={comida.nombre}
            onChange={(e) =>
              handleComidaChange(comidaIndex, "nombre", e.target.value)
            }
            style={inputStyle}
          />
          <input
            placeholder="Hora"
            value={comida.hora}
            onChange={(e) =>
              handleComidaChange(comidaIndex, "hora", e.target.value)
            }
            style={inputStyle}
          />
          <button
            onClick={() => handleDeleteComida(comidaIndex)}
            style={deleteButtonStyle}
          >
            Eliminar Comida
          </button>
          {comida.alimentos.map((alimento, alimentoIndex) => (
            <div key={alimentoIndex} style={foodContainerStyle}>
              <input
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
                style={inputStyle}
              />
              <input
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
                style={inputStyle}
              />
              <input
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
                style={inputStyle}
              />
              <button
                onClick={() => handleDeleteAlimento(comidaIndex, alimentoIndex)}
                style={deleteButtonStyle}
              >
                Eliminar Alimento
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddAlimento(comidaIndex)}
            style={addButtonStyle}
          >
            Agregar Alimento
          </button>
        </div>
      ))}
      <button onClick={handleAddComida} style={addButtonStyle}>
        Agregar Comida
      </button>
      <div style={buttonContainerStyle}>
        <button onClick={handleUpdateDiet} style={saveButtonStyle}>
          Guardar Cambios
        </button>
        <button onClick={onClose} style={cancelButtonStyle}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

// Estilos
const containerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  maxWidth: "700px",
  margin: "0 auto",
};

const titleStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontSize: "1.8rem",
  textAlign: "center",
  marginBottom: "1rem",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  textAlign: "center",
  marginBottom: "1rem",
};

const inputContainerStyle: React.CSSProperties = {
  marginBottom: "1rem",
};

const labelStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontWeight: "bold",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#555",
  color: "#fff",
  marginTop: "0.3rem",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#555",
  color: "#fff",
  resize: "vertical",
};

const mealContainerStyle: React.CSSProperties = {
  backgroundColor: "#444",
  padding: "1rem",
  borderRadius: "8px",
  marginBottom: "1rem",
};

const mealTitleStyle: React.CSSProperties = {
  color: "#ffcc00",
  fontSize: "1.2rem",
};

const foodContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginBottom: "0.5rem",
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: "#dc3545",
  color: "#fff",
  padding: "0.3rem",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.9rem",
  marginTop: "0.3rem",
};

const addButtonStyle: React.CSSProperties = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "0.5rem",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "1rem",
};

const buttonContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
};

const saveButtonStyle: React.CSSProperties = {
  backgroundColor: "#ffcc00",
  color: "#000",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  cursor: "pointer",
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: "#bbb",
  color: "#333",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  cursor: "pointer",
};

export default EditDietForm;
