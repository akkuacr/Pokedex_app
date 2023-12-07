import { useState } from "react";
import { useEffect } from "react";
import './PokemonList.css'

import axios from 'axios';
import Pokemon from "../Pokemon/Pokemon";




function PokemonList(){
  
    const [PokemonList,setPokemonList] = useState([]);
    
    const [isLoading,setIsLoading] = useState(true);

   const POKEDEX_URL= 'https://pokeapi.co/api/v2/pokemon';
   
  async function  downloadPokemons(){
    
    const response = await axios.get(POKEDEX_URL);//this downloads list of 20 pokemons
    const pokemonResults = response.data.results; // we get the array of pokemons from result
    
    //iterating over the array of pokemons,and using their url ,to create an array of promises
    //that will download those 20 pokemons
    const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url));
    
    //passing that promise array to axios.all
    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);
    

    //now iterate on the data of each pokemon,and extract id,name,image ,types
    const res =  pokemonData.map((pokeData)=>{
        const pokemon = pokeData.data;
        return {
                id:pokemon.id,
                name:pokemon.name,
                image:(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny ,
                types:pokemon.types
               };


    }
    );
    console.log(res);

    setPokemonList(res);



    setIsLoading(false);

   }

  //array m yehi value paas kroge jiske change m use effect call hoga
    useEffect(()=>{
        downloadPokemons();
    },[]    
    )


     


    return(

        <div className="pokemon-List-wrapper">
           <div>pokemon List</div>  
            {(isLoading)?'Loading':
               PokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} />)
            }
        </div>        

    )
}

export default PokemonList;