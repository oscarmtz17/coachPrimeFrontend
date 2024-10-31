// src/components/EditDietForm.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
      navigate("/dashboard"); // Redirige al dashboard tras actualizar exitosamente
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
    <div>
      <h3>Editar Dieta</h3>
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
      {comidas.map((comida, comidaIndex) => (
        <div key={comidaIndex}>
          <h4>Comida {comida.orden}</h4>
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
          <button onClick={() => handleDeleteComida(comidaIndex)}>
            Eliminar Comida
          </button>

          {comida.alimentos.map((alimento, alimentoIndex) => (
            <div key={alimentoIndex}>
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
                onClick={() => handleDeleteAlimento(comidaIndex, alimentoIndex)}
              >
                Eliminar Alimento
              </button>
            </div>
          ))}
          <button onClick={() => handleAddAlimento(comidaIndex)}>
            Agregar Alimento
          </button>
        </div>
      ))}
      <button onClick={handleAddComida}>Agregar Comida</button>
      <button onClick={handleUpdateDiet}>Guardar Cambios</button>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default EditDietForm;
