import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CancelPageStyles from "../styles/CancelPageStyles";

const CancelPage: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleGoToRegister = () => {
    navigate("/register");
  };

  return (
    <div style={CancelPageStyles.container}>
      <h1 style={CancelPageStyles.title}>Pago Cancelado</h1>
      <p style={CancelPageStyles.message}>
        Parece que no completaste el pago. Si deseas intentarlo nuevamente,
        regresa al registro para seleccionar tu plan.
      </p>
      <button
        style={{
          ...CancelPageStyles.button,
          ...(isHovered ? CancelPageStyles.buttonHover : {}),
        }}
        onClick={handleGoToRegister}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Volver a Registro
      </button>
    </div>
  );
};

export default CancelPage;
