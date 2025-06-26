import { useState, useEffect } from "react";
import api from "../services/api";

interface Suscripcion {
  planId: number;
  estadoSuscripcionId: number;
  plan: {
    nombre: string;
  };
  fechaFin?: string | Date;
}

export const useUserProfile = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [originalTelefono, setOriginalTelefono] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [suscripcion, setSuscripcion] = useState<Suscripcion | null>(null);
  const userId = localStorage.getItem("userId");

  // Constantes y lógica de planes
  const UPGRADE_PLANS = [
    { id: 3, nombre: "Premium", precio: "$499/mes" },
    { id: 4, nombre: "Premium Anual", precio: "$4990/año" },
  ];

  const isPremium =
    suscripcion && (suscripcion.planId === 3 || suscripcion.planId === 4);
  const isPremiumInactive =
    isPremium && ![2, 6].includes(suscripcion.estadoSuscripcionId);
  const isBasic = suscripcion && suscripcion.planId === 1;

  // Estado para el modal de upgrade y el plan hovered
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      if (!userId) {
        console.error(
          "No se ha encontrado el ID de usuario en el almacenamiento local."
        );
        return;
      }
      const response = await api.get(`/usuario/${userId}`);
      const { nombre, apellido, phone, email } = response.data;
      setNombre(nombre);
      setApellido(apellido || "");
      setTelefono(phone || "");
      setOriginalTelefono(phone || "");
      setEmail(email);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchSuscripcion = async () => {
    try {
      const response = await api.get("/Suscripcion/actual");
      setSuscripcion(response.data);
    } catch (error) {
      console.error("Error al obtener la suscripción del usuario:", error);
      // Si no se encuentra una suscripción, se asume que el usuario tiene el plan Básico.
      setSuscripcion({
        planId: 1,
        estadoSuscripcionId: 0, // Estado que representa "No suscrito"
        plan: {
          nombre: "Básico",
        },
      });
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchSuscripcion();
  }, [userId]);

  // Fetch user logo
  const fetchUserLogo = async () => {
    try {
      const response = await api.get(`/images/user-logo`, {
        params: { userId },
      });
      if (response.status === 200) {
        const logoUrl = response.data.url;
        setPreviewLogo(logoUrl);
      }
    } catch (error) {
      console.error("No se encontró un logo para el usuario:", error);
      setPreviewLogo(null);
    }
  };

  useEffect(() => {
    fetchUserLogo();
  }, []);

  // Handlers for input changes
  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNombre(e.target.value);
  const handleApellidoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setApellido(e.target.value);
  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setTelefono(value);
    }
  };

  // Editing controls
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    fetchUserData();
    setError(null);
  };

  const checkPhoneExists = async (): Promise<boolean> => {
    try {
      const response = await api.get("/usuario/check-phone", {
        params: { phone: telefono },
      });
      return response.data.exists;
    } catch (error) {
      console.error("Error checking phone:", error);
      return false;
    }
  };

  const handleSaveChanges = async () => {
    if (telefono && telefono.length !== 10) {
      setError("El número de teléfono debe tener exactamente 10 dígitos.");
      return;
    }

    if (telefono !== originalTelefono) {
      const phoneExists = await checkPhoneExists();
      if (phoneExists) {
        setError("El número de teléfono ya está registrado por otro usuario.");
        return;
      }
    }

    try {
      await api.put(`/usuario/${userId}`, {
        nombre,
        apellido,
        phone: telefono,
      });
      alert("Cambios guardados exitosamente");
      setIsEditing(false);
      setError(null);
      fetchUserData();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Hubo un error al intentar guardar los cambios");
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setLogo(file);
      setPreviewLogo(URL.createObjectURL(file));
    } else {
      alert("Por favor, seleccione un archivo en formato JPEG o PNG.");
      e.target.value = "";
    }
  };

  const handleUploadLogo = async () => {
    if (!logo) return;

    const formData = new FormData();
    formData.append("file", logo);

    try {
      const response = await api.post("/images/upload-logo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newLogoUrl = response.data.url; // Asegúrate de usar el campo correcto
      setPreviewLogo(newLogoUrl); // Actualiza la vista inmediatamente
      alert("Logo subido exitosamente.");
    } catch (error) {
      console.error("Error al subir el logo:", error);
      alert("Hubo un problema al subir el logo. Intente nuevamente.");
    }
  };

  const handleUpgradePlan = async (planId: number) => {
    try {
      const response = await api.post(
        "/stripe/create-checkout-session-for-upgrade",
        { planId }
      );
      const { url } = response.data;
      window.location.href = url;
    } catch (error) {
      console.error("Error al crear la sesión de checkout:", error);
      alert(
        "No se pudo iniciar el proceso de mejora de plan. Inténtelo de nuevo."
      );
    }
  };

  const handleManageSubscription = async () => {
    try {
      const response = await api.post("/stripe/create-portal-session");
      const { url } = response.data;
      window.location.href = url;
    } catch (error) {
      console.error("Error al crear la sesión del portal de Stripe:", error);
      alert(
        "No se pudo abrir el portal de gestión de suscripciones. Inténtelo de nuevo."
      );
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordError(null);
  };

  // Password change
  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError("Las nuevas contraseñas no coinciden.");
      return;
    }

    try {
      await api.post(`/auth/change-password`, {
        currentPassword,
        newPassword,
      });
      alert("Contraseña actualizada exitosamente");
      closeModal();
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setPasswordError(error.response.data);
      } else {
        setPasswordError(
          "Error al actualizar la contraseña. Intenta nuevamente."
        );
      }
      console.error("Error al cambiar la contraseña:", error);
    }
  };

  const togglePasswordVisibility = (
    passwordType: "current" | "new" | "confirm"
  ) => {
    if (passwordType === "current") {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (passwordType === "new") {
      setShowNewPassword(!showNewPassword);
    } else if (passwordType === "confirm") {
      setShowConfirmNewPassword(!showConfirmNewPassword);
    }
  };

  // Validar contraseñas
  const validatePasswords = () => {
    if (!newPassword || !confirmNewPassword) {
      setPasswordError("Ambos campos de contraseña son obligatorios.");
      return false;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return false;
    }
    setPasswordError(null); // Limpiar el error si las contraseñas coinciden
    return true;
  };

  // Ejecutar validación en blur
  const handleNewPasswordBlur = () => validatePasswords();
  const handleConfirmNewPasswordBlur = () => validatePasswords();

  // Utilidad para obtener el nombre del plan
  const getPlanNombre = (planId: number) => {
    switch (planId) {
      case 1:
        return "Básico";
      case 3:
        return "Premium";
      case 4:
        return "Premium Anual";
      default:
        return "Desconocido";
    }
  };

  // Utilidad para obtener el nombre del estatus
  const getEstatusNombre = (estatusId?: number) => {
    const map: Record<number, string> = {
      1: "Pendiente",
      2: "Activa",
      3: "Expirada",
      4: "Cancelada",
      5: "Suspendida",
      6: "Reactivada",
      7: "Prueba",
    };
    return estatusId ? map[estatusId] || "Desconocido" : "Desconocido";
  };

  // Utilidad para formatear fecha
  const formatFecha = (fecha?: string | Date) => {
    if (!fecha) return null;
    const dateObj = typeof fecha === "string" ? new Date(fecha) : fecha;
    return dateObj.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return {
    UPGRADE_PLANS,
    isPremium,
    isPremiumInactive,
    isBasic,
    nombre,
    apellido,
    telefono,
    email,
    logo,
    previewLogo,
    error,
    isEditing,
    isModalOpen,
    passwordError,
    currentPassword,
    newPassword,
    confirmNewPassword,
    showCurrentPassword,
    showNewPassword,
    showConfirmNewPassword,
    suscripcion,
    handleManageSubscription,
    handleUpgradePlan,
    handleNombreChange,
    handleApellidoChange,
    handleTelefonoChange,
    handleEdit,
    handleCancel,
    handleSaveChanges,
    handleLogoChange,
    handleUploadLogo,
    openModal,
    closeModal,
    handleChangePassword,
    togglePasswordVisibility,
    setCurrentPassword,
    setNewPassword,
    setConfirmNewPassword,
    setShowConfirmNewPassword,
    setShowCurrentPassword,
    setShowNewPassword,
    handleNewPasswordBlur,
    handleConfirmNewPasswordBlur,
    validatePasswords,
    getPlanNombre,
    getEstatusNombre,
    formatFecha,
    isUpgradeModalOpen,
    setIsUpgradeModalOpen,
    hoveredPlan,
    setHoveredPlan,
  };
};
