import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AnswerForm from './AnswerForm';
import PokemonCard from './PokemonCard';

function App() {
  return (
    <div className='app'>
      <h1>The BST Game</h1>
      <PokemonCard/>
    </div>
  )
}

export default App
