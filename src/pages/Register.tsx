import React from "react";
import RegisterStyles from "../styles/RegisterStyles";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const {
    nombre,
    apellido,
    email,
    password,
    confirmPassword,
    phone,
    selectedPlan,
    error,
    successMessage,
    isFormValid,
    showPassword,
    showConfirmPassword,
    passwordError,
    setNombre,
    setApellido,
    setEmail,
    setPassword,
    setConfirmPassword,
    setPhone,
    setShowPassword,
    setShowConfirmPassword,
    handleRegister,
    handlePlanSelection,
    handlePasswordBlur,
    handleConfirmPasswordBlur,
    loading,
  } = useRegister();

  const navigate = useNavigate();

  return (
    <div style={RegisterStyles.container}>
      <div style={RegisterStyles.formContainer}>
        <h2 style={RegisterStyles.title}>Registrarse</h2>
        <form onSubmit={handleRegister} style={RegisterStyles.form}>
          {/* Nombre */}
          <div style={RegisterStyles.inputGroup}>
            <label htmlFor="nombre" style={RegisterStyles.label}>
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              style={RegisterStyles.input}
            />
          </div>

          {/* Apellido */}
          <div style={RegisterStyles.inputGroup}>
            <label htmlFor="apellido" style={RegisterStyles.label}>
              Apellido
            </label>
            <input
              id="apellido"
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              style={RegisterStyles.input}
            />
          </div>

          {/* Email */}
          <div style={RegisterStyles.inputGroup}>
            <label htmlFor="email" style={RegisterStyles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={RegisterStyles.input}
            />
          </div>

          {/* Teléfono */}
          <div style={RegisterStyles.inputGroup}>
            <label htmlFor="phone" style={RegisterStyles.label}>
              Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                setPhone(numericValue);
              }}
              required
              style={RegisterStyles.input}
            />
          </div>

          {/* Contraseña */}
          <div style={RegisterStyles.inputGroup}>
            <label htmlFor="password" style={RegisterStyles.label}>
              Contraseña
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              required
              style={RegisterStyles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={RegisterStyles.showButton}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          {/* Confirmar Contraseña */}
          <div style={RegisterStyles.inputGroup}>
            <label htmlFor="confirmPassword" style={RegisterStyles.label}>
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={handleConfirmPasswordBlur}
              required
              style={RegisterStyles.input}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={RegisterStyles.showButton}
            >
              {showConfirmPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <div>
            {passwordError && (
              <small style={RegisterStyles.error}>{passwordError}</small>
            )}
          </div>

          {/* Planes */}
          <h2 style={{ marginBottom: 0 }}>Selecciona Tu Plan</h2>
          <div style={RegisterStyles.planContainer}>
            {[
              {
                nombre: "Básico",
                precio: "$0",
                descripcion: "Hasta 3 clientes",
                id: 1,
              },
              {
                nombre: "Premium",
                precio: "$499",
                descripcion: "Clientes ilimitados",
                id: 3,
              },
              {
                nombre: "Premium Anual",
                precio: "$4990",
                descripcion: "Clientes ilimitados \nPago anual",
                id: 4,
              },
            ].map((plan) => (
              <div
                key={plan.id}
                style={{
                  ...RegisterStyles.planCard,
                  border:
                    selectedPlan === plan.id
                      ? "2px solid rgb(0, 255, 0)"
                      : "1px solid yellow",
                }}
                onClick={() => handlePlanSelection(plan.id)}
              >
                <h3 style={RegisterStyles.planTitle}>{plan.nombre}</h3>
                <p style={RegisterStyles.planPrice}>{plan.precio}</p>
                <p style={RegisterStyles.planDescription}>{plan.descripcion}</p>
              </div>
            ))}
          </div>

          {/* Mensajes */}
          {error && <p style={RegisterStyles.error}>{error}</p>}
          {successMessage && (
            <div style={RegisterStyles.success}>
              <p>{successMessage}</p>
              {loading && <span className="loader" />}
            </div>
          )}

          {/* Botón de Registro */}
          <button
            type="submit"
            disabled={!isFormValid || !selectedPlan}
            style={{
              ...RegisterStyles.button,
              backgroundColor: isFormValid && selectedPlan ? "#ffcc00" : "#bbb",
              color: isFormValid && selectedPlan ? "#000" : "#666",
              cursor: isFormValid && selectedPlan ? "pointer" : "not-allowed",
            }}
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>

        <p
          // onClick={() => navigate("/login")}
          style={{
            marginTop: "1rem",
            color: "#bbb",
            fontSize: "0.9rem",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          ¿Ya tienes una cuenta? Iniciar sesión
        </p>
      </div>
    </div>
  );
};

export default Register;
