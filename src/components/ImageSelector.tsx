// src/components/ImageSelector.tsx
import React, { useEffect } from "react";
import api from "../services/api";
import Modal from "./Modal";
import useImageSelector from "../hooks/useImageSelector";
import ImageSelectorStyles from "../styles/ImageSelectorStyles";

interface ImageSelectorProps {
  onSelect: (key: string, url: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onSelect }) => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    file,
    setFile,
    previewUrl,
    setPreviewUrl,
    isPreviewOpen,
    setIsPreviewOpen,
    imageName,
    setImageName,
    filteredImages,
    handleFileChange,
    handleUpload,
  } = useImageSelector();

  console.log("filteredImages: ", filteredImages);
  console.log("imageName: ", imageName);

  return (
    <div style={ImageSelectorStyles.container}>
      <h3 style={ImageSelectorStyles.title}>Imágenes</h3>
      <p style={ImageSelectorStyles.advestise}>
        <strong>¡Importante!:</strong> Por tu privacidad nos aseguramos que las
        imágenes que subas solo podrán ser vistas por ti, ningún otro usuario
        puede visualizar o usar tus imágenes.
      </p>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={ImageSelectorStyles.select}
      >
        <option value="">Seleccione una categoría</option>
        <option value="back">Espalda</option>
        <option value="abs">Abdomen</option>
        <option value="legs">Piernas</option>
      </select>

      {selectedCategory && (
        <button
          onClick={() => document.getElementById("fileInput")?.click()}
          style={ImageSelectorStyles.uploadButton}
        >
          Subir Imagen
        </button>
      )}

      {selectedCategory && (
        <div style={ImageSelectorStyles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar imagen por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={ImageSelectorStyles.searchInput}
          />
        </div>
      )}

      <input
        type="file"
        id="fileInput"
        style={ImageSelectorStyles.fileInput}
        accept=".jpeg, .png"
        onChange={handleFileChange}
      />

      <div style={ImageSelectorStyles.imageGrid}>
        {filteredImages.map((image, index) => {
          const fileName =
            image.key
              ?.split("/") // Asegúrate de que Key existe
              .pop()
              ?.replace(/\.[^/.]+$/, "") || "Nombre no disponible";

          return (
            <div key={index} style={ImageSelectorStyles.imageContainer}>
              <img
                src={image.url} // Asegúrate de que Url está siendo utilizado aquí
                alt={fileName}
                style={ImageSelectorStyles.image}
                onClick={() => onSelect(image.key || "", image.url || "")}
              />
              <p style={ImageSelectorStyles.imageName}>{image.imageName}</p>
            </div>
          );
        })}
      </div>

      {isPreviewOpen && previewUrl && (
        <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
          <div style={ImageSelectorStyles.modalContent}>
            <h4 style={ImageSelectorStyles.modalTitle}>
              Vista previa de la imagen
            </h4>
            <div style={ImageSelectorStyles.modalImageContainer}>
              <img
                src={previewUrl}
                alt="Preview"
                style={ImageSelectorStyles.modalImage}
              />
            </div>
            <input
              type="text"
              placeholder="Nombre de la imagen"
              maxLength={50}
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              required
              style={ImageSelectorStyles.modalInput}
            />
            <div>
              <button
                onClick={handleUpload}
                disabled={!imageName}
                style={{
                  ...ImageSelectorStyles.modalButton,
                  backgroundColor: !imageName ? "#ccc" : "#4CAF50",
                }}
              >
                Aceptar
              </button>
              <button
                onClick={() => setIsPreviewOpen(false)}
                style={ImageSelectorStyles.modalCancelButton}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageSelector;
