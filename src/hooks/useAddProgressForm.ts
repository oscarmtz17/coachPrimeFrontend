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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const markAsDirty = () => setIsFormDirty(true);

  const handleSaveProgress = async () => {
    if (isSubmitting) return; // Prevenir múltiples envíos

    setIsSubmitting(true); // Deshabilitar el botón
    try {
      // Paso 1: Enviar los datos del progreso
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

      const progressResponse = await api.post(
        `/progreso/${clienteId}`,
        progresoData
      );

      const progresoId = progressResponse.data.progresoId; // Obtener el progresoId de la respuesta
      if (!progresoId) {
        throw new Error("No se pudo obtener el progresoId.");
      }

      // Paso 2: Si hay imágenes seleccionadas, subirlas al backend
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("files", image);
        });

        // Usar el progresoId para crear una carpeta específica
        formData.append(
          "progressDate",
          `${new Date().toISOString().split("T")[0]}_${progresoId}`
        );

        await api.post(
          `/images/upload-progress-images/${clienteId}/${progresoId}`,
          formData
        );

        alert("Progreso y fotos guardados exitosamente.");
      } else {
        alert("Progreso guardado exitosamente.");
      }

      // Limpiar formulario
      onProgressAdded();
      onClose();
    } catch (error) {
      console.error("Error al guardar el progreso o las imágenes:", error);
      setError("Hubo un error al guardar el progreso o las imágenes.");
    } finally {
      setIsSubmitting(false); // Habilitar el botón después de finalizar la solicitud
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length + images.length <= 10) {
      setImages([...images, ...Array.from(selectedFiles)]);
      markAsDirty();
    } else {
      setError("Puedes subir un máximo de 10 imágenes.");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    markAsDirty();
  };

  const handlePositiveInputChange =
    (
      setter:
        | React.Dispatch<React.SetStateAction<number>>
        | ((value: number) => void)
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(1, Number(event.target.value));
      setter(value);
      markAsDirty();
    };

  const handleCloseWithConfirmation = () => {
    if (isFormDirty) {
      const confirmClose = window.confirm(
        "Si cierras el formulario sin guardar, se perderán los cambios. ¿Deseas continuar?"
      );
      if (confirmClose) {
        onClose();
      }
    } else {
      onClose();
    }
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
    isSubmitting,
    handleImageUpload,
    handleRemoveImage,
    setPesoKg: (value: number) => {
      setPesoKg(value);
      markAsDirty();
    },
    setEstaturaCm: (value: number) => {
      setEstaturaCm(value);
      markAsDirty();
    },
    setNivelActividad: (value: string) => {
      setNivelActividad(value);
      markAsDirty();
    },
    setFactorActividad: (value: number) => {
      setFactorActividad(value);
      markAsDirty();
    },
    setCinturaCm: (value: number) => {
      setCinturaCm(value);
      markAsDirty();
    },
    setCaderaCm: (value: number) => {
      setCaderaCm(value);
      markAsDirty();
    },
    setPechoCm: (value: number) => {
      setPechoCm(value);
      markAsDirty();
    },
    setBrazoCm: (value: number) => {
      setBrazoCm(value);
      markAsDirty();
    },
    setPiernaCm: (value: number) => {
      setPiernaCm(value);
      markAsDirty();
    },
    setNotas: (value: string) => {
      setNotas(value);
      markAsDirty();
    },
    handleSaveProgress,
    handlePositiveInputChange,
    handleCloseWithConfirmation,
  };
};

export default useAddProgressForm;
