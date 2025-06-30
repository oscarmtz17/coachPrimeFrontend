// src/components/ImageSelector.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import useImageSelector from "../hooks/useImageSelector";

interface ImageSelectorProps {
  onSelect: (key: string, url: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onSelect }) => {
  const { t } = useTranslation();
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

  // Categorías (values en inglés, textos traducidos)
  const categories = [
    { value: "shoulders", label: t("imageSelector.shoulders") },
    { value: "chest", label: t("imageSelector.chest") },
    { value: "back", label: t("imageSelector.back") },
    { value: "abs", label: t("imageSelector.abs") },
    { value: "biceps", label: t("imageSelector.biceps") },
    { value: "triceps", label: t("imageSelector.triceps") },
    { value: "legs", label: t("imageSelector.legs") },
  ];

  return (
    <div className="text-center">
      <h3 className="text-center text-yellow-400 text-2xl font-semibold mb-4">
        {t("imageSelector.title")}
      </h3>
      <p className="bg-zinc-700 p-3 rounded text-yellow-400 mb-4 text-sm text-center">
        <strong>{t("imageSelector.important")}:</strong>{" "}
        {t("imageSelector.privacy")}
      </p>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="inline-block mx-auto p-2 rounded border border-gray-300 bg-zinc-700 text-white mr-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option value="">{t("imageSelector.selectCategory")}</option>
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <button
          onClick={() => document.getElementById("fileInput")?.click()}
          className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition-colors"
        >
          {t("imageSelector.uploadImage")}
        </button>
      )}

      {selectedCategory && (
        <div className="mt-3 text-center">
          <input
            type="text"
            placeholder={t("imageSelector.searchPlaceholder")}
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
              ?.replace(/\.[^/.]+$/, "") || t("imageSelector.noName");

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
              {t("imageSelector.previewTitle")}
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
              placeholder={t("imageSelector.imageNamePlaceholder")}
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
                {t("imageSelector.accept")}
              </button>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="bg-red-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-red-700 transition-colors"
              >
                {t("imageSelector.cancel")}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageSelector;
