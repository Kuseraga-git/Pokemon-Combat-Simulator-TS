import { IPokemon, Pokedex } from "../datas/pokedex"
import { Pokemon } from "./pokemon"

export class Teams {
    private readonly Trainer : string
    public Pokemons : Pokemon[] = []

    constructor(name : string) {
        this.Trainer = name
    }

    GetPokemons() : Pokemon[] {
        return(this.Pokemons)
    }

    GetPokemon(index : number) : Pokemon {
        return(this.Pokemons[index])
    }

    GetTrainer() : string {
        return(this.Trainer)
    }

    AddPokemon(NewPokemon : IPokemon) {
        this.Pokemons.push(new Pokemon(NewPokemon))
    }

    CreateTeamRed() {
        this.Pokemons.push(new Pokemon(Pokedex.PIKACHU))
        this.Pokemons.push(new Pokemon(Pokedex.LAPRAS))
        this.Pokemons.push(new Pokemon(Pokedex.VENUSAURE))
    }
    
    CreateTeamBlue() {
        this.Pokemons.push(new Pokemon(Pokedex.TAUROS))
        this.Pokemons.push(new Pokemon(Pokedex.EXEGGUTOR))
        this.Pokemons.push(new Pokemon(Pokedex.CHARIZARD))
    }
    
    CreateTeamLeaf() {
        this.Pokemons.push(new Pokemon(Pokedex.CLEFABLE))
        this.Pokemons.push(new Pokemon(Pokedex.GENGAR))
        this.Pokemons.push(new Pokemon(Pokedex.BLASTOISE))
    }

    CheckTeamKO() {
        for (const pokemon of this.Pokemons) {
            if (pokemon.GetKO() === false)
                return(false)
        }
        return(true)
    }
}