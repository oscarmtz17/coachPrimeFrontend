// src/components/ClientList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditClientForm from "./EditClientForm";
import AddClientForm from "./AddClientForm";
import AddRoutineForm from "./AddRoutineForm";
import RoutineList from "./RoutineList";
import AddDietForm from "./AddDietForm";
import DietList from "./DietList";
import AddProgressForm from "./AddProgressForm";
import ProgressList from "./ProgressList";

interface Client {
  clienteId: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  sexo: string;
  usuarioId: number;
}

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedClientForRoutine, setSelectedClientForRoutine] =
    useState<Client | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isAddingRoutine, setIsAddingRoutine] = useState<boolean>(false);
  const [
    selectedClientForViewingRoutines,
    setSelectedClientForViewingRoutines,
  ] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddingDiet, setIsAddingDiet] = useState<boolean>(false);
  const [selectedClientForDiet, setSelectedClientForDiet] =
    useState<Client | null>(null);
  const [selectedClientForViewingDiets, setSelectedClientForViewingDiets] =
    useState<Client | null>(null);
  const [selectedClientForProgress, setSelectedClientForProgress] =
    useState<Client | null>(null);
  const [isAddingProgress, setIsAddingProgress] = useState<boolean>(false);
  const [selectedClientForProgressList, setSelectedClientForProgressList] =
    useState<Client | null>(null);
  const [isViewingProgressList, setIsViewingProgressList] =
    useState<boolean>(false);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5267/api/Cliente", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(response.data);
      setFilteredClients(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar la lista de clientes");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = clients.filter(
      (client) =>
        client.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
        client.apellido.toLowerCase().includes(lowerCaseSearchTerm) ||
        client.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        client.telefono.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  const handleEditClick = (client: Client) => {
    setSelectedClient(client);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleAddRoutineClick = (client: Client) => {
    setSelectedClientForRoutine(client);
    setIsAddingRoutine(true);
  };

  const handleViewRoutinesClick = (client: Client) => {
    setSelectedClientForViewingRoutines(client);
  };

  const handleDeleteClick = async (clientId: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5267/api/Cliente/${clientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchClients();
      } catch (err) {
        setError("Error al eliminar el cliente");
        console.error(err);
      }
    }
  };

  const handleSave = () => {
    setSelectedClient(null);
    setIsAdding(false);
    setIsAddingRoutine(false);
    setSelectedClientForViewingRoutines(null);
    fetchClients();
  };

  const handleRefresh = () => {
    fetchClients();
  };

  const handleAddDietClick = (client: Client) => {
    setSelectedClientForDiet(client);
    setIsAddingDiet(true);
  };

  const handleViewDietsClick = (client: Client) => {
    setSelectedClientForViewingDiets(client);
  };

  const handleAddProgressClick = (client: Client) => {
    setSelectedClientForProgress(client);
    setIsAddingProgress(true);
  };

  const handleProgressSaved = () => {
    setSelectedClientForProgress(null);
    setIsAddingProgress(false);
    fetchClients();
  };

  const handleViewProgressListClick = (client: Client) => {
    setSelectedClientForProgressList(client);
    setIsViewingProgressList(true);
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#333", color: "#fff" }}>
      <h2 style={{ color: "#ffcc00", fontSize: "2.5rem", textAlign: "center" }}>
        Lista de Clientes
      </h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <input
        type="text"
        placeholder="Buscar por nombre, apellido, email o teléfono..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem",
          width: "100%",
          maxWidth: "600px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <button
          onClick={handleAddClick}
          style={{
            backgroundColor: "#ffcc00",
            color: "#000",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "5px",
            marginRight: "0.5rem",
          }}
        >
          Agregar Cliente
        </button>
        <button
          onClick={handleRefresh}
          style={{
            backgroundColor: "#bbb",
            color: "#333",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Refrescar Lista
        </button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#333", color: "#ffcc00" }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Sexo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr
              key={client.clienteId}
              style={{
                borderBottom: "1px solid #555",
                textAlign: "center",
              }}
            >
              <td>{client.clienteId}</td>
              <td>{client.nombre}</td>
              <td>{client.apellido}</td>
              <td>{client.email}</td>
              <td>{client.telefono}</td>
              <td>{client.sexo}</td>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
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
                  <button
                    onClick={() => handleAddRoutineClick(client)}
                    style={buttonStyle("#28a745", "#fff")}
                  >
                    Agregar Rutina
                  </button>
                  <button
                    onClick={() => handleViewRoutinesClick(client)}
                    style={buttonStyle("#17a2b8", "#fff")}
                  >
                    Ver Rutinas
                  </button>
                  <button
                    onClick={() => handleAddDietClick(client)}
                    style={buttonStyle("#ffcc00", "#000")}
                  >
                    Agregar Dieta
                  </button>
                  <button
                    onClick={() => handleViewDietsClick(client)}
                    style={buttonStyle("#6c757d", "#fff")}
                  >
                    Ver Dietas
                  </button>
                  <button
                    onClick={() => handleAddProgressClick(client)}
                    style={buttonStyle("#ffc107", "#000")}
                  >
                    Agregar Progreso
                  </button>
                  <button
                    onClick={() => handleViewProgressListClick(client)}
                    style={buttonStyle("#6610f2", "#fff")}
                  >
                    Ver Progresos
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Renderizado condicional de formularios y listas */}
      {selectedClient && (
        <EditClientForm
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onSave={handleSave}
        />
      )}
      {isAdding && (
        <AddClientForm onClose={() => setIsAdding(false)} onSave={handleSave} />
      )}
      {isAddingRoutine && selectedClientForRoutine && (
        <AddRoutineForm
          clienteId={selectedClientForRoutine.clienteId}
          usuarioId={selectedClientForRoutine.usuarioId}
          onClose={() => setIsAddingRoutine(false)}
          onRoutineAdded={handleSave}
        />
      )}
      {isAddingDiet && selectedClientForDiet && (
        <AddDietForm
          clienteId={selectedClientForDiet.clienteId}
          onDietAdded={handleSave}
          onClose={() => setIsAddingDiet(false)}
        />
      )}
      {selectedClientForViewingRoutines && (
        <RoutineList
          clienteId={selectedClientForViewingRoutines.clienteId}
          onClose={() => {
            setSelectedClientForViewingRoutines(null);
            fetchClients();
          }}
        />
      )}
      {selectedClientForViewingDiets && (
        <DietList
          clienteId={selectedClientForViewingDiets.clienteId}
          onClose={() => setSelectedClientForViewingDiets(null)}
        />
      )}
      {isAddingProgress && selectedClientForProgress && (
        <AddProgressForm
          clienteId={selectedClientForProgress.clienteId}
          onProgressAdded={handleProgressSaved}
          onClose={() => setIsAddingProgress(false)}
        />
      )}
      {isViewingProgressList && selectedClientForProgressList && (
        <ProgressList
          clienteId={selectedClientForProgressList.clienteId}
          onClose={() => setIsViewingProgressList(false)}
        />
      )}
    </div>
  );
};

const buttonStyle = (bgColor: string, color: string) => ({
  backgroundColor: bgColor,
  color: color,
  border: "none",
  padding: "0.5rem",
  margin: "0.2rem",
  borderRadius: "3px",
  cursor: "pointer",
  width: "auto",
});

export default ClientList;
