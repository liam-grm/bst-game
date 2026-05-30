export function getStatStyle(statValue) {
    const width = Math.min((statValue / 255) * 600, 600);

  let color = 'red';
  if (statValue >= 150) color = 'cyan';
  else if (statValue >= 120) color = 'forestgreen';
  else if (statValue >= 90) color = 'greenyellow';
  else if (statValue >= 60) color = 'yellow';
  else if (statValue >= 30) color = 'orange';

  return { width, color };
}

export function getTypeStyle(typeValue) {
  let color = 'black';

  if (['normal'].includes(typeValue)) color = '#C6C3A5';
  else if (['fire'].includes(typeValue)) color = '#FF612C';
  else if (['water'].includes(typeValue)) color = 'deepskyblue';
  else if (['electric'].includes(typeValue)) color = 'gold';
  else if (['grass'].includes(typeValue)) color = '#3fa129';
  else if (['ice'].includes(typeValue)) color = '#A0F8F8';
  else if (['fighting'].includes(typeValue)) color = '#cb5f48 ';
  else if (['poison'].includes(typeValue)) color = '#b468b7 ';
  else if (['ground'].includes(typeValue)) color = '#E7BD6B';
  else if (['flying'].includes(typeValue)) color = '#9CADF7 ';
  else if (['psychic'].includes(typeValue)) color = 'hotpink';
  else if (['bug'].includes(typeValue)) color = '#ADBD21';
  else if (['rock'].includes(typeValue)) color = '#B8A038';
  else if (['ghost'].includes(typeValue)) color = '#846ab6 ';
  else if (['dragon'].includes(typeValue)) color = '#7038F8 ';
  else if (['dark'].includes(typeValue)) color = '#705849 ';
  else if (['steel'].includes(typeValue)) color = '#BDBDD6 ';
  else if (['fairy'].includes(typeValue)) color = 'pink';
  

  return { color };
}

function getRandomMoves(moves, count = 4) {
  const shuffled = [...moves].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default getRandomMoves

export function formatText(text) {
  return text
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
    
}