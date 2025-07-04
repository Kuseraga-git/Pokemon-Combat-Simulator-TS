import { CanAttack } from "../Gameplay/Offense";
import { Weather } from "../data/Weather";
import { Pokemon } from "./Pokemon";
import { Teams } from "./Teams";
import { EndRound } from "../Gameplay/Utils";
import { ResetTextArea, WriteInTextArea } from "../Gameplay/Display";

export class Game {
    private Teams : Teams[]
    private IndexPokemon1 : number
    private IndexPokemon2 : number
    private Weather : Weather
    private WeatherTurn : number
    private RoundNB : number

    constructor() {
        this.Teams = []
        this.IndexPokemon1 = 0
        this.IndexPokemon2 = 0
        this.Weather = Weather.None
        this.WeatherTurn = 0
        this.RoundNB = 1
    }

    AddTeam(Team : Teams) {
        this.Teams.push(Team)
    }

    GetTeams() : Teams[] {
        return(this.Teams)
    }

    GetIndexPokemon1() : number {
        return(this.IndexPokemon1)
    }

    SetIndexPokemon1(value : number) {
        this.IndexPokemon1 = value
    }

    GetIndexPokemon2() : number {
        return(this.IndexPokemon2)
    }

    SetIndexPokemon2(value : number) {
        this.IndexPokemon2 = value
    }

    NewTurn() {
        ResetTextArea()
        WriteInTextArea(`Round n°${this.RoundNB}<br>`)
        this.RoundNB+=1;
    }

    CombatAction(Choice1 : number, IndexNewPokemon1 : number = 0) {
        let pokemon1 : Pokemon = this.Teams[0].pokemons[this.IndexPokemon1]
        let pokemon2 : Pokemon = this.Teams[1].pokemons[this.IndexPokemon2]
        const randValue : number = Math.floor(Math.random() * 4)

        if (Choice1 == 4) {
            if (pokemon1.GetKO()) {
                if (this.Teams[0].pokemons[this.IndexPokemon1].GetKO() === false && IndexNewPokemon1 != this.IndexPokemon1) {
                    pokemon1.SetPoisonTurn(0)
                    this.IndexPokemon1 = IndexNewPokemon1
                    pokemon1 = this.Teams[0].pokemons[IndexNewPokemon1]
                    pokemon1.PopInBattle(this)
                } else {return}
            } else {
                if (this.Teams[0].pokemons[this.IndexPokemon1].GetKO() === false && IndexNewPokemon1 != this.IndexPokemon1) {
                    this.NewTurn()
                    pokemon1.SetPoisonTurn(0)
                    this.IndexPokemon1 = IndexNewPokemon1
                    pokemon1 = this.Teams[0].pokemons[IndexNewPokemon1]
                    pokemon1.PopInBattle(this)
                    if (CanAttack(this, pokemon2, pokemon2.GetMove(randValue), pokemon1, randValue) == true) {
                        pokemon2.UseMove(this, randValue, pokemon1)
                    }
                } else {return}
            }
        } else if (pokemon1.GetKO() === false && pokemon2.GetKO() === false) {
            this.NewTurn()
            if (pokemon1.GetStatValue('Speed') >= pokemon2.GetStatValue('Speed')) { // ajouter un || attaque P1.priolevel > Attaque P2.priolevel
                if (CanAttack(this, pokemon1, pokemon1.GetMove(Choice1), pokemon2, Choice1)) {
                    pokemon1.UseMove(this, Choice1, pokemon2)
                }
                if (pokemon2.GetKO() === false && pokemon1.GetKO() === false) {
                    if (CanAttack(this, pokemon2, pokemon2.GetMove(randValue), pokemon1, randValue)) {
                        pokemon2.UseMove(this, randValue, pokemon1)
                    }
                }
            } else {
                if (CanAttack(this, pokemon2, pokemon2.GetMove(randValue), pokemon1, randValue)) {
                    pokemon2.UseMove(this, randValue, pokemon1)
                }
                if (pokemon2.GetKO() === false && pokemon1.GetKO() === false) {
                    if (CanAttack(this, pokemon1, pokemon1.GetMove(Choice1), pokemon2, Choice1)) {
                        pokemon1.UseMove(this, Choice1, pokemon2)
                    }
                }
            }
        } else {return}
        EndRound(this, pokemon1, pokemon2)
        if (this.Teams[0].CheckTeamKO() && this.Teams[1].CheckTeamKO()) {
            setTimeout(alert, 500, `Draw !!!`)
        } else if (pokemon2.GetKO()) {
            if (this.Teams[1].CheckTeamKO() === false) {
                this.IndexPokemon2 += 1
                pokemon2 = this.Teams[1].pokemons[this.IndexPokemon2]
                //DisplayPokemon2(pokemon2)
            } else {
                setTimeout(alert, 500, `${this.Teams[0].GetTrainer()} Win ! !!!`);
            }
        } else if (this.Teams[0].CheckTeamKO()) {
            setTimeout(alert, 500, `${this.Teams[1].GetTrainer()} Win ! !!!`);
        }
    }

    GetWeather() : Weather {
        return(this.Weather)
    }

    SetWeather(value : Weather) {
        this.Weather = value
    }

    GetWeatherTurn() : number {
        return(this.WeatherTurn)
    }

    SetWeatherTurn(value : number) {
        this.WeatherTurn = value
    }
}