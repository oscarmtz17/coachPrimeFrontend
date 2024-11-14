// src/components/AddClientForm.tsx
import React from "react";
import { useAddClientForm } from "../hooks/useAddClientForm";
import AddClientFormStyles from "../styles/AddClientFormStyles";

interface AddClientFormProps {
  onClose: () => void;
  onSave: () => void;
}

const AddClientForm: React.FC<AddClientFormProps> = ({ onClose, onSave }) => {
  const {
    nombre,
    apellido,
    email,
    telefono,
    sexo,
    error,
    setNombre,
    setApellido,
    setEmail,
    setTelefono,
    setSexo,
    handleSubmit,
  } = useAddClientForm(onClose, onSave);

  return (
    <div style={AddClientFormStyles.container}>
      <h3 style={AddClientFormStyles.title}>Agregar Cliente</h3>
      {error && <p style={AddClientFormStyles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={AddClientFormStyles.form}>
        <div style={AddClientFormStyles.inputContainer}>
          <label style={AddClientFormStyles.label}>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={AddClientFormStyles.input}
          />
        </div>
        <div style={AddClientFormStyles.inputContainer}>
          <label style={AddClientFormStyles.label}>Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            style={AddClientFormStyles.input}
          />
        </div>
        <div style={AddClientFormStyles.inputContainer}>
          <label style={AddClientFormStyles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={AddClientFormStyles.input}
          />
        </div>
        <div style={AddClientFormStyles.inputContainer}>
          <label style={AddClientFormStyles.label}>Teléfono</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            style={AddClientFormStyles.input}
          />
        </div>
        <div style={AddClientFormStyles.inputContainer}>
          <label style={AddClientFormStyles.label}>Sexo</label>
          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            style={AddClientFormStyles.select}
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div style={AddClientFormStyles.buttonContainer}>
          <button type="submit" style={AddClientFormStyles.saveButton}>
            Guardar
          </button>
          <button
            type="button"
            onClick={onClose}
            style={AddClientFormStyles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClientForm;
