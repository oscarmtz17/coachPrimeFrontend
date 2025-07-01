// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewRoutine from "./components/ViewRoutine";
import EditRoutineFormWrapper from "./components/EditRoutineFormWrapper";
import ViewDiet from "./components/ViewDiet";
import EditDietFormWrapper from "./components/EditDietFormWrapper";
import EditProgressFormWrapper from "./components/EditProgressFormWrapper";
import UserProfile from "./pages/UserProfile";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import config from "./config/environment";
import "./i18n";

const stripePromise = loadStripe(config.stripePublishableKey);

const App: React.FC = () => (
  <Elements stripe={stripePromise}>
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
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
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </Elements>
);

export default App;
