import { getTypeStyle } from './statUtils';

function Types({ types = [] }) {
  return (
    <div>
      {types.map((typeObj) => {
        const typeName = typeObj.type.name;
        const { color } = getTypeStyle(typeName);

        return (
          <div key={typeName}>
            <p style={{ color }}>{typeName}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Types;