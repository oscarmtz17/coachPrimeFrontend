// src/styles/RoutineListStyles.ts
import { CSSProperties } from "react";

const RoutineListStyles = {
  container: {
    backgroundColor: "#333",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "800px",
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
    margin: "0.2rem",
  }),
};

export default RoutineListStyles;
