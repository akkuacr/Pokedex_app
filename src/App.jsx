import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Pokedex from './Components/Pokedex/Pokedex'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'

function App() {
  

  return (
  <div className='outer-pokedex'>
       <h1 id="pokedex-heading">
         <Link to ="/">Pokedox</Link>    
        </h1>
     <CustomRoutes></CustomRoutes>
  
  </div>

    
  )
}

export default App
