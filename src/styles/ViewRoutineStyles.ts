// src/styles/ViewRoutineStyles.ts
import { CSSProperties } from "react";

const ViewRoutineStyles: Record<string, CSSProperties> = {
  background: {
    backgroundColor: "#222",
    minHeight: "100vh",
    paddingTop: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "800px",
    width: "100%",
  },
  title: {
    color: "#ffcc00",
    fontSize: "1.8rem",
    textAlign: "center",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1rem",
    color: "#ddd",
    marginBottom: "1rem",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "1rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  dayContainer: {
    marginBottom: "1.5rem",
  },
  dayTitle: {
    color: "#ffcc00",
    fontSize: "1.4rem",
    marginBottom: "0.5rem",
  },
  groupContainer: {
    backgroundColor: "#444",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  groupTitle: {
    fontSize: "1.2rem",
    color: "#ffcc00",
    marginBottom: "0.5rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1rem",
  },
  headerRow: {
    backgroundColor: "#555",
    color: "#ffcc00",
    textAlign: "center",
  },
  row: {
    textAlign: "center",
    borderBottom: "1px solid #666",
  },
  cell: {
    padding: "0.8rem",
    color: "#fff",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  noImage: {
    color: "#aaa",
    fontStyle: "italic",
  },
};

// Función para el estilo del botón de acción, con color de fondo personalizado
export const actionButtonStyle = (bgColor: string): CSSProperties => ({
  backgroundColor: bgColor,
  color: "#fff",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.9rem",
});

export default ViewRoutineStyles;
