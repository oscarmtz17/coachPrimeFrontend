# Script de build para diferentes entornos de CoachPrime Frontend (PowerShell)

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("development", "qa", "staging", "production")]
    [string]$Environment,
    
    [switch]$Help
)

# Función para mostrar ayuda
function Show-Help {
    Write-Host "Script de build para CoachPrime Frontend" -ForegroundColor Blue
    Write-Host ""
    Write-Host "Uso: .\build-env.ps1 -Environment [ENTORNO]" -ForegroundColor White
    Write-Host ""
    Write-Host "Entornos disponibles:" -ForegroundColor White
    Write-Host "  development - Build para desarrollo local" -ForegroundColor Yellow
    Write-Host "  qa          - Build para QA" -ForegroundColor Yellow
    Write-Host "  staging     - Build para staging" -ForegroundColor Yellow
    Write-Host "  production  - Build para producción" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Ejemplos:" -ForegroundColor White
    Write-Host "  .\build-env.ps1 -Environment development" -ForegroundColor Cyan
    Write-Host "  .\build-env.ps1 -Environment qa" -ForegroundColor Cyan
    Write-Host "  .\build-env.ps1 -Environment production" -ForegroundColor Cyan
    Write-Host ""
}

# Función para build
function Build-ForEnvironment {
    param([string]$env)
    
    Write-Host "🔨 Iniciando build para entorno: $env" -ForegroundColor Blue
    
    # Limpiar build anterior
    Write-Host "🧹 Limpiando build anterior..." -ForegroundColor Blue
    if (Test-Path "build") {
        Remove-Item -Recurse -Force "build"
    }
    
    # Instalar dependencias si es necesario
    if (-not (Test-Path "node_modules")) {
        Write-Host "📦 Instalando dependencias..." -ForegroundColor Blue
        npm install
    }
    
    # Ejecutar build con variables de entorno
    Write-Host "🚀 Ejecutando build..." -ForegroundColor Blue
    $env:REACT_APP_ENVIRONMENT = $env
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Build completado exitosamente para $env" -ForegroundColor Green
        Write-Host "📁 Archivos generados en: ./build" -ForegroundColor Blue
        
        # Mostrar información del build
        Write-Host "📊 Información del build:" -ForegroundColor Blue
        Write-Host "  - Entorno: $env" -ForegroundColor Yellow
        
        if (Test-Path "build") {
            $buildSize = (Get-ChildItem -Recurse "build" | Measure-Object -Property Length -Sum).Sum
            $buildSizeMB = [math]::Round($buildSize / 1MB, 2)
            Write-Host "  - Tamaño del build: ${buildSizeMB} MB" -ForegroundColor Yellow
            
            $fileCount = (Get-ChildItem -Recurse "build" -File).Count
            Write-Host "  - Archivos generados: $fileCount" -ForegroundColor Yellow
        }
        
    } else {
        Write-Host "❌ Error en el build para $env" -ForegroundColor Red
        exit 1
    }
}

# Función para verificar configuración
function Check-Config {
    param([string]$env)
    
    Write-Host "🔍 Verificando configuración para $env..." -ForegroundColor Blue
    
    # Verificar que las variables de entorno están configuradas
    switch ($env) {
        "development" {
            Write-Host "✅ Configuración de desarrollo verificada" -ForegroundColor Green
        }
        "qa" {
            if (-not $env:REACT_APP_API_BASE_URL) {
                Write-Host "⚠️  REACT_APP_API_BASE_URL no está definida, usando valor por defecto" -ForegroundColor Yellow
            }
            if (-not $env:REACT_APP_STRIPE_PUBLISHABLE_KEY) {
                Write-Host "⚠️  REACT_APP_STRIPE_PUBLISHABLE_KEY no está definida, usando valor por defecto" -ForegroundColor Yellow
            }
        }
        "staging" {
            if (-not $env:REACT_APP_API_BASE_URL) {
                Write-Host "⚠️  REACT_APP_API_BASE_URL no está definida, usando valor por defecto" -ForegroundColor Yellow
            }
            if (-not $env:REACT_APP_STRIPE_PUBLISHABLE_KEY) {
                Write-Host "⚠️  REACT_APP_STRIPE_PUBLISHABLE_KEY no está definida, usando valor por defecto" -ForegroundColor Yellow
            }
        }
        "production" {
            if (-not $env:REACT_APP_API_BASE_URL) {
                Write-Host "⚠️  REACT_APP_API_BASE_URL no está definida, usando valor por defecto" -ForegroundColor Yellow
            }
            if (-not $env:REACT_APP_STRIPE_PUBLISHABLE_KEY) {
                Write-Host "⚠️  REACT_APP_STRIPE_PUBLISHABLE_KEY no está definida, usando valor por defecto" -ForegroundColor Yellow
            }
        }
    }
}

# Función principal
function Main {
    # Mostrar ayuda si se solicita
    if ($Help) {
        Show-Help
        return
    }
    
    # Verificar que estamos en el directorio correcto
    if (-not (Test-Path "package.json")) {
        Write-Host "❌ Error: No se encontró package.json. Ejecute este script desde el directorio del proyecto." -ForegroundColor Red
        exit 1
    }
    
    # Verificar configuración
    Check-Config -env $Environment
    
    # Ejecutar build
    Build-ForEnvironment -env $Environment
    
    Write-Host "🎉 Proceso completado exitosamente!" -ForegroundColor Green
}

# Ejecutar función principal
Main 