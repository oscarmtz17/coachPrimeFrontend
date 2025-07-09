# Configuración de Variables de Entorno - CoachPrime Frontend

## Resumen

Este documento explica cómo configurar las variables de entorno para el frontend de CoachPrime en diferentes entornos (desarrollo, QA, staging, producción).

## Estructura de Archivos

```
src/
├── config/
│   ├── environment.ts      # Configuración principal
│   └── environments.ts     # Configuraciones por entorno
├── utils/
│   └── configValidator.ts  # Validador de configuración
└── services/
    └── api.ts             # Servicio API (usando config)
```

## Variables de Entorno Requeridas

### Básicas

- `REACT_APP_API_BASE_URL`: URL base de la API
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Clave pública de Stripe
- `REACT_APP_ENVIRONMENT`: Entorno actual (development, qa, staging, production)

### Opcionales

- `REACT_APP_APP_NAME`: Nombre de la aplicación
- `REACT_APP_VERSION`: Versión de la aplicación

## Configuración por Entorno

### 1. Desarrollo Local

Crear archivo `.env.local` en la raíz del proyecto:

```bash
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000/api

# Stripe Configuration
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51QQIQmBZAdKqouiVzQTmjaEecyel6ffPBbP67sDdiX2HKbMVVCWiPLTAFtTQ5l68cBXYeDpMCLgmD5QgO7fc6uqo000f9sq9mH

# App Configuration
REACT_APP_ENVIRONMENT=development
REACT_APP_APP_NAME=CoachPrime
REACT_APP_VERSION=1.0.0
```

### 2. QA

```bash
REACT_APP_API_BASE_URL=https://qa-api.coachprime.com/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51QQIQmBZAdKqouiVzQTmjaEecyel6ffPBbP67sDdiX2HKbMVVCWiPLTAFtTQ5l68cBXYeDpMCLgmD5QgO7fc6uqo000f9sq9mH
REACT_APP_ENVIRONMENT=qa
REACT_APP_APP_NAME=CoachPrime QA
REACT_APP_VERSION=1.0.0
```

### 3. Staging

```bash
REACT_APP_API_BASE_URL=https://staging-api.coachprime.com/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51QQIQmBZAdKqouiVzQTmjaEecyel6ffPBbP67sDdiX2HKbMVVCWiPLTAFtTQ5l68cBXYeDpMCLgmD5QgO7fc6uqo000f9sq9mH
REACT_APP_ENVIRONMENT=staging
REACT_APP_APP_NAME=CoachPrime Staging
REACT_APP_VERSION=1.0.0
```

### 4. Producción

```bash
REACT_APP_API_BASE_URL=https://api.coachprime.com/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_... # Reemplazar con clave real
REACT_APP_ENVIRONMENT=production
REACT_APP_APP_NAME=CoachPrime
REACT_APP_VERSION=1.0.0
```

## Scripts Disponibles

### NPM Scripts

```bash
# Build para diferentes entornos
npm run build:dev      # Desarrollo
npm run build:qa       # QA
npm run build:staging  # Staging
npm run build:prod     # Producción

# Validar configuración
npm run validate:config
```

### Scripts de Shell

```bash
# Linux/Mac
./scripts/build-env.sh development
./scripts/build-env.sh qa
./scripts/build-env.sh production

# Windows PowerShell
.\scripts\build-env.ps1 -Environment development
.\scripts\build-env.ps1 -Environment qa
.\scripts\build-env.ps1 -Environment production
```

## Validación de Configuración

El sistema incluye validación automática que verifica:

1. **Variables requeridas**: API URL y Stripe key
2. **Formato de URLs**: Verifica que las URLs sean válidas
3. **Formato de Stripe keys**: Verifica que comiencen con `pk_`
4. **Consistencia de entorno**: Verifica que no se use localhost en producción

### Ejemplo de Validación

```bash
npm run validate:config
```

Salida esperada:

```
🔧 Configuración de entorno: {
  environment: 'development',
  apiBaseUrl: 'http://localhost:5000/api',
  appName: 'CoachPrime',
  version: '1.0.0',
  debug: true,
  logLevel: 'debug'
}
✅ Configuración válida
```

## Troubleshooting

### Error: Variable de entorno no definida

```bash
# Verificar que el archivo .env.local existe
ls -la .env*

# Crear archivo si no existe
cp env.example .env.local
```

### Error de CORS

- Verificar que `REACT_APP_API_BASE_URL` apunta al backend correcto
- Asegurar que el backend tiene CORS configurado para el dominio del frontend

### Error de Stripe

- Verificar que `REACT_APP_STRIPE_PUBLISHABLE_KEY` es la clave correcta
- Asegurar que la clave coincide con el entorno (test/live)

### Build falla en producción

- Verificar que todas las variables de entorno están definidas
- Asegurar que no se usan claves de prueba en producción

## Seguridad

### Archivos a NO subir al repositorio

- `.env.local`
- `.env.development.local`
- `.env.test.local`
- `.env.production.local`

### Archivos seguros para subir

- `env.example` (archivo de ejemplo)
- `src/config/environments.ts` (configuraciones base)

## Migración desde Configuración Anterior

Si tienes una configuración anterior con valores hardcodeados:

1. **API Base URL**: Reemplazar en `src/services/api.ts`

   ```typescript
   // Antes
   baseURL: "http://localhost:5000/api";

   // Después
   baseURL: config.apiBaseUrl;
   ```

2. **Stripe Key**: Reemplazar en `src/App.tsx`

   ```typescript
   // Antes
   const stripePromise = loadStripe("pk_test_...");

   // Después
   const stripePromise = loadStripe(config.stripePublishableKey);
   ```

## Próximos Pasos

1. Configurar las variables de entorno en el servidor de QA
2. Configurar las variables de entorno en el servidor de producción
3. Actualizar las claves de Stripe para producción
4. Configurar CI/CD para usar las variables correctas por entorno
