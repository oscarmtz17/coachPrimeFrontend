// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5267/api", // Cambia esto según tu URL de backend
});

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    console.log(response.data);

    return response.data; // Debería devolver el token o la respuesta del backend
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

export default api;
