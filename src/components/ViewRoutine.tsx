// src/components/ViewRoutine.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { useViewRoutine } from "../hooks/useViewRoutine";

const ViewRoutine: React.FC = () => {
  const { t } = useTranslation();
  const { rutinaId } = useParams<{ rutinaId: string }>();
  const navigate = useNavigate();

  const {
    routine,
    error,
    handleDownloadPdf,
    handleEditRoutine,
    handleDeleteRoutine,
  } = useViewRoutine(rutinaId, navigate);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  // Traducción de días de la semana y agrupaciones
  const getDayLabel = (day: string) => {
    switch (day) {
      case "Monday":
        return t("addRoutine.monday");
      case "Tuesday":
        return t("addRoutine.tuesday");
      case "Wednesday":
        return t("addRoutine.wednesday");
      case "Thursday":
        return t("addRoutine.thursday");
      case "Friday":
        return t("addRoutine.friday");
      case "Saturday":
        return t("addRoutine.saturday");
      case "Sunday":
        return t("addRoutine.sunday");
      default:
        return day;
    }
  };
  const getGroupLabel = (type: string) => {
    switch (type) {
      case "Single Exercise":
        return t("addRoutine.singleExercise");
      case "Bi-Set":
        return t("addRoutine.biSet");
      case "Tri-Set":
        return t("addRoutine.triSet");
      case "Quad-Set":
        return t("addRoutine.quadSet");
      case "Circuit":
        return t("addRoutine.circuit");
      default:
        return type;
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen pt-8 flex justify-center items-center p-4 md:p-8">
      <div className="bg-zinc-800 text-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {routine && (
          <>
            <div className="flex justify-start mb-4">
              <button
                onClick={handleBackToDashboard}
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                {t("viewRoutine.backToDashboard")}
              </button>
            </div>
            <h3 className="text-yellow-400 text-2xl text-center font-semibold mb-4">
              {routine.nombre}
            </h3>
            <p className="text-gray-300 text-center mb-4">
              {routine.descripcion}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <button
                onClick={handleDownloadPdf}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                {t("viewRoutine.downloadPdf")}
              </button>
              <button
                onClick={handleEditRoutine}
                className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
              >
                {t("viewRoutine.editRoutine")}
              </button>
              <button
                onClick={handleDeleteRoutine}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
              >
                {t("viewRoutine.deleteRoutine")}
              </button>
            </div>
            {routine.diasEntrenamiento.map((dia, diaIndex) => (
              <div key={diaIndex} className="mb-6">
                <h4 className="text-yellow-400 text-xl font-semibold mb-2">
                  {getDayLabel(dia.diaSemana)}
                </h4>
                {dia.agrupaciones.map((agrupacion, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="bg-zinc-700 p-4 rounded-lg mb-4"
                  >
                    <h5 className="text-yellow-400 text-lg font-semibold mb-3">
                      {getGroupLabel(agrupacion.tipo)}
                    </h5>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse mb-4">
                        <thead>
                          <tr className="bg-zinc-600 text-yellow-400 text-center">
                            <th className="p-3">
                              {t("viewRoutine.exerciseName")}
                            </th>
                            <th className="p-3">{t("viewRoutine.series")}</th>
                            <th className="p-3">
                              {t("viewRoutine.repetitions")}
                            </th>
                            <th className="p-3">{t("viewRoutine.image")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {agrupacion.ejercicios.map((ejercicio, exIndex) => (
                            <tr
                              key={exIndex}
                              className="text-center border-b border-zinc-600"
                            >
                              <td className="p-3 text-white">
                                {ejercicio.nombre}
                              </td>
                              <td className="p-3 text-white">
                                {ejercicio.series}
                              </td>
                              <td className="p-3 text-white">
                                {ejercicio.repeticiones}
                              </td>
                              <td className="p-3">
                                {ejercicio.imagenUrl ? (
                                  <img
                                    src={ejercicio.imagenUrl}
                                    alt={ejercicio.nombre}
                                    className="w-24 h-24 object-cover rounded mx-auto"
                                  />
                                ) : (
                                  <p className="text-gray-400 italic">
                                    {t("viewRoutine.imageNotAvailable")}
                                  </p>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewRoutine;
