// src/config/environments.ts
export interface EnvironmentSettings {
  apiBaseUrl: string;
  stripePublishableKey: string;
  environment: string;
  appName: string;
  version: string;
  debug: boolean;
  logLevel: "debug" | "info" | "warn" | "error";
}

const environments: Record<string, EnvironmentSettings> = {
  development: {
    apiBaseUrl: "http://localhost:5267/api",
    stripePublishableKey:
      "pk_test_51QQIQmBZAdKqouiVzQTmjaEecyel6ffPBbP67sDdiX2HKbMVVCWiPLTAFtTQ5l68cBXYeDpMCLgmD5QgO7fc6uqo000f9sq9mH",
    environment: "development",
    appName: "CoachPrime",
    version: "1.0.0",
    debug: true,
    logLevel: "debug",
  },
  qa: {
    apiBaseUrl: "https://qa.mytracksnote.com/api",
    stripePublishableKey:
      "pk_test_51QQIQmBZAdKqouiVzQTmjaEecyel6ffPBbP67sDdiX2HKbMVVCWiPLTAFtTQ5l68cBXYeDpMCLgmD5QgO7fc6uqo000f9sq9mH",
    environment: "qa",
    appName: "CoachPrime QA",
    version: "1.0.0",
    debug: true,
    logLevel: "info",
  },
  staging: {
    apiBaseUrl: "https://staging-api.coachprime.com/api",
    stripePublishableKey:
      "pk_test_51QQIQmBZAdKqouiVzQTmjaEecyel6ffPBbP67sDdiX2HKbMVVCWiPLTAFtTQ5l68cBXYeDpMCLgmD5QgO7fc6uqo000f9sq9mH",
    environment: "staging",
    appName: "CoachPrime Staging",
    version: "1.0.0",
    debug: false,
    logLevel: "warn",
  },
  production: {
    apiBaseUrl: "https://mytracksnote.com/api",
    stripePublishableKey: "pk_live_...", // Reemplazar con la clave de producción real
    environment: "production",
    appName: "CoachPrime",
    version: "1.0.0",
    debug: false,
    logLevel: "error",
  },
};

export default environments;
