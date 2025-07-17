import { Game } from "../classes/game"
import { Pokemon } from "../classes/pokemon"

export function ComputeConfusionDamage(Pokemon : Pokemon) {
    let result : number = 40
    result = result * (40 * (Pokemon.GetStatValue('Att'))/ 50.0)
    result = result / (Pokemon.GetStatValue('Def')) + 2.0
    return(Math.trunc(result))
}

export function ComputeBurnDamage(Pokemon : Pokemon) {
    let result : number = Math.trunc(Pokemon.GetMaxLP() * (1/8))
    return(result)
}

export function ComputePoisonDamage(Pokemon : Pokemon) {
    Pokemon.SetPoisonTurn(Pokemon.GetPoisonTurn() + 1)
    let result : number = Math.trunc(Pokemon.GetMaxLP() * (Pokemon.GetPoisonTurn()/16))
    return(result)
}

export function DownLevelStat(GameInstance : Game, Pokemon : Pokemon, StatName : string) {
    if (Pokemon.GetStatLevel(StatName) > -6) {
        GameInstance.AppendTextArea(`${Pokemon.GetName()}'s ${StatName} fell !`)
        Pokemon.SetStatLevel(StatName, Pokemon.GetStatLevel(StatName) - 1)
    } else {
        GameInstance.AppendTextArea(`${Pokemon.GetName()}'s ${StatName} won't go any lower !`)
    }
}

export function UpLevelStat(GameInstance : Game, Pokemon : Pokemon, StatName : string) {
    if (Pokemon.GetStatLevel(StatName) < 6) {
        GameInstance.AppendTextArea(`${Pokemon.GetName()}'s ${StatName} rose !`)
        Pokemon.SetStatLevel(StatName, Pokemon.GetStatLevel(StatName) + 1)
    } else {
        GameInstance.AppendTextArea(`${Pokemon.GetName()}'s ${StatName} won't go any higher !`)
    }
}

export function HealLP(GameInstance : Game, Pokemon : Pokemon, Value : number) {
    if (Pokemon.GetLP() + Value > Pokemon.GetMaxLP()) {
        Pokemon.SetLP(Pokemon.GetMaxLP())
    } else {
        Pokemon.SetLP(Math.floor(Pokemon.GetLP() + Value))
    }
    GameInstance.AppendTextArea(`${Pokemon.GetName()} had its HP restored !`)
}