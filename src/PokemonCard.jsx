import { useState } from 'react';
import StatBars from './StatBars';
import Types from './Types'

function PokemonCard() {
  const [input, setInput] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [extraData, setExtraData] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('')
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);

  // Function to handle generating/fetching the pokemon
  async function handleClick(e) {
    e.preventDefault();
    setError('');
    setPokemon(null);
    setExtraData(null);
    setMessage('');

    const max = 1025;
    const rand = (Math.floor(Math.random() * max));


    try {
      const pokemon_res = await fetch(`https://pokeapi.co/api/v2/pokemon/${rand}`);
      if (!pokemon_res.ok) throw new Error('Not found');
      const data = await pokemon_res.json();
      setPokemon(data);

      const species_res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data && data.id}`);
      if (!species_res.ok) throw new Error('Not found');
      const extra = await species_res.json();
      setExtraData(extra);

    } catch {
      setError('Pokemon not found');
    }

  }

  // Function to handle the submission of user's answer

  async function handleSubmit(e){
    e.preventDefault();


    if ((input.toLowerCase()) === pokemon.name){
      setMessage ('Correct!')
    }
    else{
      setMessage (`Wrong! The Pokemon is ${pokemon.name}`)
    }

    }

  // MAIN DIV

  return (
 
    <div className = "page-layout">  {/* This div is the high-level container */}

    <button onClick={handleClick} title="Test Me" color="#841584"> Test Me </button> 

    <div className = "information-card"> 
      
      {error && <p>{error}</p>}

      {/*With the fetched data, handle the card*/}
      {pokemon && extraData && (
      <>


        {/* LEFT SIDE */}
        <div className="left-column">

          {/* TOP HALF */}
          <div className="top-info-panel">

            {/* LEFT SIDE (TOP)*/}
            <div className="shape-type-panel">

              <div className="shape-panel">
                Shape
              </div>

              <div className="type-panel">
                <Types types={pokemon.types} />
              </div>

            </div>

            {/* RIGHT SIDE (TOP) */}
            <div className="abilities-panel">
              Abilities
            </div>

          </div>

          {/* BOTTOM HALF */}
          <div className ="moveset-panel">
            <div className="moveset-title">
              Potential moveset
            </div>

            <div className = "moves-grid">
              <div className = "move-panel"> penis </div>
              <div className = "move-panel"> schlock </div>
              <div className = "move-panel"> wang </div>
              <div className = "move-panel"> rod </div>
            </div>

        </div>

        </div>

        <div className = "right-column">

          <div className = "bst">
            <StatBars stats={pokemon.stats} />
          </div>
          
        </div>

        
        {/* {pokemon.types.map((type) => (
        <p key={type.type.name}>
          {type.type.name}
        </p>
        ))} */}

      </>
      )}

    {/* Empty class */}

    







    </div>

    <div className = "guess-section">
    {/* Answer Form */}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Guess</button>
      </form>
      <div>
        {message}
      </div>
    </div>

    </div>
  );
}

export default PokemonCard