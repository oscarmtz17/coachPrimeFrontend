// src/hooks/useClientList.ts
import { useEffect, useState } from "react";
import api from "../services/api";
import EditClientForm from "../components/EditClientForm";
import AddClientForm from "../components/AddClientForm";
import AddRoutineForm from "../components/AddRoutineForm";
import RoutineList from "../components/RoutineList";
import AddDietForm from "../components/AddDietForm";
import DietList from "../components/DietList";
import AddProgressForm from "../components/AddProgressForm";
import ProgressList from "../components/ProgressList";
import React from "react";

interface Client {
  clienteId: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  sexo: string;
  usuarioId: number;
}

export const useClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchClients = async () => {
    try {
      const response = await api.get("/Cliente");
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
    setFilteredClients(
      clients.filter(
        (client) =>
          client.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
          client.apellido.toLowerCase().includes(lowerCaseSearchTerm) ||
          client.email.toLowerCase().includes(lowerCaseSearchTerm) ||
          client.telefono.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  }, [searchTerm, clients]);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleEditClick = (client: Client) => {
    openModal(
      React.createElement(EditClientForm, {
        client,
        onClose: closeModal,
        onSave: fetchClients,
      })
    );
  };

  const handleDeleteClick = async (clientId: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      try {
        await api.delete(`/Cliente/${clientId}`);
        fetchClients();
      } catch (err) {
        setError("Error al eliminar el cliente");
        console.error(err);
      }
    }
  };

  const handleAddClick = () => {
    openModal(
      React.createElement(AddClientForm, {
        onClose: closeModal,
        onSave: fetchClients,
      })
    );
  };

  const handleAddRoutineClick = (client: Client) => {
    openModal(
      React.createElement(AddRoutineForm, {
        clienteId: client.clienteId,
        usuarioId: client.usuarioId,
        onClose: closeModal,
        onRoutineAdded: fetchClients,
      })
    );
  };

  const handleViewRoutinesClick = (client: Client) => {
    openModal(
      React.createElement(RoutineList, {
        clienteId: client.clienteId,
        onClose: closeModal,
      })
    );
  };

  const handleAddDietClick = (client: Client) => {
    openModal(
      React.createElement(AddDietForm, {
        clienteId: client.clienteId,
        onDietAdded: fetchClients,
        onClose: closeModal,
      })
    );
  };

  const handleViewDietsClick = (client: Client) => {
    openModal(
      React.createElement(DietList, {
        clienteId: client.clienteId,
        onClose: closeModal,
      })
    );
  };

  const handleAddProgressClick = (client: Client) => {
    openModal(
      React.createElement(AddProgressForm, {
        clienteId: client.clienteId,
        onProgressAdded: fetchClients,
        onClose: closeModal,
      })
    );
  };

  const handleViewProgressListClick = (client: Client) => {
    openModal(
      React.createElement(ProgressList, {
        clienteId: client.clienteId,
        onClose: closeModal,
      })
    );
  };

  return {
    filteredClients,
    error,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    modalContent,
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
  };
};
