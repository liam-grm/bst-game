import { formatText } from './statUtils';

function Abilities({ abilities = [] }) {
  return (
    <ul className="ability-list">
      {abilities.map((entry) => (
        <li key={entry.ability.name}>
          {formatText(entry.ability.name)}
        </li>
      ))}
    </ul>
  );
}

export default Abilities;
