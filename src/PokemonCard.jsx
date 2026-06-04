import StatBars from './StatBars';
import Types from './Types';
import Shape from './Shape';
import Abilities from './Abilities';
import GenerationInfo from './GenerationInfo';
import Moveset from './Moveset';
import { usePokemonGame } from './hooks/usePokemonGame';

function guessMessageClass(message) {
  if (!message) return '';
  if (message.startsWith('Correct')) return 'guess-message--correct';
  if (message.startsWith('Wrong')) return 'guess-message--wrong';
  return '';
}

function PokemonCard() {
  const {
    input,
    setInput,
    pokemon,
    species,
    error,
    message,
    moveset,
    generation,
    loading,
    rollPokemon,
    submitGuess,
    isCardReady,
  } = usePokemonGame();

  return (
    <div className="page-layout">
      <button
        type="button"
        className="btn btn-primary btn-roll"
        onClick={rollPokemon}
        disabled={loading}
        title="Roll a random Pokémon"
      >
        {loading ? 'Loading…' : 'New Pokémon'}
      </button>

      <div className="game-card">
        {error && <p className="error-message">{error}</p>}

        {isCardReady && (
          <div className="information-card">
            <section className="left-top" aria-label="Pokémon profile">
              <div className="top-info-panel">
                <div className="profile-row">
                  <div className="shape-panel panel">
                    <Shape shape={species.shape.name} />
                  </div>

                  <div className="abilities-panel panel">
                    <h2 className="section-title">Abilities</h2>
                    <Abilities abilities={pokemon.abilities} />
                  </div>
                </div>

                <div className="types-row panel">
                  <Types types={pokemon.types} />
                </div>
              </div>
            </section>

            <h2 className="moveset-title section-title">Potential moveset</h2>

            <div className="moves-grid panel" aria-label="Potential moveset">
              <Moveset moveset={moveset} />
            </div>

            <div className="right-column">
              <div className="bst panel">
                <h2 className="section-title bst-title">Base stats</h2>
                <StatBars stats={pokemon.stats} />
              </div>

              <div className="generation-panel panel">
                <GenerationInfo generationProp={generation} />
              </div>
            </div>
          </div>
        )}

        {!isCardReady && !error && (
          <p className="game-placeholder">
            Press <strong>New Pokémon</strong> to start your round.
          </p>
        )}
      </div>

      {pokemon && (
        <div className="guess-section panel">
          <form onSubmit={submitGuess}>
            <div className="guess-row">
              <label className="visually-hidden" htmlFor="pokemon-guess">
                Guess the Pokémon
              </label>
              <input
                id="pokemon-guess"
                className="guess-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Who's that Pokémon?"
                autoComplete="off"
              />
              <button type="submit" className="btn btn-primary">
                Guess
              </button>
            </div>
          </form>
          {message && (
            <p className={`guess-message ${guessMessageClass(message)}`}>
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default PokemonCard;
