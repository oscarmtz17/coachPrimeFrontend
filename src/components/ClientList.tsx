// src/components/ClientList.tsx
import React from "react";
import Modal from "./Modal";
import { useClientList } from "../hooks/useClientList";

const ClientList: React.FC = () => {
  const {
    filteredClients,
    error,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    modalContent,
    canAddClient,
    clientCount,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleAddRoutineClick,
    handleViewRoutinesClick,
    handleAddDietClick,
    handleViewDietsClick,
    handleAddProgressClick,
    handleViewProgressListClick,
    closeModal,
    fetchClients,
    suscripcion,
  } = useClientList();

  return (
    <div className="w-full max-w-7xl mx-auto bg-black bg-opacity-80 p-8 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        Lista de Clientes ({clientCount})
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <input
        type="text"
        placeholder="Buscar por nombre, apellido, email o teléfono..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 rounded-md border border-border-gray bg-secondary text-white mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <button
          onClick={handleAddClick}
          disabled={!canAddClient}
          className={`py-2 px-6 rounded-md text-base font-semibold transition-colors border-none ${
            canAddClient
              ? "bg-success text-white cursor-pointer hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-dark"
              : "bg-gray-500 text-white cursor-not-allowed"
          }`}
        >
          Agregar Cliente
        </button>
        <button
          onClick={fetchClients}
          className="py-2 px-6 rounded-md text-base font-semibold bg-info text-white cursor-pointer transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-dark"
        >
          Refrescar Lista
        </button>
      </div>
      {!canAddClient && suscripcion?.planId === 1 && (
        <p className="text-yellow-400 text-center mt-4">
          Has alcanzado el límite de clientes para tu plan.{" "}
          <a
            href="/profile"
            className="text-info underline hover:text-primary transition-colors"
          >
            Actualiza tu plan
          </a>{" "}
          para agregar más.
        </p>
      )}
      {!canAddClient &&
        suscripcion?.planId !== 1 &&
        clientCount >= 3 &&
        ![2, 6, 7].includes(suscripcion?.estadoSuscripcionId ?? 0) && (
          <p className="text-yellow-400 text-center mt-4">
            Tienes un plan premium, pero tu suscripción no está activa. Por
            favor, reactiva tu suscripción para poder agregar más clientes.
            <a
              href="/profile"
              className="text-info underline hover:text-primary transition-colors ml-1"
            >
              Gestionar suscripción
            </a>
          </p>
        )}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-dark text-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-primary">
              <th className="hidden">ID</th>
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">Apellido</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Teléfono</th>
              <th className="py-3 px-4">Sexo</th>
              <th className="py-3 px-4">Usuario</th>
              <th className="py-3 px-4">Progresos</th>
              <th className="py-3 px-4">Rutinas</th>
              <th className="py-3 px-4">Dietas</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr
                key={client.clienteId}
                className="border-b border-border-gray hover:bg-dark-gray transition-colors"
              >
                <td className="hidden">{client.clienteId}</td>
                <td className="py-2 px-4">{client.nombre}</td>
                <td className="py-2 px-4">{client.apellido}</td>
                <td className="py-2 px-4">{client.email}</td>
                <td className="py-2 px-4">{client.telefono}</td>
                <td className="py-2 px-4">{client.sexo}</td>
                <td className="py-2 px-4">
                  <div className="flex gap-2 flex-wrap justify-center">
                    <button
                      onClick={() => handleEditClick(client)}
                      className="bg-info text-white py-1 px-3 rounded-md text-sm font-semibold transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(client.clienteId)}
                      className="bg-danger text-white py-1 px-3 rounded-md text-sm font-semibold transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="flex gap-2 flex-wrap justify-center">
                    <button
                      onClick={() => handleAddProgressClick(client)}
                      className="bg-primary text-black py-1 px-3 rounded-md text-sm font-semibold transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      Agregar
                    </button>
                    <button
                      onClick={() => handleViewProgressListClick(client)}
                      className="bg-gray-500 text-white py-1 px-3 rounded-md text-sm font-semibold transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      Mostrar
                    </button>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="flex gap-2 flex-wrap justify-center">
                    <button
                      onClick={() => handleAddRoutineClick(client)}
                      className="bg-primary text-black py-1 px-3 rounded-md text-sm font-semibold transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      Agregar
                    </button>
                    <button
                      onClick={() => handleViewRoutinesClick(client)}
                      className="bg-gray-500 text-white py-1 px-3 rounded-md text-sm font-semibold transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      Mostrar
                    </button>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="flex gap-2 flex-wrap justify-center">
                    <button
                      onClick={() => handleAddDietClick(client)}
                      className="bg-primary text-black py-1 px-3 rounded-md text-sm font-semibold transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      Agregar
                    </button>
                    <button
                      onClick={() => handleViewDietsClick(client)}
                      className="bg-gray-500 text-white py-1 px-3 rounded-md text-sm font-semibold transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      Mostrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default ClientList;
