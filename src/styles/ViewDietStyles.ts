// src/styles/ViewDietStyles.ts
import { CSSProperties } from "react";

const ViewDietStyles: Record<string, CSSProperties> = {
  background: {
    backgroundColor: "#222",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  container: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    maxWidth: "800px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  title: {
    color: "#ffcc00",
    fontSize: "1.8rem",
    textAlign: "center",
    marginBottom: "1rem",
  },
  description: {
    color: "#bbb",
    fontSize: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  downloadButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "#ffcc00",
    color: "#000",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },
  mealContainer: {
    backgroundColor: "#444",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  mealTitle: {
    color: "#ffcc00",
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  },
  mealSubtitle: {
    color: "#bbb",
    fontSize: "1rem",
    marginBottom: "0.5rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1rem",
  },
  tableHeader: {
    backgroundColor: "#555",
    color: "#ffcc00",
    padding: "0.5rem",
    textAlign: "left",
  },
  tableRow: {
    borderBottom: "1px solid #666",
  },
  tableCell: {
    padding: "0.5rem",
    color: "#fff",
  },
  notesTitle: {
    color: "#ffcc00",
    fontSize: "1.2rem",
    marginTop: "1rem",
  },
  notes: {
    color: "#bbb",
    fontSize: "1rem",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "1rem",
  },
};

export default ViewDietStyles;
