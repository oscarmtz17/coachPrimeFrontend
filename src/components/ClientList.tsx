// src/components/ClientList.tsx
import React from "react";
import Modal from "./Modal";
import { useClientList } from "../hooks/useClientList";
import ClientListStyles, { buttonStyle } from "../styles/ClientListStyles";

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
  } = useClientList();

  return (
    <div style={ClientListStyles.container}>
      <h2 style={ClientListStyles.title}>Lista de Clientes ({clientCount})</h2>
      {error && <p style={ClientListStyles.error}>{error}</p>}
      <input
        type="text"
        placeholder="Buscar por nombre, apellido, email o teléfono..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={ClientListStyles.searchInput}
      />
      <div style={ClientListStyles.buttonContainer}>
        <button
          onClick={handleAddClick}
          style={{
            ...ClientListStyles.addButton,
            backgroundColor: canAddClient ? "#28a745" : "#6c757d",
            cursor: canAddClient ? "pointer" : "not-allowed",
          }}
          disabled={!canAddClient}
        >
          Agregar Cliente
        </button>
        <button
          onClick={useClientList().fetchClients}
          style={ClientListStyles.refreshButton}
        >
          Refrescar Lista
        </button>
      </div>
      {!canAddClient && (
        <p style={{ color: "yellow", textAlign: "center", marginTop: "1rem" }}>
          Has alcanzado el límite de clientes para tu plan.{" "}
          <a href="/profile" style={{ color: "#00aaff" }}>
            Actualiza tu plan
          </a>{" "}
          para agregar más.
        </p>
      )}
      <table style={ClientListStyles.table}>
        <thead>
          <tr style={ClientListStyles.tableHeader}>
            <th style={{ display: "none" }}>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Sexo</th>
            <th>Usuario</th>
            <th>Progresos</th>
            <th>Rutinas</th>
            <th>Dietas</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.clienteId} style={ClientListStyles.tableRow}>
              <td style={{ display: "none" }}>{client.clienteId}</td>
              <td style={ClientListStyles.tableCell}>{client.nombre}</td>
              <td style={ClientListStyles.tableCell}>{client.apellido}</td>
              <td style={ClientListStyles.tableCell}>{client.email}</td>
              <td style={ClientListStyles.tableCell}>{client.telefono}</td>
              <td style={ClientListStyles.tableCell}>{client.sexo}</td>
              <td style={ClientListStyles.tableCell}>
                <div style={ClientListStyles.actionButtonContainer}>
                  <div style={ClientListStyles.buttonGroup}>
                    <button
                      onClick={() => handleEditClick(client)}
                      style={buttonStyle("#007bff", "#fff")}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(client.clienteId)}
                      style={buttonStyle("#dc3545", "#fff")}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </td>
              <td style={ClientListStyles.tableCell}>
                <div style={ClientListStyles.actionButtonContainer}>
                  <div style={ClientListStyles.buttonGroup}>
                    <button
                      onClick={() => handleAddProgressClick(client)}
                      style={buttonStyle("#ffcc00", "#000")}
                    >
                      Agregar
                    </button>
                    <button
                      onClick={() => handleViewProgressListClick(client)}
                      style={buttonStyle("#6c757d", "#fff")}
                    >
                      Mostrar
                    </button>
                  </div>
                </div>
              </td>
              <td style={ClientListStyles.tableCell}>
                <div style={ClientListStyles.actionButtonContainer}>
                  <div style={ClientListStyles.buttonGroup}>
                    <button
                      onClick={() => handleAddRoutineClick(client)}
                      style={buttonStyle("#ffcc00", "#000")}
                    >
                      Agregar
                    </button>
                    <button
                      onClick={() => handleViewRoutinesClick(client)}
                      style={buttonStyle("#6c757d", "#fff")}
                    >
                      Mostrar
                    </button>
                  </div>
                </div>
              </td>
              <td style={ClientListStyles.tableCell}>
                <div style={ClientListStyles.actionButtonContainer}>
                  <div style={ClientListStyles.buttonGroup}>
                    <button
                      onClick={() => handleAddDietClick(client)}
                      style={buttonStyle("#ffcc00", "#000")}
                    >
                      Agregar
                    </button>
                    <button
                      onClick={() => handleViewDietsClick(client)}
                      style={buttonStyle("#6c757d", "#fff")}
                    >
                      Mostrar
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default ClientList;
