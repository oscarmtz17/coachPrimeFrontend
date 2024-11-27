// src/styles/ClientListStyles.ts
import { CSSProperties } from "react";

const ClientListStyles: Record<string, CSSProperties> = {
  container: {
    padding: "2rem",
    paddingRight: "2rem",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "2000px", // Limita el ancho máximo en pantallas grandes
    boxSizing: "border-box",
    overflowX: "auto", // Solo permite scroll horizontal si es necesario
    overflowY: "hidden", // Evita scroll vertical
    minHeight: "100%", // Asegura que ocupe toda la altura disponible
  },
  title: {
    color: "#ffcc00",
    fontSize: "2.5rem",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  searchInput: {
    marginBottom: "1rem",
    padding: "0.5rem",
    width: "100%",
    maxWidth: "600px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  buttonContainer: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  addButton: {
    backgroundColor: "#ffcc00",
    color: "#000",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "0.5rem",
  },
  refreshButton: {
    backgroundColor: "#bbb",
    color: "#333",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    borderRadius: "5px",
  },
  table: {
    width: "100%",
    minWidth: "1000px", // Garantiza que no se comprima en pantallas pequeñas
    borderCollapse: "collapse",
    backgroundColor: "#444",
    borderRadius: "10px",
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#222",
    color: "#ffcc00",
    textAlign: "center",
  },
  tableRow: {
    borderBottom: "1px solid #555",
    textAlign: "center",
  },
  tableCell: {
    padding: "10px 15px",
    textAlign: "center",
  },
  actionButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  buttonGroup: {
    display: "flex",
    gap: "0.5rem",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flex: "1",
    padding: "0.5rem",
    fontSize: "0.9rem",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    border: "none",
    maxWidth: "150px",
    minWidth: "100px",
  },
};

export const buttonStyle = (bgColor: string, color: string): CSSProperties => ({
  backgroundColor: bgColor,
  color: color,
  border: "none",
  padding: "0.5rem",
  margin: "0.2rem",
  borderRadius: "3px",
  cursor: "pointer",
  width: "auto",
});

export default ClientListStyles;
