// src/styles/AddDietFormStyles.ts
import { CSSProperties } from "react";

const AddDietFormStyles: Record<string, CSSProperties> = {
  formContainer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  title: {
    color: "#ffcc00",
    textAlign: "center",
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "1rem",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  dayContainer: {
    backgroundColor: "#444",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "0.5rem",
  },
  alimentoContainer: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "0.5rem",
    alignItems: "center",
  },
  subtitle: {
    color: "#ffcc00",
    fontSize: "1.2rem",
  },
  label: {
    color: "#ffcc00",
    fontWeight: "bold",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#555",
    color: "#fff",
  },
  inputTime: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#555",
    color: "#fff",
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 5,
    height: 16,
    width: 170, // Igualar el ancho al resto de los inputs
  },
  textarea: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#555",
    color: "#fff",
    resize: "vertical",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    marginTop: "1rem",
  },
  addButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.5rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "#ffcc00",
    color: "#000",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1,
  },
  cancelButton: {
    backgroundColor: "#bbb",
    color: "#333",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1,
  },
  removeButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "0.5rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AddDietFormStyles;
