// src/styles/EditProgressFormStyles.ts
import { CSSProperties } from "react";

const EditProgressFormStyles = {
  container: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
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

  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
  } as CSSProperties,

  label: {
    color: "#ffcc00",
    fontWeight: "bold",
  } as CSSProperties,

  input: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#555",
    color: "#fff",
  } as CSSProperties,

  textarea: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#555",
    color: "#fff",
    resize: "vertical",
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
  imageSection: {
    marginTop: "1rem",
  } as CSSProperties,

  imageContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  } as CSSProperties,

  imageWrapper: {
    position: "relative",
  } as CSSProperties,

  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "4px",
    border: "1px solid #ccc",
  } as CSSProperties,

  removeButton: {
    position: "absolute",
    top: "0",
    right: "0",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "0.8rem",
    width: "20px",
    height: "20px",
  } as CSSProperties,
};

export default EditProgressFormStyles;
