import { useState } from 'react';
import StatBars from './StatBars';
import Types from './Types';
import Shape from './Shape'; 
import Abilities from './Abilities';
import GenerationInfo from './GenerationInfo';
import getRandomMoves from './statUtils';
import { formatText } from './statUtils';
import Moveset from './Moveset';

function PokemonCard() {
  const [input, setInput] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [extraData, setExtraData] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [moveset, setMoveset] = useState([]);
  const [generationInfo, setGenerationInfo] = useState([]);
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

      const moves = await getMoveTypes(data.moves);
      setMoveset(moves);

      const generationInfo = await getGenerationInfo(extra.generation);
      setGenerationInfo(generationInfo);

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
      setMessage (`Wrong! The Pokemon is ${formatText(pokemon.name)}`)
    }

    }

  async function getMoveTypes(moves) {
    setMoveset([]);
    const randomMoves = getRandomMoves(moves, 4)
    const moveData = await Promise.all(
      randomMoves.map(async (moveObj) => {
        const res = await fetch(moveObj.move.url);
        const data = await res.json();

        return {
          name: data.name,
          type: data.type.name,
          power: data.power
        };
      })
    );

    return moveData;
  }

  async function getGenerationInfo(generation){
    setGenerationInfo([]);
    const res = await fetch(generation.url);
    const data = await res.json();
    const generationNum = (data.id)
    return generationNum
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
                <img src={`/shapes/${extraData.shape.name}.png`} />
              </div>

              <div className="type-panel">
                <Types types={pokemon.types} />
              </div>

            </div>

            {/* RIGHT SIDE (TOP) */}

            <div className="abilities-panel">
              <div className="abilities-title">
               Abilities
              </div>

              <div className="abilities-panel2">
                 <Abilities abilities={pokemon.abilities}/>
              </div>  
             
            </div>

          </div>

          {/* BOTTOM HALF */}
          <div className ="moveset-panel">
            <div className="moveset-title">
              Potential moveset
            </div>

            <div className = "moves-grid">
              <Moveset moveset = {moveset}></Moveset>
              {/*<div className = "move-panel"> penis </div>
              <div className = "move-panel"> schlock </div>
              <div className = "move-panel"> wang </div>
              <div className = "move-panel"> rod </div>*/}
            </div>

        </div>

        </div>

        <div className = "right-column">

              
          {/* Top element of right column (bst) */}
          <div className = "bst">
            <StatBars stats={pokemon.stats} />
          </div>

          {/* Bottom element of right column (region info) */}
          <div className = "generation-panel">
            <div className = "generation-text">
              <span> <GenerationInfo generationProp={generationInfo}/> </span>
            </div>
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