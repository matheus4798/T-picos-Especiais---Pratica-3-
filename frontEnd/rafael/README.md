# Sistema de Gerenciamento de Pessoas - Frontend React

Este é o frontend React para o Sistema de Gerenciamento de Pessoas, desenvolvido para integrar com o backend Java Spring Boot.

## 🚀 Funcionalidades

- **Listagem de Pessoas**: Visualize todas as pessoas cadastradas em um layout moderno e responsivo
- **Cadastro de Pessoas**: Formulário intuitivo para adicionar novas pessoas
- **Edição de Pessoas**: Atualize informações de pessoas existentes
- **Visualização de Detalhes**: Veja informações detalhadas de cada pessoa
- **Exclusão de Pessoas**: Remova pessoas do sistema com confirmação
- **Busca**: Sistema de busca por nome ou idade
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca principal
- **Vite** - Build tool e servidor de desenvolvimento
- **Axios** - Cliente HTTP para comunicação com a API
- **CSS3** - Estilização com gradientes e animações modernas

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- Backend Java Spring Boot rodando na porta 8080
- PostgreSQL configurado e rodando

## 🚀 Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acessar a aplicação:**
   - Abra seu navegador em `http://localhost:3000`

## 🔧 Configuração

### Backend
Certifique-se de que o backend Java Spring Boot está rodando na porta 8080. O frontend está configurado para se comunicar com:
- **API Base URL**: `http://localhost:8080/api`

### Proxy de Desenvolvimento
O Vite está configurado com proxy para redirecionar requisições `/api` para o backend:
```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Header.jsx      # Cabeçalho da aplicação
│   ├── Header.css      # Estilos do cabeçalho
│   ├── PessoaForm.jsx  # Formulário de cadastro/edição
│   ├── PessoaForm.css  # Estilos do formulário
│   ├── PessoaList.jsx  # Lista de pessoas
│   ├── PessoaList.css  # Estilos da lista
│   ├── PessoaDetails.jsx # Detalhes da pessoa
│   └── PessoaDetails.css # Estilos dos detalhes
├── services/           # Serviços de API
│   └── api.js         # Configuração e métodos da API
├── App.jsx            # Componente principal
├── App.css            # Estilos globais
├── index.css          # Estilos base
└── main.jsx           # Ponto de entrada
```

## 🔌 Integração com Backend

O frontend consome as seguintes APIs do backend:

### Endpoints Utilizados
- `GET /api/pessoas` - Listar todas as pessoas
- `GET /api/pessoas/{id}` - Buscar pessoa por ID
- `POST /api/pessoas` - Criar nova pessoa
- `PUT /api/pessoas/{id}` - Atualizar pessoa
- `DELETE /api/pessoas/{id}` - Deletar pessoa

### Modelo de Dados
```javascript
{
  id: number,      // ID único da pessoa
  nome: string,    // Nome da pessoa
  idade: number    // Idade da pessoa
}
```

## 🎨 Design e UX

- **Design Moderno**: Interface limpa com gradientes e sombras
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Animações Suaves**: Transições e efeitos visuais
- **Feedback Visual**: Mensagens de sucesso e erro
- **Validação**: Validação de formulários em tempo real

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 🔍 Solução de Problemas

### Backend não conecta
- Verifique se o backend Java está rodando na porta 8080
- Confirme se o PostgreSQL está rodando
- Verifique os logs do backend para erros

### Erro de CORS
- O backend deve ter CORS configurado para aceitar requisições do frontend
- Verifique se o proxy do Vite está funcionando

### Dependências
- Execute `npm install` para instalar todas as dependências
- Verifique se a versão do Node.js é compatível

## 📝 Notas de Desenvolvimento

- O frontend foi desenvolvido para ser totalmente independente do backend
- Todas as funcionalidades do backend foram implementadas no frontend
- A aplicação é responsiva e funciona em dispositivos móveis
- O código está organizado em componentes reutilizáveis
- Utiliza hooks do React para gerenciamento de estado