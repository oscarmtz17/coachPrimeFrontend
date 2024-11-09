import React, { useEffect, useState } from "react";
import api from "../services/api";

interface ImageSelectorProps {
  onSelect: (url: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [filteredImages, setFilteredImages] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get(`/images/category/${selectedCategory}`);
        const fetchedImages = response.data.$values || [];
        setImages(fetchedImages);
        setFilteredImages(fetchedImages); // Inicialmente, el filtrado es igual a las imágenes cargadas
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (selectedCategory) {
      fetchImages();
      setSearchTerm(""); // Limpiar el término de búsqueda al cambiar de categoría
    }
  }, [selectedCategory]);

  // Filtra las imágenes basadas en el término de búsqueda
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const result = images.filter((url) => {
      const fileName =
        url
          .split("/")
          .pop()
          ?.replace(/\.[^/.]+$/, "") || ""; // Remover extensión
      return fileName.toLowerCase().includes(lowerCaseSearchTerm);
    });
    setFilteredImages(result);
  }, [searchTerm, images]);

  return (
    <div>
      <h3 style={{ textAlign: "center", color: "#ffcc00" }}>Imágenes</h3>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          display: "block",
          margin: "0 auto",
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
          backgroundColor: "#555",
          color: "#fff",
        }}
      >
        <option value="">Seleccione una categoría</option>
        <option value="back">Espalda</option>
        <option value="abs">Abdomen</option>
        <option value="legs">Piernas</option>
        {/* Añade más opciones según tus categorías */}
      </select>

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
    </div>
  );
};

export default ImageSelector;
