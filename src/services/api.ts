// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5267/api",
});

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token, refreshToken } = response.data;

    if (token && refreshToken) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken);
      console.log("Login exitoso: Tokens almacenados en localStorage");
    } else {
      console.error("Tokens faltantes en la respuesta de login");
    }

    return response.data;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

// Interceptor para manejar el refresco de tokens
api.interceptors.request.use(
  async (config) => {
    console.log("interceptor"); // Este mensaje debería aparecer en cada petición

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && isTokenExpiring(accessToken)) {
      try {
        console.log(
          "Token expira pronto, solicitando un nuevo access token..."
        );

        const response = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {
            accessToken,
            refreshToken,
          }
        );

        const { token: newAccessToken, refreshToken: newRefreshToken } =
          response.data;

        if (newAccessToken && newRefreshToken) {
          console.log("Nuevo access token obtenido:", newAccessToken);
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        } else {
          console.error("Tokens faltantes en la respuesta de refresh");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error al refrescar el token:", error);
        window.location.href = "/login";
      }
    } else if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Verifica si el token está por expirar (menos de 3 minutos de vigencia)
function isTokenExpiring(token: string): boolean {
  try {
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = tokenData.exp * 1000;
    const currentTime = Date.now();

    console.log(
      "Tiempo restante para el token:",
      expirationTime - currentTime,
      "ms"
    );
    return expirationTime - currentTime < 3 * 60 * 1000; // Refrescar si quedan menos de 3 minutos
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return true; // Forzar el refresh si el token es inválido
  }
}

export default api;
