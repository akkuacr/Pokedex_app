import { useState } from "react";
import { useEffect } from "react";
import './PokemonList.css'

import axios from 'axios';
import Pokemon from "../Pokemon/Pokemon";




function PokemonList(){
    
    
 
   

    //ek concept ata h advance use state ka

    const [pokemonListState,setPokemonListState] = useState({
        pokemonList:[],
        isLoading:true,
        POKEDEX_URL:'https://pokeapi.co/api/v2/pokemon',
        nextUrl:'',
        prevUrl:''

    });





  async function  downloadPokemons(){
    
 //   setIsLoading(true);
     
    setPokemonListState({...pokemonListState,isLoading:true});
    



    const response = await axios.get(pokemonListState.POKEDEX_URL);//this downloads list of 20 pokemons
    const pokemonResults = response.data.results; // we get the array of pokemons from result
    
    console.log("response is this",response.data);
    console.log("after set",pokemonListState);
    setPokemonListState((state)=>({
        ...state,
        nextUrl:response.data.next,
        prevUrl:response.data.previous
    }));
    console.log("before set",pokemonListState);


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

    //agr tum ek sath multiple state ko re -render krna ho toh tum yeh kr skte ho
    //dek isme ho yeh rha tha na agr hum callback ko pass ni kr rhe the toh woh setPokemonList current state ko ni utha ra tha similar to case of overloading esa krke usne current state ko uthaya

    setPokemonListState((state)=>({
        ...state,
        pokemonList:res,
        isLoading:false}));



   

   }

  //array m yehi value paas kroge jiske change m use effect call hoga
    useEffect(()=>{
        downloadPokemons();
    },[pokemonListState.POKEDEX_URL]    
    );


     


    return(

        < div className="pokemon-List-wrapper">
           
            <div className="pokemon-wrapper">
            {(pokemonListState.isLoading)?'Loading...':
               pokemonListState.pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
            }
            </div>

            <div className="controls">
                <button disabled={pokemonListState.prevUrl == null}  onClick={()=>{
                    const nextUrlToSet = pokemonListState.prevUrl;
                    setPokemonListState({...pokemonListState,POKEDEX_URL:nextUrlToSet})
                    }} >Prev</button>
                <button disabled={pokemonListState.nextUrl == null}  onClick={()=>{
                      const nextUrlToSet = pokemonListState.nextUrl;
                    setPokemonListState({...pokemonListState,POKEDEX_URL:nextUrlToSet})
                   }} >Next</button>

            </div>
            
        </div>        

    )
}

export default PokemonList;
