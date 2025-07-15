// src/config/environment.ts
import environments, { EnvironmentSettings } from "./environments";
import { logConfigValidation } from "../utils/configValidator";

export interface EnvironmentConfig extends EnvironmentSettings {}

// Obtener el entorno actual desde las variables de entorno o usar development por defecto
const currentEnvironment = process.env.REACT_APP_ENVIRONMENT || "development";

// Obtener la configuración base del entorno
const baseConfig = environments[currentEnvironment] || environments.development;

// Crear la configuración final, permitiendo override con variables de entorno
const config: EnvironmentConfig = {
  apiBaseUrl:
    process.env.REACT_APP_API_BASE_URL ||
    process.env.REACT_APP_API_URL ||
    baseConfig.apiBaseUrl,
  stripePublishableKey:
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ||
    baseConfig.stripePublishableKey,
  environment: currentEnvironment,
  appName: process.env.REACT_APP_APP_NAME || baseConfig.appName,
  version: process.env.REACT_APP_VERSION || baseConfig.version,
  debug: baseConfig.debug,
  logLevel: baseConfig.logLevel,
};

// Log de configuración según el nivel configurado
const logConfig = () => {
  const logData = {
    environment: config.environment,
    apiBaseUrl: config.apiBaseUrl,
    appName: config.appName,
    version: config.version,
    debug: config.debug,
    logLevel: config.logLevel,
  };

  switch (config.logLevel) {
    case "debug":
      console.log("🔧 Configuración de entorno:", logData);
      break;
    case "info":
      console.info("ℹ️ Configuración de entorno:", logData);
      break;
    case "warn":
      console.warn("⚠️ Configuración de entorno:", logData);
      break;
    case "error":
      // Solo log en error si hay problemas
      break;
  }
};

// Ejecutar log de configuración y validación
logConfig();
// logConfigValidation();

export default config;
