import { Pokemon } from "../classes/Pokemon";
import { Category } from "../data/Category";
import { CritChanges } from "../data/Crits";
import { ProbabilityCheck } from "./Utils";
import { Pokemon_Types } from "../data/Pokemon_Types";
import { ComputeTypeTable } from "./GTypes";
import { DamageIsCrit } from "../Types";
import { Game } from "../classes/Game";
import { Move, Moves } from "../data/Moves";
import { StatutEnum } from "../data/Statuts";
import { ComputeConfusionDamage } from "./Alteration";
import { WriteInTextArea } from "./Display";
import { Weather } from "../data/Weather";

export function ComputeDamages(Cat : Category, Target : Pokemon, Sender : Pokemon, Power : number, AttackType : Pokemon_Types, CritChance : number, CurrentWeather : Weather) : DamageIsCrit {
    switch (CurrentWeather) {
        case Weather.SUN:
            if (AttackType === Pokemon_Types.FIRE) { // TODO : OR AttackName === Hydro Steam
                Power = Power * 1.5
            } else if (AttackType === Pokemon_Types.WATER) {
                Power = Power * 0.5
            }
            break;
        case Weather.RAIN:
            if (AttackType === Pokemon_Types.WATER) { 
                Power = Power * 1.5
            } else if (AttackType === Pokemon_Types.FIRE) { // TODO : OR AttackName === SolarBeam
                Power = Power * 0.5
            }
            break;
        case Weather.HAIL:
            // If AttackName == Solar Beam --> Power = 60
            break;
        case Weather.SANDSTORM:
            // If AttackName == Solar Beam --> Power = 60
            break;
        default:
            break;
    }
    switch (Cat) {
        case "PHYSICAL":
            return ComputePhysicalDamages(Target, Sender, Power, AttackType, CritChance)
            break;
        case "SPECIAL": 
            return ComputeSpecialDamages(Target, Sender, Power, AttackType, CritChance)
            break;
        default:
            return({Damage : 0, Crit : false})
            break;
    }
}

function ComputePhysicalDamages(Target : Pokemon, Sender : Pokemon, Power : number, AttackType : Pokemon_Types, CritChance : number) : DamageIsCrit {
    let damage = 40
    let crit = ProbabilityCheck(CritChanges.get(CritChance) ?? 1.0) ? 2.0 : 1.0
    damage = damage * (Power * (Sender.GetStatValue('Att') / 50.0))
    damage = (damage / Target.GetStatValue('Def') + 2.0)
    damage = damage * crit
    damage = damage * ((Sender.getPokemonTypes()[0] == AttackType || Sender.getPokemonTypes()[1] == AttackType) ? 1.5 : 1.0)
    damage = damage * ComputeTypeTable(AttackType, Target.getPokemonTypes())
    if (crit == 2.0) {
        WriteInTextArea(`CRITICAL HIT !!!`)
    }
    return({Damage : Math.floor(damage), Crit : crit === 2.0})
}

function ComputeSpecialDamages(Target : Pokemon, Sender : Pokemon, Power : number, AttackType : Pokemon_Types, CritChance : number) : DamageIsCrit {
    let damage = 40
    let crit = ProbabilityCheck(CritChanges.get(CritChance) ?? 1.0) ? 2.0 : 1.0
    damage = damage * (Power * (Sender.GetStatValue('SpeAtt') / 50.0))
    damage = (damage / Target.GetStatValue('SpeDef') + 2)
    damage = damage * crit
    damage = damage * ((Sender.getPokemonTypes()[0] == AttackType || Sender.getPokemonTypes()[1] == AttackType) ? 1.5 : 1.0)
    damage = damage * ComputeTypeTable(AttackType, Target.getPokemonTypes())
    if (crit == 2.0) {
        WriteInTextArea(`CRITICAL HIT !!!`)
    }
    damage = Target.GetLP() - damage < 0 ? damage - (damage - Target.GetLP()) : damage
    return({Damage : Math.floor(damage), Crit : crit === 2.0})
}

export function InflictDamage(Target : Pokemon, amount : number) {
    Target.SetLP(Target.GetLP() - amount)
    WriteInTextArea(`${Target.GetName()} takes ${amount} points of damage !`)
    Target.FormatKO()
}

export function CanAttack(GameInstance : Game, Sender : Pokemon, Move : Move, Target : Pokemon, MoveIndex : number) : boolean {
    if (Sender.GetMovePP(MoveIndex) > 0) {
        if (Sender.GetStatut() === StatutEnum.None && Sender.GetConfusion() === false && Sender.GetFear() === false) {
            return(true)
        } else if (Sender.GetStatut() === StatutEnum.FREEZE) {
            if (Move.Type === Pokemon_Types.FIRE || ProbabilityCheck(20)) {
                WriteInTextArea(`${Sender.GetName()} thawed out !`)
                Sender.SetStatut(StatutEnum.None)
                return(true)
            } else {
                WriteInTextArea(`${Sender} is frozen solid !`)
                return(false)
            }
        } else if (Sender.GetStatut() === StatutEnum.PARALYZE) {
            if (ProbabilityCheck(75))
                return(true)
            else {
                WriteInTextArea(`${Sender.GetName()} is paralyzed ! It can't move !`)
                return(false)
            }
        } else if (Sender.GetStatut() === StatutEnum.SLEEP) {
            if (ProbabilityCheck(33) || Sender.GetSleepTurn() === 3) {
                WriteInTextArea(`${Sender.GetName()} woke up !`)
                Sender.SetSleepTurn(0)
                return(true)
            } else {
                WriteInTextArea(`${Sender.GetName()} is fast asleep`)
                return(false)
            }
        } else if (Sender.GetFear()) {
            WriteInTextArea(`${Sender.GetName()} flinched and couldn't move !`)
            return(false)
        } else if (Sender.GetConfusion()) {
            if (ProbabilityCheck(25) || Sender.GetConfusionTurn() === 4) {
                WriteInTextArea(`${Sender.GetName()} snapped out of its confusion!`)
                Sender.SetConfusionTurn(0)
                return(true)
            } else if (ProbabilityCheck(33)) {
                WriteInTextArea(`${Sender.GetName()} hurt himself in it's confusion !`)
                Sender.SetLP(Sender.GetLP() - ComputeConfusionDamage(Sender))
                return(false)
            } else {
                return(true)
            }
        }
    } else {
        if (Sender.GetMovePP(0) <= 0 && Sender.GetMovePP(1) <= 0 && Sender.GetMovePP(2) <= 0 && Sender.GetMovePP(3) <= 0) {
            WriteInTextArea(`${Sender.GetName()} has no moves left !`)
            Moves.LUTTE.Effect(GameInstance, Target, Sender)
        } else {
            WriteInTextArea(`${Sender.GetName()} try to use ${Move.Name} but there's no PP left for this move !`)
        }
        return(false)
    }
    return(true)
}

export function DrawbackDamage(Pokemon : Pokemon, Damage : number, Percentage : number) {
    Pokemon.SetLP(Math.trunc(Pokemon.GetLP() - (Damage * Percentage)))
    WriteInTextArea(`${Pokemon.GetName()} is hit with recoil !`)
    Pokemon.FormatKO()
}