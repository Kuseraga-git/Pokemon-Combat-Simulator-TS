import { Pokemon } from "../classes/Pokemon";

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