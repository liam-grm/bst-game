import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
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
  const [message, setMessage] = useState('');
  const [moveset, setMoveset] = useState([]);
  const [generation, setGeneration] = useState(null);
  const [loading, setLoading] = useState(false);



  const rollPokemon = useCallback(async () => {
    setLoading(true);
    setError('');
    setMessage('');
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

  const submitGuess = useCallback(
    (event) => {
      event.preventDefault();
      if (!pokemon) {
        return;
      }

      const guess = input.trim().toLowerCase();
      const answer = formatText(pokemon.name).toLowerCase();

      setMessage(
        guess === answer
          ? 'Correct!'
          : `Wrong! The Pokemon is ${formatText(pokemon.name)}`,
      );
    },
    [input, pokemon],
  );

  const isCardReady = Boolean(pokemon && species);

  return {
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
  };
}
