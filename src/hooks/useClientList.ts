// src/hooks/useClientList.ts
import { useEffect, useState, useMemo } from "react";
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

interface Suscripcion {
  planId: number;
  // ... otras propiedades de la suscripción
}

export const useClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [suscripcion, setSuscripcion] = useState<Suscripcion | null>(null);
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

  const fetchSuscripcion = async () => {
    try {
      const response = await api.get("/Suscripcion/actual");
      setSuscripcion(response.data);
    } catch (err) {
      console.error("Error al obtener la suscripción:", err);
      // Opcional: manejar el error, quizás el usuario no tiene suscripción
      // y se le debe asignar el plan básico por defecto en la UI.
      setSuscripcion({ planId: 1 }); // Fallback a plan básico si falla
    }
  };

  useEffect(() => {
    fetchClients();
    fetchSuscripcion();
  }, []);

  const clientCount = useMemo(() => clients.length, [clients]);

  const canAddClient = useMemo(() => {
    if (!suscripcion) return false; // No permitir si no se ha cargado la suscripción
    if (suscripcion.planId === 1 && clientCount >= 3) {
      return false; // Límite para el plan básico
    }
    return true; // Permitir en otros casos
  }, [clientCount, suscripcion]);

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
  };
};
