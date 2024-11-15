// src/hooks/useAddProgressForm.ts
import { useState } from "react";
import api from "../services/api";

const useAddProgressForm = (
  clienteId: number,
  onProgressAdded: () => void,
  onClose: () => void
) => {
  const [pesoKg, setPesoKg] = useState<number>(1);
  const [estaturaCm, setEstaturaCm] = useState<number>(1);
  const [nivelActividad, setNivelActividad] = useState<string>("");
  const [factorActividad, setFactorActividad] = useState<number>(1.2);
  const [cinturaCm, setCinturaCm] = useState<number>(1);
  const [caderaCm, setCaderaCm] = useState<number>(1);
  const [pechoCm, setPechoCm] = useState<number>(1);
  const [brazoCm, setBrazoCm] = useState<number>(1);
  const [piernaCm, setPiernaCm] = useState<number>(1);
  const [notas, setNotas] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const handleSaveProgress = async () => {
    try {
      const progresoData = {
        pesoKg,
        estaturaCm,
        nivelActividad,
        factorActividad,
        cinturaCm,
        caderaCm,
        pechoCm,
        brazoCm,
        piernaCm,
        notas,
      };

      await api.post(`/progreso/${clienteId}`, progresoData);

      onProgressAdded();
      onClose();
    } catch (error) {
      console.error("Error al guardar el progreso:", error);
      setError("Hubo un error al guardar el progreso.");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length + images.length <= 10) {
      setImages([...images, ...Array.from(selectedFiles)]);
    } else {
      setError("Puedes subir un máximo de 10 imágenes.");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePositiveInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(1, Number(event.target.value));
      setter(value);
    };

  return {
    pesoKg,
    estaturaCm,
    nivelActividad,
    factorActividad,
    cinturaCm,
    caderaCm,
    pechoCm,
    brazoCm,
    piernaCm,
    notas,
    error,
    images,
    setImages,
    handleImageUpload,
    handleRemoveImage,
    setPesoKg,
    setEstaturaCm,
    setNivelActividad,
    setFactorActividad,
    setCinturaCm,
    setCaderaCm,
    setPechoCm,
    setBrazoCm,
    setPiernaCm,
    setNotas,
    handleSaveProgress,
    handlePositiveInputChange,
  };
};

export default useAddProgressForm;
