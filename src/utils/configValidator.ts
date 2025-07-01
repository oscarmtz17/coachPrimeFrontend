import config from "../config/environment";

export interface ConfigValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const validateConfig = (): ConfigValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validar API Base URL
  if (!config.apiBaseUrl) {
    errors.push("REACT_APP_API_BASE_URL no está definida");
  } else if (!config.apiBaseUrl.startsWith("http")) {
    errors.push(
      "REACT_APP_API_BASE_URL debe ser una URL válida que comience con http:// o https://"
    );
  }

  // Validar Stripe Key
  if (!config.stripePublishableKey) {
    errors.push("REACT_APP_STRIPE_PUBLISHABLE_KEY no está definida");
  } else if (!config.stripePublishableKey.startsWith("pk_")) {
    errors.push("REACT_APP_STRIPE_PUBLISHABLE_KEY debe comenzar con pk_");
  }

  // Validar entorno
  if (!config.environment) {
    errors.push("REACT_APP_ENVIRONMENT no está definida");
  }

  // Warnings para desarrollo
  if (config.environment === "development") {
    if (config.apiBaseUrl.includes("localhost")) {
      warnings.push("Usando API localhost para desarrollo");
    }
    if (config.stripePublishableKey.includes("pk_test_")) {
      warnings.push("Usando clave de prueba de Stripe para desarrollo");
    }
  }

  // Warnings para producción
  if (config.environment === "production") {
    if (config.apiBaseUrl.includes("localhost")) {
      errors.push("No se puede usar localhost en producción");
    }
    if (config.stripePublishableKey.includes("pk_test_")) {
      errors.push("No se puede usar clave de prueba de Stripe en producción");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

export const logConfigValidation = (): void => {
  const validation = validateConfig();

  if (validation.errors.length > 0) {
    console.error("❌ Errores de configuración:");
    validation.errors.forEach((error) => console.error(`  - ${error}`));
  }

  if (validation.warnings.length > 0) {
    console.warn("⚠️ Advertencias de configuración:");
    validation.warnings.forEach((warning) => console.warn(`  - ${warning}`));
  }

  if (validation.isValid) {
    console.log("✅ Configuración válida");
  }
};

// Ejecutar validación automáticamente en desarrollo
if (process.env.NODE_ENV === "development") {
  logConfigValidation();
}
