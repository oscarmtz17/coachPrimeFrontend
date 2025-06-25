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
    <div className="bg-zinc-900 min-h-screen flex justify-center items-center p-4 md:p-8">
      <EditRoutineForm
        rutinaId={parseInt(rutinaId || "", 10)}
        onRoutineUpdated={handleRoutineUpdated}
        onClose={handleCloseEditRoutine}
      />
    </div>
  );
};

export default EditRoutineFormWrapper;
