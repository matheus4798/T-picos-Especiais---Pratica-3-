import { useState, useEffect } from 'react';
import { pessoaService } from '../services/api';
import './PessoaList.css';

const PessoaList = ({ onEdit, onView, onDelete }) => {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadPessoas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pessoaService.listarPessoas();
      setPessoas(data);
    } catch (err) {
      setError('Erro ao carregar pessoas. Verifique se o backend está rodando.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPessoas();
  }, []);

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja excluir ${nome}?`)) {
      try {
        await pessoaService.deletarPessoa(id);
        setPessoas(pessoas.filter(p => p.id !== id));
        alert('Pessoa excluída com sucesso!');
      } catch (err) {
        alert('Erro ao excluir pessoa. Tente novamente.');
        console.error('Erro:', err);
      }
    }
  };

  const filteredPessoas = pessoas.filter(pessoa =>
    pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pessoa.idade.toString().includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando pessoas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Erro ao carregar dados</h3>
        <p>{error}</p>
        <button onClick={loadPessoas} className="btn btn-primary">
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="pessoa-list-container">
      <div className="pessoa-list-header">
        <h2>Lista de Pessoas</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nome ou idade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {filteredPessoas.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>Nenhuma pessoa encontrada</h3>
          <p>
            {searchTerm 
              ? 'Nenhuma pessoa corresponde à sua busca.' 
              : 'Comece adicionando uma nova pessoa.'
            }
          </p>
        </div>
      ) : (
        <div className="pessoas-grid">
          {filteredPessoas.map((pessoa) => (
            <div key={pessoa.id} className="pessoa-card">
              <div className="pessoa-avatar">
                {pessoa.nome.charAt(0).toUpperCase()}
              </div>
              <div className="pessoa-info">
                <h3 className="pessoa-nome">{pessoa.nome}</h3>
                <p className="pessoa-idade">{pessoa.idade} anos</p>
              </div>
              <div className="pessoa-actions">
                <button
                  onClick={() => onView(pessoa)}
                  className="btn-action btn-view"
                  title="Ver detalhes"
                >
                  👁️
                </button>
                <button
                  onClick={() => onEdit(pessoa)}
                  className="btn-action btn-edit"
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(pessoa.id, pessoa.nome)}
                  className="btn-action btn-delete"
                  title="Excluir"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pessoa-list-footer">
        <p>Total: {filteredPessoas.length} pessoa(s)</p>
      </div>
    </div>
  );
};

export default PessoaList;
