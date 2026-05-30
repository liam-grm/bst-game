import {formatText} from './statUtils';

function Abilities({ abilities = [] }) {
  return (
    <div>
      {abilities.map((ability) => (
        <p key={ability.ability.name}>
          {formatText(ability.ability.name)}
        </p>
      ))}
    </div>
  );
}

export default Abilities;