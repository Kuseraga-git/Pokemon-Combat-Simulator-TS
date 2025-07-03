import { Pokemon } from "../classes/Pokemon";
import { Game } from "../classes/Game";
import { Pokemon_Types } from "../data/Pokemon_Types";
import { Weather } from "../data/Weather";
import { WriteInTextArea } from "./Display";

export function WeatherDamage(GameInstance : Game, Pokemon1 : Pokemon, Pokemon2 : Pokemon) {
    if (GameInstance.GetWeatherTurn() > 0) {
        const SandRes : Pokemon_Types[] = [Pokemon_Types.ROCK, Pokemon_Types.STEEL, Pokemon_Types.GROUND]
        if (GameInstance.GetWeather() === Weather.SANDSTORM) {
            if (!(SandRes.includes(Pokemon1.getPokemonTypes()[0] || SandRes.includes(Pokemon1.getPokemonTypes()[1])))) {
                WriteInTextArea(`${Pokemon1.GetName()} takes damages from Sandstorm !`)
                Pokemon1.SetLP(Pokemon1.GetLP() - Math.floor(Pokemon1.GetLP() * 1/16))
            }
            if (!(SandRes.includes(Pokemon2.getPokemonTypes()[0] || SandRes.includes(Pokemon2.getPokemonTypes()[1])))) {
                WriteInTextArea(`${Pokemon2.GetName()} takes damages from Sandstorm !`)
                Pokemon2.SetLP(Pokemon2.GetLP() - Math.floor(Pokemon2.GetLP() * 1/16))
            }
        }
        if (GameInstance.GetWeather() === Weather.HAIL) {
            if (Pokemon1.getPokemonTypes()[0] !== Pokemon_Types.ICE || Pokemon1.getPokemonTypes()[1] !== Pokemon_Types.ICE) {
                WriteInTextArea(`${Pokemon1.GetName()} takes damages from Hail !`)
                Pokemon1.SetLP(Pokemon1.GetLP() - Math.floor(Pokemon1.GetLP() * 1/16))
            }
            if (Pokemon2.getPokemonTypes()[0] !== Pokemon_Types.ICE || Pokemon2.getPokemonTypes()[1] !== Pokemon_Types.ICE) {
                WriteInTextArea(`${Pokemon2.GetName()} takes damages from Hail !`)
                Pokemon2.SetLP(Pokemon2.GetLP() - Math.floor(Pokemon2.GetLP() * 1/16))
            }
        }
        GameInstance.SetWeatherTurn(GameInstance.GetWeatherTurn() - 1)
    } else if (GameInstance.GetWeather() !== Weather.None) {
        NeutralWeather(GameInstance)
    }
}

export function NeutralWeather(GameInstance : Game) {
    if (GameInstance.GetWeather() !== Weather.None) {
        WriteInTextArea(`The weather turns calm again !`)
        switch (GameInstance.GetWeather()) {
            case Weather.SANDSTORM:
                RemoveSandstorm(GameInstance);
                break;
            case Weather.HAIL:
                RemoveHail(GameInstance)
                break;
            default:
                break;
        }
        (document.getElementById("meteo") as HTMLImageElement).src = ""
        GameInstance.SetWeather(Weather.None)
        GameInstance.SetWeatherTurn(0)
    }
}

export function RemoveSandstorm(GameInstance : Game) {
    if (GameInstance.GetTeams()[0].GetPokemon(GameInstance.GetIndexPokemon1()).getPokemonTypes()[0] === Pokemon_Types.ROCK ||
        GameInstance.GetTeams()[0].GetPokemon(GameInstance.GetIndexPokemon1()).getPokemonTypes()[1] === Pokemon_Types.ROCK) {
        GameInstance.GetTeams()[0].GetPokemon(GameInstance.GetIndexPokemon1()).SetStatLevel(
            'SpeDef',
            GameInstance.GetTeams()[0].GetPokemon(GameInstance.GetIndexPokemon1()).GetStatLevel('SpeDef') - 1)
    }
    if (GameInstance.GetTeams()[1].GetPokemon(GameInstance.GetIndexPokemon2()).getPokemonTypes()[0] === Pokemon_Types.ROCK ||
        GameInstance.GetTeams()[1].GetPokemon(GameInstance.GetIndexPokemon2()).getPokemonTypes()[1] === Pokemon_Types.ROCK) {
        GameInstance.GetTeams()[1].GetPokemon(GameInstance.GetIndexPokemon2()).SetStatLevel(
            'SpeDef',
            GameInstance.GetTeams()[1].GetPokemon(GameInstance.GetIndexPokemon2()).GetStatLevel('SpeDef') - 1)
    }
}

export function RemoveHail(GameInstance : Game) {
    if (GameInstance.GetTeams()[0].GetPokemon(GameInstance.GetIndexPokemon1()).getPokemonTypes()[0] === Pokemon_Types.ICE ||
        GameInstance.GetTeams()[0].GetPokemon(GameInstance.GetIndexPokemon1()).getPokemonTypes()[1] === Pokemon_Types.ICE) {
        GameInstance.GetTeams()[0].GetPokemon(GameInstance.GetIndexPokemon1()).SetStatLevel(
            'Def',
            GameInstance.GetTeams()[0].GetPokemon(GameInstance.GetIndexPokemon1()).GetStatLevel('Def') - 1)
    }
    if (GameInstance.GetTeams()[1].GetPokemon(GameInstance.GetIndexPokemon2()).getPokemonTypes()[0] === Pokemon_Types.ICE ||
        GameInstance.GetTeams()[1].GetPokemon(GameInstance.GetIndexPokemon2()).getPokemonTypes()[1] === Pokemon_Types.ICE) {
        GameInstance.GetTeams()[1].GetPokemon(GameInstance.GetIndexPokemon2()).SetStatLevel(
            'Def',
            GameInstance.GetTeams()[1].GetPokemon(GameInstance.GetIndexPokemon2()).GetStatLevel('Def') - 1)
    }
}