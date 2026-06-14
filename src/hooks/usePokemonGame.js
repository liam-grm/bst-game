import { useCallback, useState } from 'react';
import { recordGuess } from '../api/guessApi';
import { POINT_BUDGET } from '../gameCosts';
import getRandomMoves, { formatText } from '../statUtils';

const MAX_POKEMON_ID = 1025;

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Not found');
  }
  return response.json();
}

async function fetchMoveDetails(moves) {
  const randomMoves = getRandomMoves(moves, 4);
  return Promise.all(
    randomMoves.map(async (moveRef) => {
      const data = await fetchJson(moveRef.move.url);
      return {
        name: data.name,
        type: data.type.name,
        power: data.power,
      };
    }),
  );
}

async function fetchGenerationNumber(generationRef) {
  const data = await fetchJson(generationRef.url);
  return data.id;
}

export function usePokemonGame() {
  const [input, setInput] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [error, setError] = useState('');
  const [moveset, setMoveset] = useState([]);
  const [generation, setGeneration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [guessing, setGuessing] = useState(false);
  const [hasGuessed, setHasGuessed] = useState(false);
  const [resultModal, setResultModal] = useState(null);
  const [pointsSpent, setPointsSpent] = useState(0);
  const [revealedPanels, setRevealedPanels] = useState(() => new Set());

  const rollPokemon = useCallback(async () => {
    setLoading(true);
    setError('');
    setResultModal(null);
    setHasGuessed(false);
    setPointsSpent(0);
    setRevealedPanels(new Set());
    setInput('');
    setPokemon(null);
    setSpecies(null);
    setMoveset([]);
    setGeneration(null);

    const randomId = Math.floor(Math.random() * MAX_POKEMON_ID);

    try {
      const pokemonData = await fetchJson(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`,
      );
      const speciesData = await fetchJson(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`,
      );
      const [moves, generationNumber] = await Promise.all([
        fetchMoveDetails(pokemonData.moves),
        fetchGenerationNumber(speciesData.generation),
      ]);

      setPokemon(pokemonData);
      setSpecies(speciesData);
      setMoveset(moves);
      setGeneration(generationNumber);
    } catch {
      setError('Pokemon not found');
    } finally {
      setLoading(false);
    }
  }, []);

  const isRevealed = useCallback(
    (panelId) => revealedPanels.has(panelId),
    [revealedPanels],
  );

  const canAfford = useCallback(
    (cost) => pointsSpent + cost <= POINT_BUDGET,
    [pointsSpent],
  );

  const revealPanel = useCallback(
    (panelId, cost) => {
      if (revealedPanels.has(panelId) || pointsSpent + cost > POINT_BUDGET) {
        return;
      }

      setRevealedPanels((prev) => new Set(prev).add(panelId));
      setPointsSpent((prev) => prev + cost);
    },
    [revealedPanels, pointsSpent],
  );

  const submitGuess = useCallback(
    async (event) => {
      event.preventDefault();
      if (!pokemon || guessing || hasGuessed) {
        return;
      }

      const guess = input.trim().toLowerCase();
      const answer = formatText(pokemon.name).toLowerCase();
      const correct = guess === answer;

      setGuessing(true);
      try {
        const data = await recordGuess(pokemon.name, correct);
        setResultModal({
          correct,
          pokemon,
          globalStats: data.global_stats,
          pokemonStats: data.pokemon_stats,
        });
      } catch {
        setResultModal({
          correct,
          pokemon,
          globalStats: null,
          pokemonStats: null,
        });
      } finally {
        setGuessing(false);
        setHasGuessed(true);
      }
    },
    [input, pokemon, guessing, hasGuessed],
  );

  const closeResultModal = useCallback(() => setResultModal(null), []);

  const isCardReady = Boolean(pokemon && species);
  const pointsRemaining = POINT_BUDGET - pointsSpent;

  return {
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
    pointBudget: POINT_BUDGET,
    isRevealed,
    canAfford,
    revealPanel,
  };
}
