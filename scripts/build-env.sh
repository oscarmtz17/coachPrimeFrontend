#!/bin/bash

# Script de build para diferentes entornos de CoachPrime Frontend

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar ayuda
show_help() {
    echo -e "${BLUE}Script de build para CoachPrime Frontend${NC}"
    echo ""
    echo "Uso: $0 [ENTORNO]"
    echo ""
    echo "Entornos disponibles:"
    echo "  development - Build para desarrollo local"
    echo "  qa          - Build para QA"
    echo "  staging     - Build para staging"
    echo "  production  - Build para producción"
    echo ""
    echo "Ejemplos:"
    echo "  $0 development"
    echo "  $0 qa"
    echo "  $0 production"
    echo ""
}

# Función para validar entorno
validate_environment() {
    local env=$1
    case $env in
        development|qa|staging|production)
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

# Función para build
build_for_environment() {
    local env=$1
    
    echo -e "${BLUE}🔨 Iniciando build para entorno: ${YELLOW}$env${NC}"
    
    # Limpiar build anterior
    echo -e "${BLUE}🧹 Limpiando build anterior...${NC}"
    rm -rf build/
    
    # Instalar dependencias si es necesario
    if [ ! -d "node_modules" ]; then
        echo -e "${BLUE}📦 Instalando dependencias...${NC}"
        npm install
    fi
    
    # Ejecutar build con variables de entorno
    echo -e "${BLUE}🚀 Ejecutando build...${NC}"
    REACT_APP_ENVIRONMENT=$env npm run build
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Build completado exitosamente para $env${NC}"
        echo -e "${BLUE}📁 Archivos generados en: ${YELLOW}./build${NC}"
        
        # Mostrar información del build
        echo -e "${BLUE}📊 Información del build:${NC}"
        echo -e "  - Entorno: ${YELLOW}$env${NC}"
        echo -e "  - Tamaño del build: ${YELLOW}$(du -sh build | cut -f1)${NC}"
        echo -e "  - Archivos generados: ${YELLOW}$(find build -type f | wc -l)${NC}"
        
    else
        echo -e "${RED}❌ Error en el build para $env${NC}"
        exit 1
    fi
}

# Función para verificar configuración
check_config() {
    local env=$1
    
    echo -e "${BLUE}🔍 Verificando configuración para $env...${NC}"
    
    # Verificar que las variables de entorno están configuradas
    case $env in
        development)
            # Para desarrollo, usar valores por defecto
            echo -e "${GREEN}✅ Configuración de desarrollo verificada${NC}"
            ;;
        qa|staging|production)
            # Para otros entornos, verificar variables críticas
            if [ -z "$REACT_APP_API_BASE_URL" ]; then
                echo -e "${YELLOW}⚠️  REACT_APP_API_BASE_URL no está definida, usando valor por defecto${NC}"
            fi
            if [ -z "$REACT_APP_STRIPE_PUBLISHABLE_KEY" ]; then
                echo -e "${YELLOW}⚠️  REACT_APP_STRIPE_PUBLISHABLE_KEY no está definida, usando valor por defecto${NC}"
            fi
            ;;
    esac
}

# Función principal
main() {
    # Verificar argumentos
    if [ $# -eq 0 ]; then
        echo -e "${RED}❌ Error: Debe especificar un entorno${NC}"
        show_help
        exit 1
    fi
    
    if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
        show_help
        exit 0
    fi
    
    local env=$1
    
    # Validar entorno
    if ! validate_environment $env; then
        echo -e "${RED}❌ Error: Entorno '$env' no válido${NC}"
        show_help
        exit 1
    fi
    
    # Verificar que estamos en el directorio correcto
    if [ ! -f "package.json" ]; then
        echo -e "${RED}❌ Error: No se encontró package.json. Ejecute este script desde el directorio del proyecto.${NC}"
        exit 1
    fi
    
    # Verificar configuración
    check_config $env
    
    # Ejecutar build
    build_for_environment $env
    
    echo -e "${GREEN}🎉 Proceso completado exitosamente!${NC}"
}

# Ejecutar función principal
main "$@" 