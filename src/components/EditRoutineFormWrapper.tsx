// src/components/EditRoutineFormWrapper.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditRoutineForm from "./EditRoutineForm";

const EditRoutineFormWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { rutinaId } = useParams<{ rutinaId: string }>();

  const handleRoutineUpdated = () => {
    navigate("/dashboard");
  };

  const handleCloseEditRoutine = () => {
    navigate(-1);
  };

  return (
    <div style={backgroundStyle}>
      <EditRoutineForm
        rutinaId={parseInt(rutinaId || "", 10)}
        onRoutineUpdated={handleRoutineUpdated}
        onClose={handleCloseEditRoutine}
      />
    </div>
  );
};

// Estilo de fondo oscuro
const backgroundStyle: React.CSSProperties = {
  backgroundColor: "#222",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
};

export default EditRoutineFormWrapper;
