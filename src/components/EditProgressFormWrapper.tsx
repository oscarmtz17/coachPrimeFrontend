// src/components/EditProgressFormWrapper.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditProgressForm from "./EditProgressForm";
import api from "../services/api";

interface Progress {
  progresoId: number;
  fechaRegistro: string;
  pesoKg: number;
  estaturaCm: number;
  nivelActividad: string;
  factorActividad: number;
  cinturaCm: number;
  caderaCm: number;
  pechoCm: number;
  brazoCm: number;
  piernaCm: number;
  notas: string;
}

const EditProgressFormWrapper: React.FC = () => {
  const { clienteId, progresoId } = useParams<{
    clienteId: string;
    progresoId: string;
  }>();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!clienteId || !progresoId) return;

      try {
        const response = await api.get(`/progreso/${clienteId}/${progresoId}`);
        setProgress(response.data);
        setError(null);
      } catch (err) {
        setError("No se pudo cargar el progreso seleccionado.");
        console.error("Error al cargar el progreso:", err);
      }
    };

    fetchProgress();
  }, [clienteId, progresoId]);

  if (!clienteId || !progresoId) {
    return (
      <p style={errorStyle}>Error: falta información de cliente o progreso.</p>
    );
  }

  if (error) {
    return <p style={errorStyle}>{error}</p>;
  }

  if (!progress) {
    return <p style={loadingStyle}>Cargando progreso...</p>;
  }

  return (
    <div style={backgroundStyle}>
      <div style={formContainerStyle}>
        <EditProgressForm
          clienteId={parseInt(clienteId)}
          progress={progress}
          onSave={() => console.log("Progreso actualizado")}
          onClose={() => window.history.back()}
        />
      </div>
    </div>
  );
};

// Estilos para el fondo y el contenedor del formulario
const backgroundStyle: React.CSSProperties = {
  backgroundColor: "#222",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
};

const formContainerStyle: React.CSSProperties = {
  maxWidth: "600px", // Ajusta el ancho del formulario
  width: "100%",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#333",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  textAlign: "center",
  fontSize: "1.2rem",
};

const loadingStyle: React.CSSProperties = {
  color: "#ffcc00",
  textAlign: "center",
  fontSize: "1.2rem",
};

export default EditProgressFormWrapper;
