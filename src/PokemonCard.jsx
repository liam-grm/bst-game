import { useRef, useLayoutEffect, useState } from 'react';
import StatBars from './StatBars';
import Types from './Types';
import Shape from './Shape';
import GenerationInfo from './GenerationInfo';
import GuessResultModal from './GuessResultModal';
import RevealablePanel from './RevealablePanel';
import { usePokemonGame } from './hooks/usePokemonGame';
import { PANEL_COSTS } from './gameCosts';
import { formatText, getTypeStyle } from './statUtils';

function PokemonCard() {
  const {
    input,
    setInput,
    pokemon,
    species,
    error,
    moveset,
    generation,
    loading,
    guessing,
    hasGuessed,
    rollPokemon,
    submitGuess,
    isCardReady,
    resultModal,
    closeResultModal,
    pointsSpent,
    pointsRemaining,
    pointBudget,
    isRevealed,
    canAfford,
    revealPanel,
  } = usePokemonGame();

  const shapeRef = useRef(null);
  const [abilitiesHeight, setAbilitiesHeight] = useState(null);

  useLayoutEffect(() => {
    const shapeEl = shapeRef.current;
    if (!shapeEl || !isCardReady) {
      setAbilitiesHeight(null);
      return;
    }

    const syncHeight = () => {
      setAbilitiesHeight(shapeEl.offsetHeight);
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(shapeEl);
    return () => observer.disconnect();
  }, [isCardReady, pokemon, species]);

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
          <>
            <div className="points-hud panel" aria-live="polite">
              <span className="points-hud__spent">
                Points spent: <strong>{pointsSpent}</strong>
              </span>
              <span className="points-hud__remaining">
                {pointsRemaining} / {pointBudget} remaining
              </span>
            </div>

            <div className="information-card">
              <section className="left-top" aria-label="Pokémon profile">
                <div className="top-info-panel">
                  <div className="profile-row">
                    <div ref={shapeRef} className="profile-row__shape">
                      <RevealablePanel
                        panelId="shape"
                        cost={PANEL_COSTS.shape}
                        label="Shape"
                        revealed={isRevealed('shape')}
                        canAfford={canAfford(PANEL_COSTS.shape)}
                        onReveal={revealPanel}
                        className="shape-panel-wrap"
                      >
                        <div className="shape-panel panel">
                          <Shape shape={species.shape.name} />
                        </div>
                      </RevealablePanel>
                    </div>

                    <div
                      className="abilities-stack"
                      style={abilitiesHeight != null ? { height: `${abilitiesHeight}px` } : undefined}
                    >
                      <h2 className="section-title abilities-title">Abilities</h2>
                      <div className="ability-tiles">
                        {pokemon.abilities.map((entry, index) => (
                          <RevealablePanel
                            key={entry.ability.name}
                            panelId={`ability-${index}`}
                            cost={PANEL_COSTS.ability}
                            label="Ability"
                            revealed={isRevealed(`ability-${index}`)}
                            canAfford={canAfford(PANEL_COSTS.ability)}
                            onReveal={revealPanel}
                            className="ability-tile-wrap"
                          >
                            <div className="ability-tile panel">
                              {formatText(entry.ability.name)}
                            </div>
                          </RevealablePanel>
                        ))}
                      </div>
                    </div>
                  </div>

                  <RevealablePanel
                    panelId="type"
                    cost={PANEL_COSTS.type}
                    label="Type"
                    revealed={isRevealed('type')}
                    canAfford={canAfford(PANEL_COSTS.type)}
                    onReveal={revealPanel}
                  >
                    <div className="types-row panel">
                      <Types types={pokemon.types} />
                    </div>
                  </RevealablePanel>
                </div>
              </section>

              <h2 className="moveset-title section-title">Potential moveset</h2>

              <div className="moves-grid panel" aria-label="Potential moveset">
                {moveset.map((move, index) => (
                  <RevealablePanel
                    key={move.name}
                    panelId={`move-${index}`}
                    cost={PANEL_COSTS.move}
                    label="Move"
                    revealed={isRevealed(`move-${index}`)}
                    canAfford={canAfford(PANEL_COSTS.move)}
                    onReveal={revealPanel}
                  >
                    <div
                      className="move-panel"
                      style={{ backgroundColor: getTypeStyle(move.type).color }}
                    >
                      {formatText(move.name)}
                    </div>
                  </RevealablePanel>
                ))}
              </div>

              <div className="right-column">
                <div className="bst panel">
                  <h2 className="section-title bst-title">Base stats</h2>
                  <StatBars stats={pokemon.stats} />
                </div>

                <RevealablePanel
                  panelId="generation"
                  cost={PANEL_COSTS.generation}
                  label="Generation"
                  revealed={isRevealed('generation')}
                  canAfford={canAfford(PANEL_COSTS.generation)}
                  onReveal={revealPanel}
                >
                  <div className="generation-panel panel">
                    <GenerationInfo generationProp={generation} />
                  </div>
                </RevealablePanel>
              </div>
            </div>
          </>
        )}

        {!isCardReady && !error && (
          <p className="game-placeholder">
            Press <strong>New Pokémon</strong> to start your round.
          </p>
        )}
      </div>

      {pokemon && (
        <div className={`guess-section panel${hasGuessed ? ' guess-section--locked' : ''}`}>
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
                placeholder={hasGuessed ? 'Roll a new Pokémon to guess again' : "Who's that Pokémon?"}
                autoComplete="off"
                disabled={guessing || hasGuessed}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={guessing || hasGuessed}
              >
                {guessing ? 'Checking…' : 'Guess'}
              </button>
            </div>
          </form>
        </div>
      )}

      <GuessResultModal result={resultModal} onClose={closeResultModal} />
    </div>
  );
}

export default PokemonCard;
