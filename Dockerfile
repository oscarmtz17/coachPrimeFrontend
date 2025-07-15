# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias primero para aprovechar el cache
COPY package*.json ./
COPY yarn.lock ./

# Configurar yarn y instalar dependencias
RUN yarn config set registry https://registry.npmjs.org/ && \
    yarn install --frozen-lockfile --production=false

# Copiar el resto del código
COPY . .

# Build de la aplicación
RUN yarn build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 