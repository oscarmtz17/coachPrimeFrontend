import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../services/api";

export const useRegister = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<number>(1);

  const navigate = useNavigate();

  const isFormValid =
    nombre && apellido && email && password && confirmPassword && phone;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden. Por favor, verifica.");
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        nombre,
        apellido,
        email,
        password,
        phone,
        planId: selectedPlan, // Plan seleccionado enviado al backend
      };

      const response = await api.post("/auth/register", requestData);

      if (selectedPlan === 1) {
        // Plan Básico: redirigir al login
        setSuccessMessage("Registro exitoso. Redirigiendo al login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        // Planes de pago: redirigir a Stripe Checkout
        const { checkoutUrl } = response.data;
        if (checkoutUrl) {
          setSuccessMessage("Redirigiendo al pago...");
          setTimeout(() => {
            window.location.href = checkoutUrl;
          }, 2000);
        } else {
          throw new Error(
            "No se pudo obtener la URL de Stripe Checkout. Por favor, inténtalo nuevamente."
          );
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data || "Ocurrió un error al registrarse.");
      } else {
        setError(
          "Error al registrarse o al iniciar el proceso de pago. Por favor intenta de nuevo."
        );
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordBlur = () => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (password && password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
    } else {
      setPasswordError(null);
    }
  };

  const handlePlanSelection = (planId: number) => {
    setSelectedPlan(planId);
  };

  return {
    nombre,
    apellido,
    email,
    password,
    confirmPassword,
    phone,
    selectedPlan,
    error,
    successMessage,
    isFormValid,
    showPassword,
    showConfirmPassword,
    passwordError,
    setNombre,
    setApellido,
    setEmail,
    setPassword,
    setConfirmPassword,
    setPhone,
    setShowPassword,
    setShowConfirmPassword,
    handleRegister,
    handlePlanSelection,
    handlePasswordBlur,
    handleConfirmPasswordBlur,
    loading,
  };
};
