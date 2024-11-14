// src/styles/ClientListStyles.ts
import { CSSProperties } from "react";

const ClientListStyles: Record<string, CSSProperties> = {
  container: {
    padding: "2rem",
    backgroundColor: "#333",
    color: "#fff",
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
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#333",
    color: "#ffcc00",
  },
  tableRow: {
    borderBottom: "1px solid #555",
    textAlign: "center",
  },
  actionButtonContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
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
