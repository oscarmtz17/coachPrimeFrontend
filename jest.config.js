module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  collectCoverage: true,
  coverageDirectory: "coverage", // Directorio donde se guarda el informe
  coverageReporters: ["html", "text"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Define los archivos a incluir en el reporte
    "!src/**/*.d.ts", // Excluye los archivos de definiciones de TypeScript
  ],
  // Opcional: establece umbrales de cobertura mínima para asegurar un nivel básico de cobertura en tu código.
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
