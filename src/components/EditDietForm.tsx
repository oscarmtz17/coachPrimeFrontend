// src/components/EditDietForm.tsx
import React from "react";
import { useEditDietForm } from "../hooks/useEditDietForm";
import EditDietFormStyles from "../styles/EditDietFormStyles";

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
  const {
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    notas,
    setNotas,
    comidas,
    error,
    handleUpdateDiet,
    handleAddComida,
    handleRemoveComida,
    handleComidaChange,
    handleAddAlimento,
    handleRemoveAlimento,
    handleAlimentoChange,
  } = useEditDietForm(clienteId, dietaId, onDietUpdated, onClose);

  return (
    <div style={EditDietFormStyles.container}>
      <h3 style={EditDietFormStyles.title}>Editar Dieta</h3>
      {error && <p style={EditDietFormStyles.error}>{error}</p>}
      <div style={EditDietFormStyles.inputContainer}>
        <label style={EditDietFormStyles.label}>Nombre de la Dieta:</label>
        <input
          style={EditDietFormStyles.input}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div style={EditDietFormStyles.inputContainer}>
        <label style={EditDietFormStyles.label}>Descripción:</label>
        <textarea
          style={EditDietFormStyles.textarea}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div style={EditDietFormStyles.inputContainer}>
        <label style={EditDietFormStyles.label}>Notas:</label>
        <textarea
          style={EditDietFormStyles.textarea}
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />
      </div>
      {comidas.map((comida, comidaIndex) => (
        <div key={comidaIndex} style={EditDietFormStyles.mealContainer}>
          <h4 style={EditDietFormStyles.mealTitle}>Comida {comida.orden}</h4>
          <input
            style={EditDietFormStyles.input}
            placeholder="Nombre de la comida"
            value={comida.nombre}
            onChange={(e) =>
              handleComidaChange(comidaIndex, "nombre", e.target.value)
            }
          />
          <input
            style={EditDietFormStyles.input}
            placeholder="Hora"
            value={comida.hora}
            onChange={(e) =>
              handleComidaChange(comidaIndex, "hora", e.target.value)
            }
          />
          <button
            onClick={() => handleRemoveComida(comidaIndex)}
            style={EditDietFormStyles.deleteButton}
          >
            Eliminar Comida
          </button>

          {comida.alimentos.map((alimento, alimentoIndex) => (
            <div key={alimentoIndex} style={EditDietFormStyles.foodContainer}>
              <input
                style={EditDietFormStyles.input}
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
                style={EditDietFormStyles.input}
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
                style={EditDietFormStyles.input}
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
                style={EditDietFormStyles.deleteButton}
              >
                Eliminar Alimento
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddAlimento(comidaIndex)}
            style={EditDietFormStyles.addButton}
          >
            Agregar Alimento
          </button>
        </div>
      ))}
      <button onClick={handleAddComida} style={EditDietFormStyles.addButton}>
        Agregar Comida
      </button>
      s{" "}
      <div style={EditDietFormStyles.buttonContainer}>
        <button
          onClick={handleUpdateDiet}
          style={EditDietFormStyles.saveButton}
        >
          Guardar Cambios
        </button>
        <button onClick={onClose} style={EditDietFormStyles.cancelButton}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default EditDietForm;
