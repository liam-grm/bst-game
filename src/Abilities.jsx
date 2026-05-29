function Abilities({ abilities = [] }) {
  return (
    <div>
      {abilities.map((ability) => (
        <p key={ability.ability.name}>
          {ability.ability.name}
        </p>
      ))}
    </div>
  );
}

export default Abilities;