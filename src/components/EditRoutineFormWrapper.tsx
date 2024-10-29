// src/components/EditRoutineFormWrapper.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditRoutineForm from "./EditRoutineForm";

const EditRoutineFormWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { rutinaId } = useParams<{ rutinaId: string }>();

  const handleRoutineUpdated = () => {
    // Redirige a la página de dashboard o alguna otra página después de la edición exitosa
    navigate("/dashboard");
  };

  const handleCloseEditRoutine = () => {
    // Redirige a la lista de rutinas o dashboard cuando se cierra el formulario
    navigate(-1); // -1 indica que vuelve a la página anterior
  };

  return (
    <EditRoutineForm
      rutinaId={parseInt(rutinaId || "", 10)}
      onRoutineUpdated={handleRoutineUpdated}
      onClose={handleCloseEditRoutine}
    />
  );
};

export default EditRoutineFormWrapper;
