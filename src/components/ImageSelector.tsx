// src/components/ImageSelector.tsx
import React from "react";
import Modal from "./Modal";
import useImageSelector from "../hooks/useImageSelector";

interface ImageSelectorProps {
  onSelect: (key: string, url: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onSelect }) => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    previewUrl,
    isPreviewOpen,
    setIsPreviewOpen,
    imageName,
    setImageName,
    filteredImages,
    handleFileChange,
    handleUpload,
  } = useImageSelector();

  return (
    <div className="text-center">
      <h3 className="text-center text-yellow-400 text-2xl font-semibold mb-4">
        Imágenes
      </h3>
      <p className="bg-zinc-700 p-3 rounded text-yellow-400 mb-4 text-sm text-center">
        <strong>¡Importante!:</strong> Por tu privacidad nos aseguramos que las
        imágenes que subas solo podrán ser vistas por ti, ningún otro usuario
        puede visualizar o usar tus imágenes.
      </p>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="inline-block mx-auto p-2 rounded border border-gray-300 bg-zinc-700 text-white mr-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option value="">Seleccione una categoría</option>
        <option value="back">Espalda</option>
        <option value="abs">Abdomen</option>
        <option value="legs">Piernas</option>
      </select>

      {selectedCategory && (
        <button
          onClick={() => document.getElementById("fileInput")?.click()}
          className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition-colors"
        >
          Subir Imagen
        </button>
      )}

      {selectedCategory && (
        <div className="mt-3 text-center">
          <input
            type="text"
            placeholder="Buscar imagen por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-300 w-4/5 bg-zinc-700 text-white mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      )}

      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept=".jpeg, .png"
        onChange={handleFileChange}
      />

      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {filteredImages.map((image, index) => {
          const fileName =
            image.key
              ?.split("/")
              .pop()
              ?.replace(/\.[^/.]+$/, "") || "Nombre no disponible";

          return (
            <div key={index} className="text-center">
              <img
                src={image.url}
                alt={fileName}
                className="w-24 h-24 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                onClick={() => onSelect(image.key || "", image.url || "")}
              />
              <p className="text-yellow-400 text-sm mt-1">{image.imageName}</p>
            </div>
          );
        })}
      </div>

      {isPreviewOpen && previewUrl && (
        <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
          <div className="text-center w-full max-w-md">
            <h4 className="text-yellow-400 text-xl font-semibold mb-4">
              Vista previa de la imagen
            </h4>
            <div className="flex justify-center mb-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-36 h-36 object-cover rounded"
              />
            </div>
            <input
              type="text"
              placeholder="Nombre de la imagen"
              maxLength={50}
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              required
              className="p-2 rounded border border-gray-300 w-4/5 bg-zinc-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleUpload}
                disabled={!imageName}
                className={`text-white py-2 px-4 rounded cursor-pointer mr-3 transition-colors ${
                  !imageName
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Aceptar
              </button>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="bg-red-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-red-700 transition-colors"
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
