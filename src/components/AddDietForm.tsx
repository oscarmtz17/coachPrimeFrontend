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

  const handleComidaChange = (
    index: number,
    field: keyof Comida,
    value: string | number
  ) => {
    const updatedComidas = [...comidas];
    updatedComidas[index] = {
      ...updatedComidas[index],
      [field]: value,
    };
    setComidas(updatedComidas);
  };

  const handleAddAlimento = (comidaIndex: number) => {
    const newAlimento: Alimento = {
      nombre: "",
      cantidad: 0,
      unidad: "",
    };
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos.push(newAlimento);
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
      [field]: value as never,
    };
    setComidas(updatedComidas);
  };

  const handleRemoveComida = (index: number) => {
    const updatedComidas = [...comidas];
    updatedComidas.splice(index, 1);
    setComidas(updatedComidas);
  };

  const handleRemoveAlimento = (comidaIndex: number, alimentoIndex: number) => {
    const updatedComidas = [...comidas];
    updatedComidas[comidaIndex].alimentos.splice(alimentoIndex, 1);
    setComidas(updatedComidas);
  };

  return (
    <div>
      <h3>Agregar Nueva Dieta</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Nombre de la Dieta:</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div>
        <label>Notas:</label>
        <textarea value={notas} onChange={(e) => setNotas(e.target.value)} />
      </div>
      <div>
        <button onClick={handleAddComida}>Agregar Comida</button>
      </div>
      {comidas.map((comida, comidaIndex) => (
        <div
          key={comidaIndex}
          style={{
            border: "1px solid #ddd",
            padding: "1rem",
            margin: "1rem 0",
          }}
        >
          <h4>Comida {comidaIndex + 1}</h4>
          <input
            placeholder="Nombre de la comida"
            value={comida.nombre}
            onChange={(e) =>
              handleComidaChange(comidaIndex, "nombre", e.target.value)
            }
          />
          <input
            placeholder="Hora"
            value={comida.hora}
            onChange={(e) =>
              handleComidaChange(comidaIndex, "hora", e.target.value)
            }
          />
          <button onClick={() => handleRemoveComida(comidaIndex)}>
            Eliminar Comida
          </button>
          <div>
            <button onClick={() => handleAddAlimento(comidaIndex)}>
              Agregar Alimento
            </button>
          </div>
          {comida.alimentos.map((alimento, alimentoIndex) => (
            <div key={alimentoIndex} style={{ marginLeft: "1rem" }}>
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
              />
              <button
                onClick={() => handleRemoveAlimento(comidaIndex, alimentoIndex)}
              >
                Eliminar Alimento
              </button>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleAddDiet}>Guardar Dieta</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default AddDietForm;
