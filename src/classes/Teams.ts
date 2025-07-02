import { Pokemon } from "./Pokemon"

export class Teams {
    private readonly trainer : string
    public pokemons : Pokemon[] = []

    constructor(name : string) {
        this.trainer = name
    }

    GetPokemons() : Pokemon[] {
        return(this.pokemons)
    }

    GetPokemon(index : number) : Pokemon {
        return(this.pokemons[index])
    }

    GetTrainer() : string {
        return(this.trainer)
    }

    CreateTeamRed() {
        this.pokemons.push(new Pokemon("PIKACHU"))
        this.pokemons.push(new Pokemon("FLORIZARRE"))
        this.pokemons.push(new Pokemon("LOKHLASS"))
        console.log("Team Red has been created !")
    }

    CheckTeamKO() {
        for (const pokemon of this.pokemons) {
            if (pokemon.GetKO() === false)
                return(false)
        }
        return(true)
    }
}