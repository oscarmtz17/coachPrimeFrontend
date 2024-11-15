// src/components/ImageSelector.tsx
import React from "react";
import api from "../services/api";
import Modal from "./Modal";
import useImageSelector from "../hooks/useImageSelector";
import ImageSelectorStyles from "../styles/ImageSelectorStyles";

interface ImageSelectorProps {
  onSelect: (url: string) => void;
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

  return (
    <div style={ImageSelectorStyles.container}>
      <h3 style={ImageSelectorStyles.title}>Imágenes</h3>
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
        {filteredImages.map((url, index) => {
          const fileName =
            url
              .split("/")
              .pop()
              ?.replace(/\.[^/.]+$/, "")
              .split("_")
              .slice(1)
              .join("_") || "";

          return (
            <div key={index} style={ImageSelectorStyles.imageContainer}>
              <img
                src={url}
                alt={fileName}
                style={ImageSelectorStyles.image}
                onClick={() => onSelect(url)}
              />
              <p style={ImageSelectorStyles.imageName}>{fileName}</p>
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
