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
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>
          X
        </button>
        <div style={modalBodyStyle}>{children}</div>
      </div>
    </div>
  );
};

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  position: "relative",
  backgroundColor: "#333",
  color: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  maxWidth: "800px", // Ancho máximo ampliado
  width: "100%",
  maxHeight: "80vh",
  overflow: "hidden",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
};

const modalBodyStyle: React.CSSProperties = {
  maxHeight: "calc(80vh - 40px)",
  overflowY: "auto",
  paddingRight: "0.5rem",
  scrollbarWidth: "thin",
  scrollbarColor: "#ffcc00 #333",
};

const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "transparent",
  color: "#ffcc00",
  border: "none",
  fontSize: "1.2rem",
  cursor: "pointer",
};

// Scrollbar styles for WebKit browsers
const customScrollbarStyles = `
  ::-webkit-scrollbar-track {
    background: #333;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ffcc00;
    border-radius: 4px;
  }
`;

// Append custom styles to the DOM
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = customScrollbarStyles;
  document.head.appendChild(styleElement);
}

export default Modal;
