import { formatText } from './statUtils';

function getPokemonSprite(pokemon) {
  return (
    pokemon.sprites.other?.['official-artwork']?.front_default
    ?? pokemon.sprites.front_default
  );
}

function StatBlock({ title, stats }) {
  if (!stats) {
    return null;
  }

  return (
    <div className="guess-stats">
      <h3 className="guess-stats-title">{title}</h3>
      <p className="guess-stats-value">
        {stats.correct} / {stats.total} correct ({stats.accuracy}%)
      </p>
    </div>
  );
}

export default function GuessResultModal({ result, onClose }) {
  if (!result) {
    return null;
  }

  const { correct, pokemon, globalStats, pokemonStats } = result;
  const name = formatText(pokemon.name);
  const sprite = getPokemonSprite(pokemon);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content guess-result-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guess-result-title"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <h2
          id="guess-result-title"
          className={`guess-result-title ${correct ? 'guess-result-title--correct' : 'guess-result-title--wrong'}`}
        >
          {correct ? 'Correct!' : 'Better luck next time'}
        </h2>

        {sprite && (
          <img src={sprite} alt={name} className="guess-result-sprite" />
        )}
        <p className="guess-result-name">{name}</p>

        <StatBlock title="Global Statistics" stats={globalStats} />
        <StatBlock
          title={`${name} Statistics`}
          stats={pokemonStats}
        />

        {!globalStats && (
          <p className="guess-stats-fallback">
            Statistics unavailable — is the backend running?
          </p>
        )}

        <button type="button" className="btn btn-primary modal-continue" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}
