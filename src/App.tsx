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
import CheckoutPage from "./pages/CheckoutPage";

console.log("credential", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const stripePromise = loadStripe(
  "pk_test_51QQIQmBZAdKqouiVzQTmjaEecyel6ffPBbP67sDdiX2HKbMVVCWiPLTAFtTQ5l68cBXYeDpMCLgmD5QgO7fc6uqo000f9sq9mH"
);

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
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<h1>Pago Exitoso</h1>} />
          <Route path="/cancel" element={<h1>Pago Cancelado</h1>} />
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
