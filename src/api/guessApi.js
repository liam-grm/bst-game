const API_BASE = '/api';
export async function recordGuess(pokemon, correct) {
  const response = await fetch(`${API_BASE}/guessAttempts/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pokemon: pokemon.toLowerCase(), correct }),
  });
  if (!response.ok) {
    throw new Error('Failed to record guess');
  }
  return response.json();
}