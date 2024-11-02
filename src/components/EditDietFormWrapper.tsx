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
    <div style={backgroundStyle}>
      <EditDietForm
        clienteId={parseInt(clienteId)}
        dietaId={parseInt(dietaId)}
        onDietUpdated={() => console.log("Dieta actualizada")}
        onClose={() => window.history.back()}
      />
    </div>
  );
};

const backgroundStyle: React.CSSProperties = {
  backgroundColor: "#222",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
};

export default EditDietFormWrapper;
