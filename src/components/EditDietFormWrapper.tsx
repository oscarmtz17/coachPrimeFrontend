// src/components/EditDietFormWrapper.tsx
import React from "react";
import { useParams } from "react-router-dom";
import EditDietForm from "./EditDietForm";

const EditDietFormWrapper: React.FC = () => {
  const { clienteId, dietaId } = useParams<{
    clienteId: string;
    dietaId: string;
  }>();

  if (!clienteId || !dietaId) {
    return <p>Error: falta información de cliente o dieta.</p>;
  }

  return (
    <EditDietForm
      clienteId={parseInt(clienteId)}
      dietaId={parseInt(dietaId)}
      onDietUpdated={() => console.log("Dieta actualizada")} // Puedes personalizar este comportamiento
      onClose={() => window.history.back()}
    />
  );
};

export default EditDietFormWrapper;
