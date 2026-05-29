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

  if (['normal'].includes(typeValue)) color = 'lightgray';
  else if (['fire'].includes(typeValue)) color = 'red';
  else if (['water'].includes(typeValue)) color = 'deepskyblue';
  else if (['electric'].includes(typeValue)) color = 'gold';
  else if (['grass'].includes(typeValue)) color = 'green';
  else if (['ice'].includes(typeValue)) color = 'lightblue';
  else if (['fighting'].includes(typeValue)) color = 'brown';
  else if (['poison'].includes(typeValue)) color = 'purple';
  else if (['ground'].includes(typeValue)) color = 'sandybrown';
  else if (['flying'].includes(typeValue)) color = 'skyblue';
  else if (['psychic'].includes(typeValue)) color = 'hotpink';
  else if (['bug'].includes(typeValue)) color = 'chartreuse';
  else if (['rock'].includes(typeValue)) color = 'darkgoldenrod';
  else if (['ghost'].includes(typeValue)) color = 'indigo';
  else if (['dragon'].includes(typeValue)) color = 'darkblue';
  else if (['dark'].includes(typeValue)) color = 'black';
  else if (['steel'].includes(typeValue)) color = 'silver';
  else if (['fairy'].includes(typeValue)) color = 'pink';
  

  return { color };
}