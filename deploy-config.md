# Configuración de Deploy - CoachPrime Frontend

## Variables de Entorno

### Desarrollo Local

Crear archivo `.env.local` en la raíz del proyecto:

```bash
REACT_APP_API_BASE_URL=http://localhost:5267/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51QQIQmBZAdKqouiVzQTmjaEecyel6ffPBbP67sDdiX2HKbMVVCWiPLTAFtTQ5l68cBXYeDpMCLgmD5QgO7fc6uqo000f9sq9mH
REACT_APP_ENVIRONMENT=development
REACT_APP_APP_NAME=CoachPrime
REACT_APP_VERSION=1.0.0
```

### QA

Variables de entorno para el servidor de QA:

```bash
REACT_APP_API_BASE_URL=https://qa-api.coachprime.com/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51QQIQmBZAdKqouiVzQTmjaEecyel6ffPBbP67sDdiX2HKbMVVCWiPLTAFtTQ5l68cBXYeDpMCLgmD5QgO7fc6uqo000f9sq9mH
REACT_APP_ENVIRONMENT=qa
REACT_APP_APP_NAME=CoachPrime QA
REACT_APP_VERSION=1.0.0
```

### Staging

Variables de entorno para el servidor de staging:

```bash
REACT_APP_API_BASE_URL=https://staging-api.coachprime.com/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51QQIQmBZAdKqouiVzQTmjaEecyel6ffPBbP67sDdiX2HKbMVVCWiPLTAFtTQ5l68cBXYeDpMCLgmD5QgO7fc6uqo000f9sq9mH
REACT_APP_ENVIRONMENT=staging
REACT_APP_APP_NAME=CoachPrime Staging
REACT_APP_VERSION=1.0.0
```

### Producción

Variables de entorno para el servidor de producción:

```bash
REACT_APP_API_BASE_URL=https://api.coachprime.com/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_... # Reemplazar con la clave de producción real
REACT_APP_ENVIRONMENT=production
REACT_APP_APP_NAME=CoachPrime
REACT_APP_VERSION=1.0.0
```

## Scripts de Build

### Desarrollo

```bash
npm start
# o
yarn start
```

### Build para QA

```bash
REACT_APP_ENVIRONMENT=qa npm run build
# o
REACT_APP_ENVIRONMENT=qa yarn build
```

### Build para Staging

```bash
REACT_APP_ENVIRONMENT=staging npm run build
# o
REACT_APP_ENVIRONMENT=staging yarn build
```

### Build para Producción

```bash
REACT_APP_ENVIRONMENT=production npm run build
# o
REACT_APP_ENVIRONMENT=production yarn build
```

## Configuración del Servidor

### Nginx (Ejemplo)

```nginx
server {
    listen 80;
    server_name coachprime.com www.coachprime.com;

    root /var/www/coachprime-frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Configuración para archivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Docker (Opcional)

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Verificación de Configuración

Después del deploy, verificar que:

1. La aplicación carga correctamente
2. Las llamadas a la API funcionan
3. Stripe está configurado correctamente
4. Los logs muestran la configuración correcta del entorno

## Troubleshooting

### Error: Variable de entorno no definida

- Verificar que el archivo `.env` existe y tiene las variables correctas
- Reiniciar el servidor de desarrollo después de crear/modificar `.env`

### Error de CORS

- Verificar que la URL de la API en `REACT_APP_API_BASE_URL` es correcta
- Asegurar que el backend tiene configurado CORS para el dominio del frontend

### Error de Stripe

- Verificar que `REACT_APP_STRIPE_PUBLISHABLE_KEY` es la clave correcta para el entorno
- Asegurar que la clave de Stripe coincide con el entorno (test/live)
