import { Pokemon } from "../classes/pokemon"
import { Pokemon_Types } from "../datas/pokemonTypes"
import { StatutEnum } from "../datas/statuts"

export function ApplyStatut(Pokemon : Pokemon, Statut : StatutEnum) {
    if (Pokemon.GetStatut() === StatutEnum.None) {
        if (Statut === StatutEnum.BURN && !(Pokemon.getPokemonTypes().includes(Pokemon_Types.FIRE))) {
            Pokemon.SetStatut(Statut)
            BurnEffect(Pokemon)
        } else if (Statut === StatutEnum.FREEZE && !(Pokemon.getPokemonTypes().includes(Pokemon_Types.ICE))) {
            Pokemon.SetStatut(Statut)
        } else if (Statut === StatutEnum.PARALYZE && !(Pokemon.getPokemonTypes().includes(Pokemon_Types.ELECTRICK))) {
            Pokemon.SetStatut(Statut)
            ParalyzeEffect(Pokemon)
        } else if (Statut === StatutEnum.POISONED && !(Pokemon.getPokemonTypes().includes(Pokemon_Types.POISON) || Pokemon.getPokemonTypes().includes(Pokemon_Types.STEEL))) {
            Pokemon.SetStatut(Statut)
        } else if (Statut === StatutEnum.SLEEP) {
            Pokemon.SetStatut(Statut)
        }
    }
}

export function ApplyConfusion(Pokemon : Pokemon) {
    if (!Pokemon.GetConfusion()) {
        Pokemon.SetConfusion(true)
    }
}

export function ApplyFear(Pokemon : Pokemon) {
    Pokemon.SetFear(true)
}

function BurnEffect(Pokemon : Pokemon) {
    Pokemon.SetRawStat('Att', Pokemon.GetRawStat('Att') / 2)
}

function ParalyzeEffect(Pokemon : Pokemon) {
    Pokemon.SetRawStat('Speed', Pokemon.GetRawStat('Speed') / 2)
}