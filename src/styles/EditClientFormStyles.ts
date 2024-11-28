// src/styles/EditClientFormStyles.ts
import { CSSProperties } from "react";

const EditClientFormStyles: Record<string, CSSProperties> = {
  formContainer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    width: "500px",
    margin: "0 auto",
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
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
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    marginTop: "1rem",
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
};

export default EditClientFormStyles;
