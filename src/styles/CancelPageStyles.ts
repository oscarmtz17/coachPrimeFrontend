import { CSSProperties } from "react";

const CancelPageStyles: { [key: string]: CSSProperties } = {
  container: {
    textAlign: "center",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1a1a1a", // Fondo oscuro
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff", // Texto claro
  },
  title: {
    fontSize: "2.5rem",
    color: "#ff0000", // Rojo para indicar cancelación
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1.2rem",
    color: "#bbbbbb", // Texto secundario en gris claro
    marginBottom: "2rem",
    maxWidth: "500px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#000", // Texto negro
    backgroundColor: "#ffcc00", // Amarillo principal
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#e6b800", // Amarillo más oscuro al hacer hover
  },
};

export default CancelPageStyles;
