// src/components/EditDietFormWrapper.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import EditDietForm from "./EditDietForm";

const EditDietFormWrapper: React.FC = () => {
  const { t } = useTranslation();
  const { clienteId, dietaId } = useParams<{
    clienteId: string;
    dietaId: string;
  }>();

  if (!clienteId || !dietaId) {
    return (
      <div className="bg-zinc-900 min-h-screen flex justify-center items-center p-4 md:p-8">
        <div className="bg-zinc-800 text-white p-8 rounded-lg max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-yellow-400 text-2xl text-center font-semibold">
              {t("editDietWrapper.title")}
            </h3>
          </div>
          <p className="text-red-500 text-center">
            {t("editDietWrapper.error")}
          </p>
        </div>
      </div>
    );
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
