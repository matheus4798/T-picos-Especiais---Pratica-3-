// Configuração de ambiente
const isCodespace = window.location.hostname.includes('github.dev') || 
                   window.location.hostname.includes('codespaces') ||
                   window.location.hostname.includes('app.github.dev');

export const config = {
  // No Codespace, usamos o proxy do Vite
  API_BASE_URL: isCodespace ? '/api' : 'http://localhost:8080/api',
  TIMEOUT: 10000,
  DEBUG: true
};

console.log('🔧 Configuração detectada:', {
  isCodespace,
  apiBaseUrl: config.API_BASE_URL,
  hostname: window.location.hostname
});
