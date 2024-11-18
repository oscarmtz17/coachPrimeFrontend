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
    handleCapitalize,
    handleTelefonoChange,
  } = useEditClientForm(client, onSave, onClose); // Pasamos onClose aquí

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
            onChange={(e) => handleCapitalize(e.target.value, setNombre)}
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
            onChange={(e) => handleCapitalize(e.target.value, setApellido)}
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
            onChange={(e) => handleTelefonoChange(e.target.value)}
            required
            style={EditClientFormStyles.input}
            maxLength={10}
            placeholder="Ejemplo: 1234567890"
          />
          {telefono.length > 0 && telefono.length < 10 && (
            <span style={{ color: "red" }}>
              Debe tener exactamente 10 dígitos
            </span>
          )}
        </div>
        <div style={EditClientFormStyles.inputContainer}>
          <label htmlFor="sexo" style={EditClientFormStyles.label}>
            Sexo
          </label>
          <select
            id="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)} // Aseguramos que actualice correctamente
            required
            style={EditClientFormStyles.input}
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
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
