import { formatText, getTypeStyle } from './statUtils';

function Moveset({ moveset = [] }) {
  return (
    <>
      {moveset.map((move) => (
        <div
          key={move.name}
          className="move-panel"
          style={{ backgroundColor: getTypeStyle(move.type).color }}
        >
          {formatText(move.name)}
        </div>
      ))}
    </>
  );
}

export default Moveset;
