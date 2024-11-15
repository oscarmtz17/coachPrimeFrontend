// src/styles/AddProgressFormStyles.ts
import { CSSProperties } from "react";

const AddProgressFormStyles = {
  formContainer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
    margin: "0 auto",
  } as CSSProperties,

  title: {
    color: "#ffcc00",
    textAlign: "center",
    fontSize: "1.8rem",
    marginBottom: "1rem",
  } as CSSProperties,

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "1rem",
  } as CSSProperties,

  label: {
    color: "#ffcc00",
    fontWeight: "bold",
    display: "block",
    marginTop: "0.8rem",
  } as CSSProperties,

  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#555",
    color: "#fff",
    marginBottom: "0.8rem",
  } as CSSProperties,

  select: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#555",
    color: "#fff",
    marginBottom: "0.8rem",
  } as CSSProperties,

  textarea: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#555",
    color: "#fff",
    resize: "vertical",
    marginBottom: "0.8rem",
  } as CSSProperties,

  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    marginTop: "1rem",
  } as CSSProperties,

  saveButton: {
    backgroundColor: "#ffcc00",
    color: "#000",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1,
  } as CSSProperties,

  cancelButton: {
    backgroundColor: "#bbb",
    color: "#333",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1,
  } as CSSProperties,
};

export default AddProgressFormStyles;
