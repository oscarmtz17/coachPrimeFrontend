import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessPageStyles from "../styles/SuccessPageStyles";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div style={SuccessPageStyles.container}>
      <h1 style={SuccessPageStyles.title}>¡Pago Exitoso!</h1>
      <p style={SuccessPageStyles.message}>
        Gracias por tu registro. Tu cuenta ha sido activada exitosamente.
      </p>
      <button
        style={{
          ...SuccessPageStyles.button,
          ...(isHovered ? SuccessPageStyles.buttonHover : {}),
        }}
        onClick={handleGoToLogin}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Ir a Iniciar Sesión
      </button>
    </div>
  );
};

export default SuccessPage;
