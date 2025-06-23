import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark text-primary p-4">
      <h1 className="text-3xl font-bold mb-4 text-primary">¡Pago Exitoso!</h1>
      <p className="mb-8 text-center text-white max-w-md">
        Gracias por tu registro. Tu cuenta ha sido activada exitosamente.
      </p>
      <button
        onClick={handleGoToLogin}
        className="bg-primary text-black px-8 py-3 rounded-md text-lg font-semibold cursor-pointer transition-colors border-none hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-dark"
      >
        Ir a Iniciar Sesión
      </button>
    </div>
  );
};

export default SuccessPage;
