import React from "react";
import { useAddDietForm } from "../hooks/useAddDietForm";
import AddDietFormStyles from "../styles/AddDietFormStyles";
import NumberInput from "../theme/NumberInput";

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
  const {
    nombre,
    descripcion,
    notas,
    comidas,
    error,
    setNombre,
    setDescripcion,
    setNotas,
    handleAddDiet,
    handleAddComida,
    handleRemoveComida,
    handleComidaChange,
    handleAddAlimento,
    handleRemoveAlimento,
    handleAlimentoChange,
    handleCantidadChange,
    handleCloseWithConfirmation,
  } = useAddDietForm(clienteId, onDietAdded, onClose);

  return (
    <div style={AddDietFormStyles.formContainer}>
      <h3 style={AddDietFormStyles.title}>Agregar Nueva Dieta</h3>
      {error && <p style={AddDietFormStyles.error}>{error}</p>}

      <div style={AddDietFormStyles.inputContainer}>
        <label style={AddDietFormStyles.label}>Nombre de la Dieta:</label>
        <input
          style={AddDietFormStyles.input}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          maxLength={70}
        />
      </div>
      <div style={AddDietFormStyles.inputContainer}>
        <label style={AddDietFormStyles.label}>Descripción:</label>
        <textarea
          style={AddDietFormStyles.textarea}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div style={AddDietFormStyles.inputContainer}>
        <label style={AddDietFormStyles.label}>Notas:</label>
        <textarea
          style={AddDietFormStyles.textarea}
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />
      </div>

      <button onClick={handleAddComida} style={AddDietFormStyles.addButton}>
        Agregar Comida
      </button>

      {comidas.map((comida, comidaIndex) => (
        <div key={comidaIndex} style={AddDietFormStyles.dayContainer}>
          <h4 style={AddDietFormStyles.subtitle}>Comida {comidaIndex + 1}</h4>

          <div style={AddDietFormStyles.buttonWrapper}>
            <button
              onClick={() => handleAddAlimento(comidaIndex)}
              style={AddDietFormStyles.addButton}
            >
              Agregar Alimento
            </button>
          </div>

          <input
            style={AddDietFormStyles.input}
            placeholder="Nombre de la comida"
            value={comida.nombre}
            onChange={(e) =>
              handleComidaChange(comidaIndex, "nombre", e.target.value)
            }
          />
          <input
            style={AddDietFormStyles.inputTime}
            type="time"
            placeholder="Hora"
            value={comida.hora}
            onChange={(e) =>
              handleComidaChange(comidaIndex, "hora", e.target.value)
            }
          />
          <button
            onClick={() => handleRemoveComida(comidaIndex)}
            style={AddDietFormStyles.removeButton}
          >
            Quitar Comida
          </button>

          {comida.alimentos.map((alimento, alimentoIndex) => (
            <div
              key={alimentoIndex}
              style={AddDietFormStyles.alimentoContainer}
            >
              <input
                style={AddDietFormStyles.input}
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
              <NumberInput
                value={alimento.cantidad}
                onChange={(newValue) =>
                  handleCantidadChange(newValue, comidaIndex, alimentoIndex)
                }
                placeholder="Cantidad"
                style={AddDietFormStyles.input}
              />
              <input
                style={AddDietFormStyles.input}
                placeholder="Unidad (Kg, gr, tazas, etc.)"
                maxLength={10}
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
                style={AddDietFormStyles.removeButton}
              >
                Quitar Alimento
              </button>
            </div>
          ))}
        </div>
      ))}

      <div style={AddDietFormStyles.buttonContainer}>
        <button onClick={handleAddDiet} style={AddDietFormStyles.saveButton}>
          Guardar Dieta
        </button>
        <button
          onClick={handleCloseWithConfirmation}
          style={AddDietFormStyles.cancelButton}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AddDietForm;
