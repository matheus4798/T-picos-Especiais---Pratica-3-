import './Header.css';

const Header = ({ currentView, onNavigate }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <h1>👥 Sistema de Pessoas</h1>
          <p>Gerencie suas pessoas de forma simples e eficiente</p>
        </div>
        
        <nav className="header-nav">
          <button
            onClick={() => onNavigate('list')}
            className={`nav-btn ${currentView === 'list' ? 'active' : ''}`}
          >
            📋 Lista
          </button>
          <button
            onClick={() => onNavigate('create')}
            className={`nav-btn ${currentView === 'create' ? 'active' : ''}`}
          >
            ➕ Cadastrar
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
