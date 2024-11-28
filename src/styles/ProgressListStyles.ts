// src/styles/ProgressListStyles.ts
import { CSSProperties } from "react";

const ProgressListStyles = {
  container: {
    backgroundColor: "#333",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "1800px",
    margin: "0 auto",
  } as CSSProperties,

  title: {
    color: "#ffcc00",
    fontSize: "1.8rem",
    textAlign: "center",
    marginBottom: "1rem",
  } as CSSProperties,

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "1rem",
  } as CSSProperties,

  loading: {
    color: "#ffcc00",
    textAlign: "center",
    fontSize: "1.2rem",
  } as CSSProperties,

  noData: {
    color: "#ffcc00",
    textAlign: "center",
    fontSize: "1.2rem",
  } as CSSProperties,

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1rem",
  } as CSSProperties,

  headerRow: {
    backgroundColor: "#555",
    color: "#ffcc00",
    textAlign: "center",
  } as CSSProperties,

  row: {
    textAlign: "center",
    borderBottom: "1px solid #666",
  } as CSSProperties,

  cell: {
    padding: "0.8rem",
    color: "#fff",
  } as CSSProperties,

  actionCell: {
    display: "flex",
    gap: "0.5rem",
    justifyContent: "center",
  } as CSSProperties,

  closeButton: {
    backgroundColor: "#bbb",
    color: "#333",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
  } as CSSProperties,

  actionButton: (bgColor: string): CSSProperties => ({
    backgroundColor: bgColor,
    color: "#fff",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginTop: "0.3rem",
  }),

  // Estilo del contenedor del modal
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    backgroundColor: "#333",
    color: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
  } as CSSProperties,

  // Estilo del contenedor de las miniaturas de imágenes
  imageContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
    marginTop: "1rem",
  } as CSSProperties,

  // Estilo de cada miniatura de imagen
  thumbnail: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
  } as CSSProperties,
};

export default ProgressListStyles;
