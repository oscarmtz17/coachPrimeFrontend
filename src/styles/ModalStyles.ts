// src/styles/ModalStyles.ts
import { CSSProperties } from "react";

const ModalStyles = {
  overlay: {
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
  } as CSSProperties,

  content: {
    position: "relative",
    backgroundColor: "#333",
    color: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    maxWidth: "800px",
    width: "100%",
    maxHeight: "80vh",
    overflow: "hidden",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  } as CSSProperties,

  body: {
    maxHeight: "calc(80vh - 40px)",
    overflowY: "auto",
    paddingRight: "0.5rem",
    scrollbarWidth: "thin",
    scrollbarColor: "#ffcc00 #333",
  } as CSSProperties,

  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    color: "#ffcc00",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
  } as CSSProperties,
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

export default ModalStyles;
