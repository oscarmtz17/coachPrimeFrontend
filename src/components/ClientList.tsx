// src/components/ClientList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditClientForm from "./EditClientForm";
import AddClientForm from "./AddClientForm";
import AddRoutineForm from "./AddRoutineForm";
import RoutineList from "./RoutineList"; // Componente para mostrar rutinas
import AddDietForm from "./AddDietForm"; // Asegúrate de que esta línea esté presente
import DietList from "./DietList";

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

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5267/api/Cliente", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(response.data);
      setFilteredClients(response.data); // Initialize filtered clients
      setError(null); // Clear any previous error
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
  return (
    <div>
      <h2>Lista de Clientes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Buscar por nombre, apellido, email o teléfono..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      />
      <button onClick={handleAddClick} style={{ marginBottom: "1rem" }}>
        Agregar Cliente
      </button>
      <button onClick={handleRefresh} style={{ marginLeft: "1rem" }}>
        Refrescar Lista
      </button>
      <table>
        <thead>
          <tr>
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
            <tr key={client.clienteId}>
              <td>{client.clienteId}</td>
              <td>{client.nombre}</td>
              <td>{client.apellido}</td>
              <td>{client.email}</td>
              <td>{client.telefono}</td>
              <td>{client.sexo}</td>
              <td>
                <button onClick={() => handleEditClick(client)}>Editar</button>
                <button onClick={() => handleDeleteClick(client.clienteId)}>
                  Eliminar
                </button>
                <button onClick={() => handleAddRoutineClick(client)}>
                  Agregar Rutina
                </button>
                <button onClick={() => handleViewRoutinesClick(client)}>
                  Ver Rutinas
                </button>
                <button onClick={() => handleAddDietClick(client)}>
                  Agregar Dieta
                </button>
                <button onClick={() => handleViewDietsClick(client)}>
                  Ver Dietas
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
      {/* Renderizado condicional para AddDietForm */}
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
            fetchClients(); // Asegura que la lista se actualiza al volver
          }}
        />
      )}
      {/* Render the DietList component conditionally */}
      {selectedClientForViewingDiets && (
        <DietList
          clienteId={selectedClientForViewingDiets.clienteId}
          onClose={() => setSelectedClientForViewingDiets(null)}
        />
      )}
    </div>
  );
};

export default ClientList;
