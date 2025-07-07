# Docker - CoachPrime Frontend

## 🚀 Ejecutar Frontend en Docker

### Requisitos

- Docker Desktop instalado y corriendo
- PowerShell (Windows) o Terminal (Mac/Linux)

### Opción 1: Script Automatizado (Recomendado)

```powershell
# Ejecutar el script
.\run-docker.ps1
```

### Opción 2: Comandos Manuales

```bash
# Construir y levantar
docker-compose up -d --build

# Ver logs
docker-compose logs -f frontend

# Detener
docker-compose down
```

### Opción 3: Solo Docker

```bash
# Construir imagen
docker build -t coachprime-frontend .

# Ejecutar contenedor
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules coachprime-frontend
```

## 🌐 Acceso

- **URL**: http://localhost:3000
- **API Backend**: http://localhost:5267/api (asegúrate de que el backend esté corriendo)

## 📊 Comandos Útiles

### Ver logs

```bash
docker-compose logs -f frontend
```

### Reiniciar servicio

```bash
docker-compose restart frontend
```

### Reconstruir (si hay cambios en dependencias)

```bash
docker-compose down
docker-compose up -d --build
```

### Ver estado de contenedores

```bash
docker-compose ps
```

### Acceder al contenedor

```bash
docker-compose exec frontend sh
```

## 🔧 Variables de Entorno

Las variables de entorno están configuradas en `docker-compose.yml`:

- `REACT_APP_ENVIRONMENT=development`
- `REACT_APP_API_BASE_URL=http://localhost:5267/api`
- `REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...`

## 🐛 Troubleshooting

### Error: Puerto 3000 ocupado

```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "3001:3000"  # Usar puerto 3001 en lugar de 3000
```

### Error: Permisos en Windows

```bash
# Ejecutar PowerShell como Administrador
# O agregar el directorio a Docker Desktop File Sharing
```

### Error: Hot reload no funciona

```bash
# Verificar que los volúmenes estén montados correctamente
docker-compose down
docker-compose up -d --build
```

### Limpiar Docker

```bash
# Limpiar contenedores e imágenes no utilizadas
docker system prune -a

# Limpiar volúmenes
docker volume prune
```

## 📝 Notas

- El frontend se ejecuta en modo desarrollo con hot reload
- Los cambios en el código se reflejan automáticamente
- El backend debe estar corriendo en el puerto 5267
- Para producción, usar configuración diferente
