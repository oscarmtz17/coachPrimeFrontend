import { CSSProperties } from "react";

const RegisterStyles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#222",
    color: "#fff",
  },
  formContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "2rem",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "1000px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    textAlign: "center" as "center", // Ajuste para cumplir con los tipos
  },
  title: {
    marginBottom: "1rem",
    fontSize: "1.8rem",
    color: "#ffcc00",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "1rem",
    position: "relative",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
  },
  input: {
    width: "75%",
    padding: "0.75rem",
    borderRadius: "5px",
    border: "1px solid #bbb",
    outline: "none",
    backgroundColor: "#333",
    color: "#fff",
  },
  showButton: {
    position: "absolute",
    right: "150px",
    top: "70%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#bbb",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  planContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    margin: "2rem auto",
  },
  planCard: {
    border: "1px solid yellow",
    borderRadius: "8px",
    width: "23%",
    padding: "1rem",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center" as "center", // Ajuste
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  planTitle: {
    color: "#ffcc00",
    fontSize: "1.5rem",
  },
  planPrice: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  planDescription: {
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.2rem",
    cursor: "pointer",
    // maxWidth: "50%",
    alignSelf: "center",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
  },
  success: {
    color: "green",
    fontSize: "0.9rem",
  },
};

export default RegisterStyles;
