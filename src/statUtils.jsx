export const MAX_BASE_STAT = 255;

/** Fill ratio for stat bars: 255 → 100%, 127.5 → 50%, etc. */
export function getStatBarFillPercent(statValue) {
  const ratio = Math.min(statValue / MAX_BASE_STAT, 1);
  return `${ratio * 100}%`;
}

export function getStatStyle(statValue) {
  let color = 'red';
  if (statValue >= 150) color = 'cyan';
  else if (statValue >= 120) color = 'forestgreen';
  else if (statValue >= 90) color = 'greenyellow';
  else if (statValue >= 60) color = 'yellow';
  else if (statValue >= 30) color = 'orange';

  return {
    fillPercent: getStatBarFillPercent(statValue),
    color,
  };
}
export function getTypeStyle(typeValue) {
  const typeColors = {
    normal: '#C6C3A5',
    fire: '#FF612C',
    water: 'deepskyblue',
    electric: '#e5c531',
    grass: '#3fa129',
    ice: '#A0F8F8',
    fighting: '#cb5f48',
    poison: '#b468b7',
    ground: '#E7BD6B',
    flying: '#9CADF7',
    psychic: 'hotpink',
    bug: '#ADBD21',
    rock: '#B8A038',
    ghost: '#846ab6',
    dragon: '#7038F8',
    dark: '#705849',
    steel: '#BDBDD6',
    fairy: 'pink',
  };

  return { color: typeColors[typeValue] ?? 'black' };
}

export function getRandomMoves(moves, count = 4) {
  const shuffled = [...moves].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default getRandomMoves;

export function formatText(text) {
  return text
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
