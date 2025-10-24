import { useState, useEffect } from 'react';
import { pessoaService } from '../services/api';
import './PessoaDetails.css';

const PessoaDetails = ({ pessoaId, onEdit, onBack }) => {
  const [pessoa, setPessoa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPessoa = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await pessoaService.buscarPessoa(pessoaId);
        setPessoa(data);
      } catch (err) {
        setError('Erro ao carregar dados da pessoa.');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    if (pessoaId) {
      loadPessoa();
    }
  }, [pessoaId]);

  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja excluir ${pessoa.nome}?`)) {
      try {
        await pessoaService.deletarPessoa(pessoa.id);
        alert('Pessoa excluída com sucesso!');
        onBack();
      } catch (err) {
        alert('Erro ao excluir pessoa. Tente novamente.');
        console.error('Erro:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando dados da pessoa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Erro ao carregar dados</h3>
        <p>{error}</p>
        <button onClick={onBack} className="btn btn-primary">
          Voltar
        </button>
      </div>
    );
  }

  if (!pessoa) {
    return (
      <div className="not-found-container">
        <div className="not-found-icon">❌</div>
        <h3>Pessoa não encontrada</h3>
        <p>A pessoa que você está procurando não existe ou foi removida.</p>
        <button onClick={onBack} className="btn btn-primary">
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="pessoa-details-container">
      <div className="pessoa-details-card">
        <div className="pessoa-header">
          <div className="pessoa-avatar-large">
            {pessoa.nome.charAt(0).toUpperCase()}
          </div>
          <div className="pessoa-title">
            <h1>{pessoa.nome}</h1>
            <p className="pessoa-subtitle">Detalhes da Pessoa</p>
          </div>
        </div>

        <div className="pessoa-info-grid">
          <div className="info-item">
            <div className="info-label">ID</div>
            <div className="info-value">{pessoa.id}</div>
          </div>
          
          <div className="info-item">
            <div className="info-label">Nome</div>
            <div className="info-value">{pessoa.nome}</div>
          </div>
          
          <div className="info-item">
            <div className="info-label">Idade</div>
            <div className="info-value">{pessoa.idade} anos</div>
          </div>
        </div>

        <div className="pessoa-actions">
          <button onClick={onBack} className="btn btn-secondary">
            ← Voltar
          </button>
          <button onClick={() => onEdit(pessoa)} className="btn btn-primary">
            ✏️ Editar
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            🗑️ Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default PessoaDetails;
