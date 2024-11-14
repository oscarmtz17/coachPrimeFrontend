// src/components/EditClientForm.tsx
import React from "react";
import { useEditClientForm } from "../hooks/useEditClientForm";
import EditClientFormStyles from "../styles/EditClientFormStyles";

interface EditClientFormProps {
  client: {
    clienteId: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    sexo: string;
    usuarioId: number;
  };
  onClose: () => void;
  onSave: () => void;
}

const EditClientForm: React.FC<EditClientFormProps> = ({
  client,
  onClose,
  onSave,
}) => {
  const {
    nombre,
    apellido,
    email,
    telefono,
    sexo,
    setNombre,
    setApellido,
    setEmail,
    setTelefono,
    setSexo,
    error,
    handleSubmit,
  } = useEditClientForm(client, onSave);

  return (
    <div style={EditClientFormStyles.formContainer}>
      <h3 style={EditClientFormStyles.title}>Editar Cliente</h3>
      {error && <p style={EditClientFormStyles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={EditClientFormStyles.form}>
        <div style={EditClientFormStyles.inputContainer}>
          <label htmlFor="nombre" style={EditClientFormStyles.label}>
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={EditClientFormStyles.input}
          />
        </div>
        <div style={EditClientFormStyles.inputContainer}>
          <label htmlFor="apellido" style={EditClientFormStyles.label}>
            Apellido
          </label>
          <input
            id="apellido"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            style={EditClientFormStyles.input}
          />
        </div>
        <div style={EditClientFormStyles.inputContainer}>
          <label htmlFor="email" style={EditClientFormStyles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={EditClientFormStyles.input}
          />
        </div>
        <div style={EditClientFormStyles.inputContainer}>
          <label htmlFor="telefono" style={EditClientFormStyles.label}>
            Teléfono
          </label>
          <input
            id="telefono"
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            style={EditClientFormStyles.input}
          />
        </div>
        <div style={EditClientFormStyles.inputContainer}>
          <label htmlFor="sexo" style={EditClientFormStyles.label}>
            Sexo
          </label>
          <input
            id="sexo"
            type="text"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            required
            style={EditClientFormStyles.input}
          />
        </div>
        <div style={EditClientFormStyles.buttonContainer}>
          <button type="submit" style={EditClientFormStyles.saveButton}>
            Guardar
          </button>
          <button
            type="button"
            onClick={onClose}
            style={EditClientFormStyles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClientForm;
