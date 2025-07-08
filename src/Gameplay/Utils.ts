import { Pokemon } from "../classes/Pokemon";
import { Game } from "../classes/Game";
import { StatutEnum } from "../data/Statuts";
import { ComputeBurnDamage, ComputePoisonDamage } from "./Alteration";
import { WeatherDamage } from "./Weather";
import { UpdateLPPokemons, WriteInTextArea } from "./Display";

export function ProbabilityCheck(target : number) : boolean {
    return((Math.random() * 100) < target)
}

export function EndRound(GameInstance : Game, Pokemon1 : Pokemon, Pokemon2 : Pokemon) {
    if (Pokemon1.GetStatut() === StatutEnum.BURN) {
        WriteInTextArea(`${Pokemon1.GetName()} takes burn damage !`)
        Pokemon1.SetLP(Pokemon1.GetLP() - ComputeBurnDamage(Pokemon1))
    } else if (Pokemon1.GetStatut() === StatutEnum.POISONED) {
        WriteInTextArea(`${Pokemon1.GetName()} takes poison damage !`)
        Pokemon1.SetLP(Pokemon1.GetLP() - ComputePoisonDamage(Pokemon1))
    } else if (Pokemon1.GetStatut() === StatutEnum.SLEEP) {
        Pokemon1.SetSleepTurn(Pokemon1.GetSleepTurn() + 1)
    }
    if (Pokemon2.GetStatut() === StatutEnum.BURN) {
        WriteInTextArea(`${Pokemon2.GetName()} takes burn damage !`)
        Pokemon2.SetLP(Pokemon2.GetLP() - ComputeBurnDamage(Pokemon2))
    } else if (Pokemon2.GetStatut() === StatutEnum.POISONED) {
        WriteInTextArea(`${Pokemon2.GetName()} takes poison damage !`)
        Pokemon2.SetLP(Pokemon2.GetLP() - ComputePoisonDamage(Pokemon2))
    } else if (Pokemon2.GetStatut() === StatutEnum.SLEEP) {
        Pokemon2.SetSleepTurn(Pokemon2.GetSleepTurn() + 1)
    }
    if (Pokemon1.GetConfusion()) {
        Pokemon1.SetConfusionTurn(Pokemon1.GetConfusionTurn() + 1)
    }
    if (Pokemon2.GetConfusion()) {
        Pokemon2.SetConfusionTurn(Pokemon2.GetConfusionTurn() + 1)
    }
    Pokemon1.SetFear(false)
    Pokemon2.SetFear(false)
    WeatherDamage(GameInstance, Pokemon1, Pokemon2)
    Pokemon1.FormatKO()
    Pokemon2.FormatKO()
    UpdateLPPokemons(Pokemon1, GameInstance.GetIndexPokemon1(), Pokemon2, GameInstance.GetTeams()[1])
}