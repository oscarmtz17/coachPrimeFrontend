docker-compose down# Script simple para ejecutar el frontend en Docker
Write-Host "🚀 Iniciando CoachPrime Frontend en Docker..." -ForegroundColor Green

# Verificar que Docker esté corriendo
try {
    docker version | Out-Null
    Write-Host "✅ Docker está disponible" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker no está disponible. Por favor, instala Docker Desktop." -ForegroundColor Red
    exit 1
}

# Detener contenedores existentes
Write-Host "🛑 Deteniendo contenedores existentes..." -ForegroundColor Yellow
docker-compose down

# Construir y levantar contenedores
Write-Host "🔨 Construyendo y levantando contenedores..." -ForegroundColor Yellow
docker-compose up -d --build

# Esperar a que el servicio esté listo
Write-Host "⏳ Esperando a que el servicio esté listo..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host "🎉 Frontend iniciado exitosamente!" -ForegroundColor Green
Write-Host "🌐 Disponible en: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📊 Para ver logs: docker-compose logs -f frontend" -ForegroundColor Cyan
Write-Host "🛑 Para detener: docker-compose down" -ForegroundColor Cyan 