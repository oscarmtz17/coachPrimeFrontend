import React from "react";
import { useEditClientForm } from "../hooks/useEditClientForm";

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
  } = useEditClientForm(client, onSave, onClose);

  return (
    <div className="bg-zinc-800 text-white p-6 rounded-lg w-full max-w-md mx-auto shadow-lg">
      <h3 className="text-yellow-400 text-center text-2xl font-semibold mb-4">
        Editar Cliente
      </h3>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="nombre" className="text-yellow-400 font-bold">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => handleCapitalize(e.target.value, setNombre)}
            required
            className="p-2 rounded border border-gray-300 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="apellido" className="text-yellow-400 font-bold">
            Apellido
          </label>
          <input
            id="apellido"
            type="text"
            value={apellido}
            onChange={(e) => handleCapitalize(e.target.value, setApellido)}
            required
            className="p-2 rounded border border-gray-300 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-yellow-400 font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 rounded border border-gray-300 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="telefono" className="text-yellow-400 font-bold">
            Teléfono
          </label>
          <input
            id="telefono"
            type="text"
            value={telefono}
            onChange={(e) => handleTelefonoChange(e.target.value)}
            required
            className="p-2 rounded border border-gray-300 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            maxLength={10}
            placeholder="Ejemplo: 1234567890"
          />
          {telefono.length > 0 && telefono.length < 10 && (
            <span className="text-red-500 text-sm">
              Debe tener exactamente 10 dígitos
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="sexo" className="text-yellow-400 font-bold">
            Sexo
          </label>
          <select
            id="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            required
            className="p-2 rounded border border-gray-300 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div className="flex justify-between gap-4 mt-4">
          <button
            type="submit"
            className="bg-yellow-400 text-black py-2 px-4 rounded font-semibold flex-1 hover:bg-yellow-300 transition-colors"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-zinc-800 py-2 px-4 rounded font-semibold flex-1 hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClientForm;
