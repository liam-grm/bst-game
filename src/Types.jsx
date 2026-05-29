import { getTypeStyle } from './statUtils';

function Types({ types = [] }) {
  return (
    <p>
      {types.map((typeObj, index) => {
        const typeName = typeObj.type.name;
        const { color } = getTypeStyle(typeName);
        return (
          <span
            key={typeName}
            className = "type-label"
            style={{ color }}
          >
            {typeName.toUpperCase()}
            {index < types.length - 1 && ' '}
          </span>
        );
      })}
    </p>
  );
}

export default Types;