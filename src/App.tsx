// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewRoutine from "./components/ViewRoutine";
import EditRoutineFormWrapper from "./components/EditRoutineFormWrapper";
import ViewDiet from "./components/ViewDiet";
import EditDietFormWrapper from "./components/EditDietFormWrapper";
import EditProgressFormWrapper from "./components/EditProgressFormWrapper"; // Importa el nuevo componente

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rutina/:rutinaId" element={<ViewRoutine />} />
          <Route path="/dieta/:clienteId/:dietaId" element={<ViewDiet />} />
          <Route
            path="/editar-rutina/:rutinaId"
            element={<EditRoutineFormWrapper />}
          />
          <Route
            path="/editar-dieta/:clienteId/:dietaId"
            element={<EditDietFormWrapper />}
          />
          <Route
            path="/editar-progreso/:clienteId/:progresoId"
            element={<EditProgressFormWrapper />}
          />{" "}
          {/* Nueva ruta para editar progreso */}
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
