import React, { useEffect, useState } from "react";
import api from "../services/api";

interface ImageSelectorProps {
  onSelect: (url: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get(`/images/category/${selectedCategory}`);

        // Asegúrate de acceder a la propiedad `$values` si existe, o un array vacío si no
        setImages(response.data.$values || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (selectedCategory) {
      fetchImages();
    }
  }, [selectedCategory]);

  return (
    <div>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Seleccione una categoría</option>
        <option value="back">Espalda</option>
        <option value="abs">Abdomen</option>
        <option value="legs">Piernas</option>
        {/* Añade más opciones según tus categorías */}
      </select>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="exercise"
            style={{ width: "100px", height: "100px", cursor: "pointer" }}
            onClick={() => onSelect(url)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;
