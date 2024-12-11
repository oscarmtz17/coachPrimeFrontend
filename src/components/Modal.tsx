// src/components/Modal.tsx
import React from "react";
import modalStyles from "../styles/ModalStyles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        {/* <button onClick={onClose} style={modalStyles.closeButton}>
          X
        </button> */}
        <div style={modalStyles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
