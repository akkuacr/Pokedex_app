import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";

//Css import

import './Pokedex.css'

function Pokedex(){
   
    return (
        <div className="pokedex-wrapper" >
           <h1 id="pokedex-heading">Pokedox</h1>  
        <Search/>

        <PokemonList/>
        </div>

    )
}

export default Pokedex;