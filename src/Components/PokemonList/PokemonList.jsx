import { useState } from "react";
import { useEffect } from "react";
import './PokemonList.css'

import axios from 'axios';
import Pokemon from "../Pokemon/Pokemon";




function PokemonList(){
    
    

    const [PokemonList,setPokemonList] = useState([]);
    
    const [isLoading,setIsLoading] = useState(true);

   const [POKEDEX_URL,setPokedexUrl]= useState('https://pokeapi.co/api/v2/pokemon');
   const [nextUrl,setNextUrl] =useState('');
   const [prevUrl,setPrevUrl] =useState('');
  async function  downloadPokemons(){
    
    setIsLoading(true);
    const response = await axios.get(POKEDEX_URL);//this downloads list of 20 pokemons
    const pokemonResults = response.data.results; // we get the array of pokemons from result
    
    console.log(response.data);
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);



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
    },[POKEDEX_URL]    
    )


     


    return(

        < div className="pokemon-List-wrapper">
           
            <div className="pokemon-wrapper">
            {(isLoading)?'Loading...':
               PokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
            }
            </div>

            <div className="controls">
                <button disabled={prevUrl == null}  onClick={()=>{setPokedexUrl(prevUrl)}} >Prev</button>
                <button disabled={nextUrl == null}  onClick={()=>{setPokedexUrl(nextUrl)}}>Next</button>

            </div>
            
        </div>        

    )
}

export default PokemonList;