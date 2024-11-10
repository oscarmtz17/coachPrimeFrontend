import React, { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "./Modal";

interface ImageSelectorProps {
  onSelect: (url: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [filteredImages, setFilteredImages] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Fetch public and private images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get(
          `/images/combined-images?userId=${localStorage.getItem(
            "userId"
          )}&category=${selectedCategory}`
        );
        const fetchedImages = response.data.$values || [];
        setImages(fetchedImages);
        setFilteredImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (selectedCategory) {
      fetchImages();
      setSearchTerm("");
    }
  }, [selectedCategory]);

  // Filtrar imágenes
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const result = images.filter((url) => {
      const fileName =
        url
          .split("/")
          .pop()
          ?.replace(/\.[^/.]+$/, "") || "";
      return fileName.toLowerCase().includes(lowerCaseSearchTerm);
    });
    setFilteredImages(result);
  }, [searchTerm, images]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")
    ) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setIsPreviewOpen(true);
    } else {
      alert("Por favor, seleccione una imagen en formato .jpeg o .png");
    }
  };

  const handleUpload = async () => {
    const userId = localStorage.getItem("userId") || "";

    if (!userId) {
      alert("El usuario no está definido. Por favor, inicie sesión de nuevo.");
      return;
    }

    if (file && selectedCategory) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", selectedCategory);
      formData.append("userId", userId);

      console.log("Subiendo imagen con:", {
        file,
        category: selectedCategory,
        userId,
      }); // Depuración

      try {
        await api.post("/images/upload-private", formData);
        alert("Imagen subida exitosamente.");
        setIsPreviewOpen(false);
        setFile(null);
        setPreviewUrl(null);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Error al subir la imagen.");
      }
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", color: "#ffcc00" }}>Imágenes</h3>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          display: "inline-block",
          margin: "0 auto",
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
          backgroundColor: "#555",
          color: "#fff",
          marginRight: "10px",
        }}
      >
        <option value="">Seleccione una categoría</option>
        <option value="back">Espalda</option>
        <option value="abs">Abdomen</option>
        <option value="legs">Piernas</option>
        {/* Añade más opciones según tus categorías */}
      </select>

      {selectedCategory && (
        <button
          onClick={() => document.getElementById("fileInput")?.click()}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "0.5rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Subir Imagen
        </button>
      )}

      {selectedCategory && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Buscar imagen por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "80%",
              backgroundColor: "#555",
              color: "#fff",
              marginBottom: "10px",
            }}
          />
        </div>
      )}

      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        accept=".jpeg, .png"
        onChange={handleFileChange}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {filteredImages.map((url, index) => {
          const fileName =
            url
              .split("/")
              .pop()
              ?.replace(/\.[^/.]+$/, "") || "";
          return (
            <div key={index} style={{ textAlign: "center" }}>
              <img
                src={url}
                alt={fileName}
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => onSelect(url)}
              />
              <p style={{ color: "#ffcc00", fontSize: "0.9rem" }}>{fileName}</p>
            </div>
          );
        })}
      </div>

      {isPreviewOpen && previewUrl && (
        <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
          <div style={{ textAlign: "center" }}>
            <h4 style={{ color: "#ffcc00" }}>Vista previa de la imagen</h4>
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: "100px", height: "100px", marginBottom: "10px" }}
            />
            <div>
              <button
                onClick={handleUpload}
                style={{
                  marginRight: "10px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  padding: "0.5rem",
                  borderRadius: "4px",
                }}
              >
                Aceptar
              </button>
              <button
                onClick={() => setIsPreviewOpen(false)}
                style={{
                  backgroundColor: "#f44336",
                  color: "#fff",
                  padding: "0.5rem",
                  borderRadius: "4px",
                }}
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
