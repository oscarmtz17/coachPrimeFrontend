import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProgressList } from "../hooks/useProgressList";

interface ProgressListProps {
  clienteId: number;
  onClose: () => void;
}

const ProgressList: React.FC<ProgressListProps> = ({ clienteId, onClose }) => {
  const { t } = useTranslation();
  const {
    progressList,
    error,
    loading,
    handleEditProgress,
    handleDeleteProgress,
    getProgressImages,
  } = useProgressList(clienteId);

  const [modalOpen, setModalOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedProgressId, setSelectedProgressId] = useState<number | null>(
    null
  );

  const handleViewImages = async (progresoId: number) => {
    const fetchedImages = await getProgressImages(progresoId);
    setImages(fetchedImages);
    setSelectedProgressId(progresoId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setImages([]);
    setSelectedProgressId(null);
  };

  // Traducción de nivel de actividad guardado en inglés
  const getNivelActividadLabel = (nivel: string) => {
    switch (nivel) {
      case "Very Light":
        return t("addProgress.veryLight");
      case "Light":
        return t("addProgress.light");
      case "Moderate":
        return t("addProgress.moderate");
      case "Active":
        return t("addProgress.active");
      case "Very Active":
        return t("addProgress.veryActive");
      default:
        return nivel;
    }
  };

  if (loading) {
    return (
      <p className="text-yellow-400 text-center text-xl">
        {t("progressList.loading")}
      </p>
    );
  }

  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-full mx-auto">
      <h3 className="text-yellow-400 text-2xl text-center font-semibold mb-4">
        {t("progressList.title")}
      </h3>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {!error && progressList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-zinc-700 text-yellow-400 text-center">
                <th className="p-3">{t("progressList.date")}</th>
                <th className="p-3">{t("progressList.weight")}</th>
                <th className="p-3">{t("progressList.height")}</th>
                <th className="p-3">{t("progressList.activityLevel")}</th>
                <th className="p-3">{t("progressList.activityFactor")}</th>
                <th className="p-3">{t("progressList.waist")}</th>
                <th className="p-3">{t("progressList.hip")}</th>
                <th className="p-3">{t("progressList.chest")}</th>
                <th className="p-3">{t("progressList.arm")}</th>
                <th className="p-3">{t("progressList.leg")}</th>
                <th className="p-3">{t("progressList.notes")}</th>
                <th className="p-3">{t("progressList.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {progressList.map((progress) => (
                <tr
                  key={progress.progresoId}
                  className="text-center border-b border-zinc-600"
                >
                  <td className="p-3 text-white">
                    {new Date(progress.fechaRegistro).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-white">{progress.pesoKg}</td>
                  <td className="p-3 text-white">{progress.estaturaCm}</td>
                  <td className="p-3 text-white">
                    {getNivelActividadLabel(progress.nivelActividad)}
                  </td>
                  <td className="p-3 text-white">{progress.factorActividad}</td>
                  <td className="p-3 text-white">{progress.cinturaCm}</td>
                  <td className="p-3 text-white">{progress.caderaCm}</td>
                  <td className="p-3 text-white">{progress.pechoCm}</td>
                  <td className="p-3 text-white">{progress.brazoCm}</td>
                  <td className="p-3 text-white">{progress.piernaCm}</td>
                  <td className="p-3 text-white">{progress.notas}</td>
                  <td className="p-3">
                    <div className="flex flex-col gap-2 justify-center">
                      <button
                        onClick={() => handleEditProgress(progress)}
                        className="bg-green-600 text-white py-1 px-2 rounded text-sm border-none cursor-pointer hover:bg-green-700 transition-colors"
                      >
                        {t("progressList.edit")}
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteProgress(progress.progresoId)
                        }
                        className="bg-red-600 text-white py-1 px-2 rounded text-sm border-none cursor-pointer hover:bg-red-700 transition-colors"
                      >
                        {t("progressList.delete")}
                      </button>
                      <button
                        onClick={() => handleViewImages(progress.progresoId)}
                        className="bg-blue-600 text-white py-1 px-2 rounded text-sm border-none cursor-pointer hover:bg-blue-700 transition-colors"
                      >
                        {t("progressList.viewImages")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-yellow-400 text-center text-xl">
          {t("progressList.noRecords")}
        </p>
      )}
      <button
        onClick={onClose}
        className="bg-gray-300 text-zinc-800 py-2 px-4 rounded cursor-pointer w-full hover:bg-gray-400 transition-colors"
      >
        {t("progressList.close")}
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-800 text-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h4 className="text-yellow-400 text-xl font-semibold mb-4">
              {t("progressList.progressImages")}
            </h4>
            <div className="flex flex-wrap gap-4 justify-center">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${t("progressList.image")} ${index + 1}`}
                  className="w-24 h-24 object-cover rounded cursor-pointer transition-transform hover:scale-105"
                  onClick={() => window.open(image, "_blank")}
                />
              ))}
            </div>
            <button
              onClick={closeModal}
              className="bg-gray-300 text-zinc-800 py-2 px-4 rounded cursor-pointer w-full mt-4 hover:bg-gray-400 transition-colors"
            >
              {t("progressList.close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressList;
