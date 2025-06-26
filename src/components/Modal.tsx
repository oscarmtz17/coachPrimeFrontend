// src/components/Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-dark p-6 rounded-xl shadow-2xl max-h-[90vh] w-auto max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-danger text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Cerrar modal"
        >
          ×
        </button>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
