# 🚀 Executando no GitHub Codespace

Este guia explica como executar o Sistema de Pessoas no GitHub Codespace.

## ⚡ Início Rápido

### Opção 1: Script Automático
```bash
chmod +x start-codespace.sh
./start-codespace.sh
```

### Opção 2: Manual

#### 1. Iniciar o Backend (Terminal 1)
```bash
# No diretório raiz do projeto
mvn spring-boot:run
```

#### 2. Iniciar o Frontend (Terminal 2)
```bash
# No diretório do frontend
cd frontEnd/rafael
npm run dev
```

## 🔧 Configurações Específicas do Codespace

### Backend (Java Spring Boot)
- **Porta**: 8080
- **CORS**: Configurado para aceitar todas as origens
- **URL da API**: `http://localhost:8080/api`

### Frontend (React + Vite)
- **Porta**: 3000
- **Proxy**: Configurado para redirecionar `/api` para o backend
- **URL**: `http://localhost:3000`

## 🌐 Acessando a Aplicação

### No Codespace:
1. **Frontend**: Use a aba "Ports" no VS Code e clique em "Open in Browser" na porta 3000
2. **Backend**: Use a aba "Ports" no VS Code e clique em "Open in Browser" na porta 8080

### URLs Diretas:
- **Frontend**: `https://[seu-codespace].app.github.dev:3000`
- **Backend API**: `https://[seu-codespace].app.github.dev:8080/api`

## 🔍 Solução de Problemas

### Erro de CORS
Se você ver erros de CORS, verifique se:
1. O backend está rodando na porta 8080
2. O arquivo `CorsConfig.java` foi criado
3. O backend foi reiniciado após adicionar a configuração CORS

### Frontend não carrega dados
1. Verifique se o backend está rodando
2. Abra o DevTools (F12) e verifique a aba Console
3. Verifique se as requisições estão sendo feitas para `/api/pessoas`

### Portas não acessíveis
1. No VS Code, vá para a aba "Ports"
2. Certifique-se de que as portas 3000 e 8080 estão "Public"
3. Clique em "Open in Browser" para cada porta

## 📋 Verificação de Funcionamento

### 1. Testar Backend
```bash
curl http://localhost:8080/api/pessoas
```
Deve retornar uma lista vazia `[]` ou dados existentes.

### 2. Testar Frontend
1. Acesse `http://localhost:3000`
2. Deve carregar a interface do Sistema de Pessoas
3. Clique em "Cadastrar" para testar o formulário

## 🛠️ Estrutura do Projeto

```
T-picos-Especiais---Pratica-3-/
├── src/                          # Backend Java
│   └── main/java/com/example/projeto/
│       ├── config/CorsConfig.java # Configuração CORS
│       ├── controller/            # Controllers REST
│       ├── model/                 # Entidades JPA
│       ├── service/               # Serviços de negócio
│       └── repository/            # Repositórios JPA
├── frontEnd/rafael/              # Frontend React
│   ├── src/
│   │   ├── components/           # Componentes React
│   │   ├── services/             # Serviços de API
│   │   └── config/               # Configurações
│   └── vite.config.js            # Configuração Vite
└── docker-compose.yml            # PostgreSQL
```

## 🎯 Funcionalidades Disponíveis

- ✅ **Listar Pessoas**: Visualizar todas as pessoas cadastradas
- ✅ **Cadastrar Pessoa**: Adicionar nova pessoa
- ✅ **Editar Pessoa**: Modificar dados existentes
- ✅ **Excluir Pessoa**: Remover pessoa do sistema
- ✅ **Buscar Pessoas**: Filtrar por nome ou idade
- ✅ **Interface Responsiva**: Funciona em desktop e mobile

## 🔧 Comandos Úteis

### Backend
```bash
# Compilar projeto
mvn compile

# Executar testes
mvn test

# Limpar e compilar
mvn clean compile

# Executar aplicação
mvn spring-boot:run
```

### Frontend
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Visualizar build
npm run preview
```

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do console (F12)
2. Confirme que ambas as aplicações estão rodando
3. Teste a API diretamente com curl
4. Reinicie ambas as aplicações se necessário
