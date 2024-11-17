import { useState, useEffect } from "react";
import api from "../services/api";

interface Progress {
  progresoId: number;
  fechaRegistro: string;
  pesoKg: number;
  estaturaCm: number;
  nivelActividad: string;
  factorActividad: number;
  cinturaCm: number;
  caderaCm: number;
  pechoCm: number;
  brazoCm: number;
  piernaCm: number;
  notas: string;
}

const useEditProgressForm = (
  clienteId: number,
  progress: Progress,
  onSave: () => void,
  onClose: () => void
) => {
  const [formData, setFormData] = useState<Progress>(progress);
  const [existingImages, setExistingImages] = useState<string[]>([]); // Imágenes existentes
  const [newImages, setNewImages] = useState<File[]>([]); // Nuevas imágenes a subir
  const [error, setError] = useState<string | null>(null);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]); // Lista de imágenes a eliminar

  // Cargar imágenes existentes al iniciar
  useEffect(() => {
    const fetchExistingImages = async () => {
      try {
        const response = await api.get(
          `/images/list-progress-images/${clienteId}/${progress.progresoId}`
        );
        setExistingImages(response.data.images.$values || []);
      } catch (err) {
        console.error("Error al cargar las imágenes existentes:", err);
        setError("No se pudieron cargar las imágenes existentes.");
      }
    };

    fetchExistingImages();
  }, [clienteId, progress.progresoId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: [
        "pesoKg",
        "estaturaCm",
        "factorActividad",
        "cinturaCm",
        "caderaCm",
        "pechoCm",
        "brazoCm",
        "piernaCm",
      ].includes(name)
        ? Math.max(1, parsedValue)
        : value,
    }));
  };

  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const totalImages = existingImages.length + newImages.length + files.length;
    if (totalImages > 10) {
      setError("El progreso no puede tener más de 10 imágenes.");
      return;
    }

    setNewImages((prev) => [...prev, ...Array.from(files)]);
    setError(null); // Limpiar error en caso de éxito
  };

  const handleRemoveImage = (index: number, isExisting: boolean) => {
    if (isExisting) {
      const imageKey = existingImages[index];

      // Agregar la imagen a la lista de eliminaciones pendientes
      setImagesToDelete((prev) => [...prev, imageKey]);

      // Eliminar visualmente la imagen de la lista
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setNewImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    try {
      const totalImages = existingImages.length + newImages.length;
      if (totalImages > 10) {
        setError("El progreso no puede tener más de 10 imágenes.");
        return;
      }

      // Actualiza el progreso en el backend
      await api.put(`/progreso/${clienteId}/${formData.progresoId}`, formData);

      // Si hay imágenes para eliminar, enviar solo los keys al backend
      console.log("imagesToDeletefuera: ", imagesToDelete);
      if (imagesToDelete.length > 0) {
        const keysToDelete = imagesToDelete.map((url) => {
          const keyStart = url.indexOf("private/"); // Encuentra el inicio del key
          const keyEnd = url.indexOf("?"); // Encuentra el inicio de los parámetros
          return url.substring(keyStart, keyEnd); // Extrae solo el key sin los parámetros
        });

        console.log(
          "URL: ",
          `/images/delete-progress-images/${clienteId}/${formData.progresoId}`
        );
        console.log("Payload enviado: ", { imagesToDelete: keysToDelete });

        await api.delete(
          `/images/delete-progress-images/${clienteId}/${formData.progresoId}`,
          {
            data: { imagesToDelete: keysToDelete },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setImagesToDelete([]); // Limpiar la lista de eliminaciones
      }

      // Si hay nuevas imágenes, subirlas al backend
      if (newImages.length > 0) {
        const imageFormData = new FormData();
        newImages.forEach((image) => imageFormData.append("files", image));

        await api.post(
          `/images/upload-progress-images/${clienteId}/${formData.progresoId}`,
          imageFormData
        );
      }

      onSave();
      onClose();
    } catch (err) {
      console.error("Error al guardar los cambios:", err);
      setError("No se pudieron guardar los cambios.");
    }
  };

  return {
    formData,
    existingImages,
    newImages,
    error,
    handleChange,
    handleAddImages,
    handleRemoveImage,
    handleSave,
  };
};

export default useEditProgressForm;
