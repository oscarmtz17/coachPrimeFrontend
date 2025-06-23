import React from "react";
import { useNavigate } from "react-router-dom";

const CancelPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark text-primary p-4">
      <h1 className="text-3xl font-bold mb-4 text-primary">Pago Cancelado</h1>
      <p className="mb-8 text-center text-white max-w-md">
        Parece que no completaste el pago. Si deseas intentarlo nuevamente,
        regresa al registro para seleccionar tu plan.
      </p>
      <button
        onClick={handleGoToRegister}
        className="bg-primary text-black px-8 py-3 rounded-md text-lg font-semibold cursor-pointer transition-colors border-none hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
      >
        Volver a Registro
      </button>
    </div>
  );
};

export default CancelPage;
