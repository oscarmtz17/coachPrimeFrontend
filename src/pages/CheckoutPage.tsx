import React from "react";
import api from "../services/api";

const CheckoutPage: React.FC = () => {
  const handleCheckout = async () => {
    try {
      const { data } = await api.post("/Stripe/create-checkout-session");
      window.location.href = data.url; // Redirige al checkout de Stripe
    } catch (error) {
      console.error("Error al iniciar el checkout:", error);
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
      >
        Suscribirse
      </button>
    </div>
  );
};

export default CheckoutPage;
