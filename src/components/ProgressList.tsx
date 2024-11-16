import React, { useState } from "react";
import { useProgressList } from "../hooks/useProgressList";
import ProgressListStyles from "../styles/ProgressListStyles";

interface ProgressListProps {
  clienteId: number;
  onClose: () => void;
}

const ProgressList: React.FC<ProgressListProps> = ({ clienteId, onClose }) => {
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

  if (loading) {
    return (
      <p style={ProgressListStyles.loading}>
        Cargando registros de progreso...
      </p>
    );
  }

  return (
    <div style={ProgressListStyles.container}>
      <h3 style={ProgressListStyles.title}>Progresos del Cliente</h3>
      {error && <p style={ProgressListStyles.error}>{error}</p>}
      {!error && progressList.length > 0 ? (
        <table style={ProgressListStyles.table}>
          <thead>
            <tr style={ProgressListStyles.headerRow}>
              <th>Fecha</th>
              <th>Peso (kg)</th>
              <th>Estatura (cm)</th>
              <th>Nivel de Actividad</th>
              <th>Factor Actividad</th>
              <th>Cintura (cm)</th>
              <th>Cadera (cm)</th>
              <th>Pecho (cm)</th>
              <th>Brazo (cm)</th>
              <th>Pierna (cm)</th>
              <th>Notas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {progressList.map((progress) => (
              <tr key={progress.progresoId} style={ProgressListStyles.row}>
                <td style={ProgressListStyles.cell}>
                  {new Date(progress.fechaRegistro).toLocaleDateString()}
                </td>
                <td style={ProgressListStyles.cell}>{progress.pesoKg}</td>
                <td style={ProgressListStyles.cell}>{progress.estaturaCm}</td>
                <td style={ProgressListStyles.cell}>
                  {progress.nivelActividad}
                </td>
                <td style={ProgressListStyles.cell}>
                  {progress.factorActividad}
                </td>
                <td style={ProgressListStyles.cell}>{progress.cinturaCm}</td>
                <td style={ProgressListStyles.cell}>{progress.caderaCm}</td>
                <td style={ProgressListStyles.cell}>{progress.pechoCm}</td>
                <td style={ProgressListStyles.cell}>{progress.brazoCm}</td>
                <td style={ProgressListStyles.cell}>{progress.piernaCm}</td>
                <td style={ProgressListStyles.cell}>{progress.notas}</td>
                <td style={ProgressListStyles.actionCell}>
                  <button
                    onClick={() => handleEditProgress(progress)}
                    style={ProgressListStyles.actionButton("#28a745")}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProgress(progress.progresoId)}
                    style={ProgressListStyles.actionButton("#dc3545")}
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleViewImages(progress.progresoId)}
                    style={ProgressListStyles.actionButton("#007bff")}
                  >
                    Ver Imágenes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={ProgressListStyles.noData}>
          No hay registros de progreso disponibles.
        </p>
      )}
      <button onClick={onClose} style={ProgressListStyles.closeButton}>
        Cerrar
      </button>

      {modalOpen && (
        <div style={ProgressListStyles.modal}>
          <h4>Imágenes del Progreso</h4>
          <div style={ProgressListStyles.imageContainer}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagen ${index + 1}`}
                style={ProgressListStyles.thumbnail}
                onClick={() => window.open(image, "_blank")}
              />
            ))}
          </div>
          <button onClick={closeModal} style={ProgressListStyles.closeButton}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgressList;
