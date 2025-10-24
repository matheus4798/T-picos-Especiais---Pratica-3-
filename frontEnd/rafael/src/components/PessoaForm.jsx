import { useState } from 'react';
import './PessoaForm.css';

const PessoaForm = ({ onSubmit, pessoa = null, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: pessoa?.nome || '',
    idade: pessoa?.idade || ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }
    
    if (!formData.idade) {
      newErrors.idade = 'Idade é obrigatória';
    } else if (isNaN(formData.idade) || parseInt(formData.idade) < 0 || parseInt(formData.idade) > 150) {
      newErrors.idade = 'Idade deve ser um número entre 0 e 150';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const pessoaData = {
        nome: formData.nome.trim(),
        idade: parseInt(formData.idade)
      };
      
      onSubmit(pessoaData);
    }
  };

  return (
    <div className="pessoa-form-container">
      <div className="pessoa-form-card">
        <h2>{pessoa ? 'Editar Pessoa' : 'Cadastrar Nova Pessoa'}</h2>
        
        <form onSubmit={handleSubmit} className="pessoa-form">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={errors.nome ? 'error' : ''}
              placeholder="Digite o nome da pessoa"
            />
            {errors.nome && <span className="error-message">{errors.nome}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="idade">Idade:</label>
            <input
              type="number"
              id="idade"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              className={errors.idade ? 'error' : ''}
              placeholder="Digite a idade"
              min="0"
              max="150"
            />
            {errors.idade && <span className="error-message">{errors.idade}</span>}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {pessoa ? 'Atualizar' : 'Cadastrar'}
            </button>
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PessoaForm;
