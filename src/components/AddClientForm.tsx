// src/components/AddClientForm.tsx
import React from "react";
import { useAddClientForm } from "../hooks/useAddClientForm";

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
    handleTelefonoChange,
    handleCapitalize,
  } = useAddClientForm(onClose, onSave);

  return (
    <div className="w-full max-w-md mx-auto bg-black bg-opacity-90 p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-primary mb-6 text-center">
        Agregar Cliente
      </h3>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-primary font-semibold">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => handleCapitalize(e.target.value, setNombre)}
            required
            className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-primary font-semibold">Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => handleCapitalize(e.target.value, setApellido)}
            required
            className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-primary font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-primary font-semibold">Teléfono</label>
          <input
            type="text"
            value={telefono}
            onChange={handleTelefonoChange}
            required
            maxLength={10}
            placeholder="Ejemplo: 5558887766"
            className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {telefono.length > 0 && telefono.length < 10 && (
            <span className="text-red-500 text-xs">
              Debe tener exactamente 10 dígitos
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-primary font-semibold">Sexo</label>
          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div className="flex justify-between gap-4 mt-6">
          <button
            type="submit"
            className="flex-1 bg-primary text-black py-3 px-6 rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-danger text-white py-3 px-6 rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-dark"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClientForm;
