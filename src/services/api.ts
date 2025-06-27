// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5267/api",
});

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token, refreshToken, userId } = response.data;

    if (token && refreshToken && userId) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userId); // Guardar el userId
      console.log("Login exitoso: Tokens y userId almacenados en localStorage");
    } else {
      console.error("Tokens o userId faltantes en la respuesta de login");
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
            AccessToken: accessToken,
            RefreshToken: refreshToken,
          }
        );

        const { token: newAccessToken, refreshToken: newRefreshToken } =
          response.data;

        if (newAccessToken && newRefreshToken) {
          // console.log("Nuevo access token obtenido:", newAccessToken);
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        } else {
          console.error("Tokens faltantes en la respuesta de refresh");
          clearAuthData();
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error al refrescar el token:", error);
        clearAuthData();
        window.location.href = "/login";
      }
    } else if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas de error
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Error 401 - Token expirado o inválido");
      clearAuthData();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Función para limpiar datos de autenticación
function clearAuthData() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
}

// Verifica si el token está por expirar (menos de 1 hora de vigencia)
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
    return expirationTime - currentTime < 60 * 60 * 1000; // Refrescar si quedan menos de 1 hora
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return true; // Forzar el refresh si el token es inválido
  }
}

export const sendPasswordReset = async (email: string) => {
  const response = await axios.post(
    `${api.defaults.baseURL}/auth/forgot-password`,
    { email }
  );
  return response.data;
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  const response = await axios.post(
    `${api.defaults.baseURL}/auth/reset-password`,
    {
      token,
      newPassword,
    }
  );
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      await api.post(
        "/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  } finally {
    clearAuthData();
  }
};

export default api;
