import { useState } from 'react';
import Header from './components/Header';
import PessoaList from './components/PessoaList';
import PessoaForm from './components/PessoaForm';
import PessoaDetails from './components/PessoaDetails';
import { pessoaService } from './services/api';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedPessoa, setSelectedPessoa] = useState(null);
  const [editingPessoa, setEditingPessoa] = useState(null);

  const handleNavigate = (view) => {
    setCurrentView(view);
    setSelectedPessoa(null);
    setEditingPessoa(null);
  };

  const handleViewPessoa = (pessoa) => {
    setSelectedPessoa(pessoa);
    setCurrentView('details');
  };

  const handleEditPessoa = (pessoa) => {
    setEditingPessoa(pessoa);
    setCurrentView('edit');
  };

  const handleCreatePessoa = () => {
    setEditingPessoa(null);
    setCurrentView('create');
  };

  const handleFormSubmit = async (pessoaData) => {
    try {
      if (editingPessoa) {
        // Atualizar pessoa existente
        await pessoaService.atualizarPessoa(editingPessoa.id, pessoaData);
        alert('Pessoa atualizada com sucesso!');
      } else {
        // Criar nova pessoa
        await pessoaService.criarPessoa(pessoaData);
        alert('Pessoa cadastrada com sucesso!');
      }
      setCurrentView('list');
      setEditingPessoa(null);
    } catch (error) {
      alert('Erro ao salvar pessoa. Verifique se o backend está rodando.');
      console.error('Erro:', error);
    }
  };

  const handleFormCancel = () => {
    setCurrentView('list');
    setEditingPessoa(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'list':
        return (
          <PessoaList
            onEdit={handleEditPessoa}
            onView={handleViewPessoa}
            onDelete={() => {}} // Handled in PessoaList component
          />
        );
      case 'create':
        return (
          <PessoaForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        );
      case 'edit':
        return (
          <PessoaForm
            pessoa={editingPessoa}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        );
      case 'details':
        return (
          <PessoaDetails
            pessoaId={selectedPessoa?.id}
            onEdit={handleEditPessoa}
            onBack={() => setCurrentView('list')}
          />
        );
      default:
        return (
          <PessoaList
            onEdit={handleEditPessoa}
            onView={handleViewPessoa}
            onDelete={() => {}}
          />
        );
    }
  };

  return (
    <div className="app">
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate}
      />
      <main className="app-main">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;
