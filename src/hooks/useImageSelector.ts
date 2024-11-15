// src/hooks/useImageSelector.ts
import { useEffect, useState } from "react";
import api from "../services/api";

const useImageSelector = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [filteredImages, setFilteredImages] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [imageName, setImageName] = useState("");

  const fetchImages = async () => {
    try {
      const response = await api.get(
        `/images/combined-images?userId=${localStorage.getItem(
          "userId"
        )}&category=${selectedCategory}`
      );
      const fetchedImages = response.data.$values || response.data || [];
      setImages(fetchedImages);
      setFilteredImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchImages();
      setSearchTerm("");
    }
  }, [selectedCategory]);

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

    if (file && selectedCategory && imageName.trim()) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", selectedCategory);
      formData.append("userId", userId);
      formData.append("customName", imageName.trim().replace(/\s+/g, "_"));

      try {
        await api.post("/images/upload-private", formData);
        alert("Imagen subida exitosamente.");
        setIsPreviewOpen(false);
        setFile(null);
        setPreviewUrl(null);
        setImageName("");
        fetchImages();
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Error al subir la imagen.");
      }
    }
  };

  return {
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
  };
};

export default useImageSelector;
