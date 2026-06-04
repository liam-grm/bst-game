import { getTypeStyle } from './statUtils';

function Types({ types = [] }) {
  return (
    <ul className="type-list">
      {types.map((typeObj) => {
        const typeName = typeObj.type.name;
        const { color } = getTypeStyle(typeName);

        return (
          <li
            key={typeName}
            className="type-badge"
            style={{ backgroundColor: color }}
          >
            {typeName}
          </li>
        );
      })}
    </ul>
  );
}

export default Types;
