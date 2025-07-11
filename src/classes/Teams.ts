import { WriteInTextArea } from "../Gameplay/Display"
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
        this.pokemons.push(new Pokemon("LAPRAS"))
        this.pokemons.push(new Pokemon("VENUSAURE"))
        WriteInTextArea("Team Red has been created !")
    }
    
    CreateTeamBlue() {
        this.pokemons.push(new Pokemon("TAUROS"))
        this.pokemons.push(new Pokemon("EXEGGUTOR"))
        this.pokemons.push(new Pokemon("CHARIZARD"))
        WriteInTextArea("Team Blue has been created !")
    }
    
    CreateTeamLeaf() {
        this.pokemons.push(new Pokemon("CLEFABLE"))
        this.pokemons.push(new Pokemon("GENGAR"))
        this.pokemons.push(new Pokemon("BLASTOISE"))
        WriteInTextArea("Team Leaf has been created !")
    }

    CheckTeamKO() {
        for (const pokemon of this.pokemons) {
            if (pokemon.GetKO() === false)
                return(false)
        }
        return(true)
    }
}