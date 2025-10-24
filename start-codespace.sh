#!/bin/bash

echo "🚀 Iniciando aplicação no GitHub Codespace..."

# Verificar se estamos no Codespace
if [[ "$CODESPACES" == "true" ]]; then
    echo "✅ Detectado GitHub Codespace"
else
    echo "⚠️  Executando fora do Codespace"
fi

# Função para iniciar o backend
start_backend() {
    echo "🔧 Iniciando backend Java Spring Boot..."
    cd "$(dirname "$0")"
    
    # Verificar se o Maven está disponível
    if command -v mvn &> /dev/null; then
        echo "📦 Maven encontrado, iniciando aplicação..."
        mvn spring-boot:run &
        BACKEND_PID=$!
        echo "🟢 Backend iniciado com PID: $BACKEND_PID"
        
        # Aguardar o backend inicializar
        echo "⏳ Aguardando backend inicializar..."
        sleep 10
        
        # Verificar se o backend está rodando
        if curl -s http://localhost:8080/api/pessoas > /dev/null 2>&1; then
            echo "✅ Backend está rodando na porta 8080"
        else
            echo "❌ Backend não está respondendo. Verifique os logs."
        fi
    else
        echo "❌ Maven não encontrado. Instale o Maven ou use: mvn spring-boot:run"
        exit 1
    fi
}

# Função para iniciar o frontend
start_frontend() {
    echo "🎨 Iniciando frontend React..."
    cd "$(dirname "$0")/frontEnd/rafael"
    
    # Verificar se o Node.js está disponível
    if command -v npm &> /dev/null; then
        echo "📦 Node.js encontrado, iniciando frontend..."
        npm run dev &
        FRONTEND_PID=$!
        echo "🟢 Frontend iniciado com PID: $FRONTEND_PID"
        echo "🌐 Frontend disponível em: http://localhost:3000"
    else
        echo "❌ Node.js não encontrado. Instale o Node.js"
        exit 1
    fi
}

# Função para parar os processos
cleanup() {
    echo "🛑 Parando aplicação..."
    if [[ -n "$BACKEND_PID" ]]; then
        kill $BACKEND_PID 2>/dev/null
        echo "🟢 Backend parado"
    fi
    if [[ -n "$FRONTEND_PID" ]]; then
        kill $FRONTEND_PID 2>/dev/null
        echo "🟢 Frontend parado"
    fi
    exit 0
}

# Capturar Ctrl+C para parar os processos
trap cleanup SIGINT

# Iniciar aplicação
echo "🎯 Iniciando Sistema de Pessoas..."
start_backend
start_frontend

echo "✅ Aplicação iniciada com sucesso!"
echo "📋 Backend: http://localhost:8080"
echo "🎨 Frontend: http://localhost:3000"
echo "⏹️  Pressione Ctrl+C para parar"

# Manter o script rodando
wait
