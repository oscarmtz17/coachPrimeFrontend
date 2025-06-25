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
    <div className="bg-zinc-900 min-h-screen flex justify-center items-center p-4 md:p-8">
      <EditDietForm
        clienteId={parseInt(clienteId)}
        dietaId={parseInt(dietaId)}
        onDietUpdated={() => console.log("Dieta actualizada")}
        onClose={() => window.history.back()}
      />
    </div>
  );
};

export default EditDietFormWrapper;
