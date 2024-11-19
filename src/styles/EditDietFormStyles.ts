// src/styles/EditDietFormStyles.ts
import { CSSProperties } from "react";

const EditDietFormStyles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    maxWidth: "700px",
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
  inputContainer: {
    marginBottom: "1rem",
  },
  label: {
    color: "#ffcc00",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#555",
    color: "#fff",
    marginTop: "0.3rem",
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
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#555",
    color: "#fff",
    resize: "vertical",
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
  },
  foodContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "0.5rem",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "0.3rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginTop: "0.3rem",
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
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#bbb",
    color: "#333",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default EditDietFormStyles;
