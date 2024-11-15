// src/styles/AddProgressFormStyles.ts
import { CSSProperties } from "react";

const AddProgressFormStyles = {
  /* estilos previos */
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

  fileInput: {
    display: "block",
    marginBottom: "0.8rem",
  } as CSSProperties,

  imageLimitText: {
    color: "#ffcc00",
    fontSize: "0.9rem",
    marginBottom: "0.8rem",
  } as CSSProperties,

  imagePreviewContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "0.8rem",
  } as CSSProperties,

  imagePreview: {
    position: "relative",
    width: "60px",
    height: "60px",
  } as CSSProperties,

  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "4px",
  } as CSSProperties,

  removeImageButton: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    backgroundColor: "#ff0000",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    padding: "2px 5px",
    fontSize: "0.8rem",
  } as CSSProperties,
};

export default AddProgressFormStyles;
