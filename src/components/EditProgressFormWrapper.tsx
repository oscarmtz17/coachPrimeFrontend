// src/components/EditProgressFormWrapper.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      <p className="text-red-500 text-center text-xl">
        Error: falta información de cliente o progreso.
      </p>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center text-xl">{error}</p>;
  }

  if (!progress) {
    return (
      <p className="text-yellow-400 text-center text-xl">
        Cargando progreso...
      </p>
    );
  }

  return (
    <div className="bg-zinc-900 min-h-screen flex justify-center items-center p-4 md:p-8">
      <div className="max-w-2xl w-full">
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

export default EditProgressFormWrapper;
