import './App.css';
import PokemonCard from './PokemonCard';

function App() {
  return (
    <div className="app">
      <header className="site-header">
        <p className="site-eyebrow">Daily Pokémon challenge</p>
        <h1 className="site-title">The BST Game</h1>
        <p className="site-tagline">
          Guess the Pokémon from its stats, type, shape, and moves.
        </p>
      </header>

      <main className="site-main">
        <PokemonCard />
      </main>

      <footer className="site-footer">
        © 2026 Liam Gormley · Built with React + Vite
      </footer>
    </div>
  );
}

export default App;
