// src/styles/AddRoutineFormStyles.ts

import { CSSProperties } from "react";

const AddRoutineFormStyles: Record<string, CSSProperties> = {
  formContainer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "1000px",
    minWidth: "300px",
    margin: "0 auto",
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
  textarea: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#555",
    color: "#fff",
    resize: "vertical",
  },
  select: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#555",
    color: "#fff",
  },
  dayContainer: {
    backgroundColor: "#444",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  dayHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtitle: {
    color: "#ffcc00",
    fontSize: "1.2rem",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "0.3rem 0.6rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  groupContainer: {
    padding: "0.5rem",
    borderRadius: "4px",
    backgroundColor: "#555",
    marginTop: "0.5rem",
  },
  groupHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupTitle: {
    fontWeight: "bold",
    color: "#ffcc00",
  },
  exerciseContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "0.5rem",
  },
  exerciseLabel: {
    color: "#ffcc00",
    fontSize: "0.9rem",
    fontWeight: "bold",
    marginBottom: "0.3rem",
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
  addButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
};

export default AddRoutineFormStyles;
