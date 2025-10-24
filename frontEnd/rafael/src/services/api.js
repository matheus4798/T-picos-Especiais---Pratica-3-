import axios from 'axios';
import { config } from '../config/environment';

// Configuração base da API
const API_BASE_URL = config.API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout de 10 segundos
});

// Interceptor para logs de debug
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Enviando requisição:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta recebida:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// Serviços para Pessoa
export const pessoaService = {
  // Listar todas as pessoas
  listarPessoas: async () => {
    try {
      const response = await api.get('/pessoas');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar pessoas:', error);
      throw error;
    }
  },

  // Buscar pessoa por ID
  buscarPessoa: async (id) => {
    try {
      const response = await api.get(`/pessoas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar pessoa:', error);
      throw error;
    }
  },

  // Criar nova pessoa
  criarPessoa: async (pessoa) => {
    try {
      const response = await api.post('/pessoas', pessoa);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar pessoa:', error);
      throw error;
    }
  },

  // Atualizar pessoa (se necessário no futuro)
  atualizarPessoa: async (id, pessoa) => {
    try {
      const response = await api.put(`/pessoas/${id}`, pessoa);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar pessoa:', error);
      throw error;
    }
  },

  // Deletar pessoa
  deletarPessoa: async (id) => {
    try {
      await api.delete(`/pessoas/${id}`);
      return true;
    } catch (error) {
      console.error('Erro ao deletar pessoa:', error);
      throw error;
    }
  }
};

export default api;
