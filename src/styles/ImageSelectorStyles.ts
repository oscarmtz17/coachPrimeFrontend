// src/styles/ImageSelectorStyles.ts
import { CSSProperties } from "react";

const ImageSelectorStyles = {
  container: {
    textAlign: "center",
  } as CSSProperties,

  title: {
    textAlign: "center",
    color: "#ffcc00",
  } as CSSProperties,

  advestise: {
    backgroundColor: "#555",
    padding: "0.5rem",
    borderRadius: "4px",
    color: "#ffcc00",
    marginBottom: "1rem",
    fontSize: "0.9rem",
    textAlign: "center",
  } as CSSProperties,

  select: {
    display: "inline-block",
    margin: "0 auto",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#555",
    color: "#fff",
    marginRight: "10px",
  } as CSSProperties,

  uploadButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.5rem",
    borderRadius: "4px",
    cursor: "pointer",
  } as CSSProperties,

  searchContainer: {
    marginTop: "10px",
    textAlign: "center",
  } as CSSProperties,

  searchInput: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "80%",
    backgroundColor: "#555",
    color: "#fff",
    marginBottom: "10px",
  } as CSSProperties,

  fileInput: {
    display: "none",
  } as CSSProperties,

  imageGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginTop: "20px",
  } as CSSProperties,

  imageContainer: {
    textAlign: "center",
  } as CSSProperties,

  image: {
    width: "100px",
    height: "100px",
    cursor: "pointer",
  } as CSSProperties,

  imageName: {
    color: "#ffcc00",
    fontSize: "0.9rem",
  } as CSSProperties,

  modalContent: {
    textAlign: "center",
  } as CSSProperties,

  modalTitle: {
    color: "#ffcc00",
  } as CSSProperties,

  modalImageContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  } as CSSProperties,

  modalImage: {
    width: "150px",
    height: "150px",
  } as CSSProperties,

  modalInput: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "80%",
    backgroundColor: "#555",
    color: "#fff",
    marginBottom: "10px",
  } as CSSProperties,

  modalButton: {
    color: "#fff",
    padding: "0.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  } as CSSProperties,

  modalCancelButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "0.5rem",
    borderRadius: "4px",
    cursor: "pointer",
  } as CSSProperties,
};

export default ImageSelectorStyles;
