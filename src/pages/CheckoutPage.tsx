import React from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";

const CheckoutPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("planId");

  const handleCheckout = async () => {
    if (!planId) {
      alert("No se especificó un plan. Por favor, selecciona un plan primero.");
      return;
    }

    try {
      const { data } = await api.post("/Stripe/create-checkout-session", {
        planId: parseInt(planId),
      });
      window.location.href = data.url; // Redirige al checkout de Stripe
    } catch (error) {
      console.error("Error al iniciar el checkout:", error);
      alert("Error al iniciar el checkout. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Membresía CoachPrime</h1>
      <p>Suscríbete ahora para acceder a todas las funcionalidades.</p>
      <button
        style={{
          backgroundColor: "#ffcc00",
          color: "#000",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleCheckout}
        disabled={!planId}
      >
        Suscribirse
      </button>
      {!planId && (
        <p style={{ color: "red", marginTop: "10px" }}>
          Error: No se especificó un plan. Por favor, selecciona un plan
          primero.
        </p>
      )}
    </div>
  );
};

export default CheckoutPage;
