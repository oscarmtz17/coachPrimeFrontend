// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api, { logoutUser } from "../services/api";

interface User {
  id: number;
  nombre: string;
  apellido?: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (token: string, refreshToken: string, userId: number) => void;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await api.get("/auth/current-user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCurrentUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsAuthenticated(false);
          setCurrentUser(null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userId");
        }
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  const login = (token: string, refreshToken: string, userId: number) => {
    setIsAuthenticated(true);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", userId.toString());
    api
      .get("/auth/current-user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCurrentUser(response.data))
      .catch((error) => {
        console.error("Error fetching user data after login:", error);
      });
  };

  const logout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
