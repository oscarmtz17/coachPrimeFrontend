// src/styles/EditRoutineFormStyles.ts
import { CSSProperties } from "react";

const EditRoutineFormStyles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    color: "#ffcc00",
    fontSize: "1.8rem",
    textAlign: "center",
    marginBottom: "1rem",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "1rem",
  },
  success: {
    color: "green",
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
  dayTitle: {
    color: "#ffcc00",
    fontSize: "1.2rem",
  },
  subtitle: {
    color: "#ffcc00",
    fontSize: "1.2rem",
    marginTop: "1rem",
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
  addButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  saveButton: {
    backgroundColor: "#ffcc00",
    color: "#000",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#bbb",
    color: "#333",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default EditRoutineFormStyles;