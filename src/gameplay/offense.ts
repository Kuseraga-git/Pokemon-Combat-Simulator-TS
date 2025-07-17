import { Game } from "../classes/game";
import { Pokemon } from "../classes/pokemon";
import { AccuracyCheck } from "../datas/accuracy";
import { CritChanges } from "../datas/crits";
import { Move, Moves } from "../datas/moves";
import { Pokemon_Types } from "../datas/pokemonTypes";
import { StatutEnum } from "../datas/statuts";
import { Weather } from "../datas/weather";
import { DamageIsCrit } from "../types";
import { ComputeConfusionDamage } from "./alterations";
import { ComputeTypeTable } from "./typesGameplay";
import { ProbabilityCheck } from "./utils";

export function ComputeDamages(GameInstance : Game, Move : Move, Target : Pokemon, Sender : Pokemon, CritChance : number, CurrentWeather : Weather) : DamageIsCrit {
    switch (CurrentWeather) {
        case Weather.SUN:
            if (Move.Type === Pokemon_Types.FIRE || Move == Moves.HYDRO_STEAM) {
                Move.Power = Move.Power! * 1.5
            } else if (Move.Type === Pokemon_Types.WATER) {
                Move.Power = Move.Power! * 0.5
            }
            break;
        case Weather.RAIN:
            if (Move.Type === Pokemon_Types.WATER) { 
                Move.Power = Move.Power! * 1.5
            } else if (Move.Type === Pokemon_Types.FIRE) { // TODO : OR AttackName === SolarBeam
                Move.Power = Move.Power! * 0.5
            }
            break;
        case Weather.HAIL:
            // TODO : If AttackName == Solar Beam --> Power = 60
            break;
        case Weather.SANDSTORM:
            // TODO : If AttackName == Solar Beam --> Power = 60
            break;
        default:
            break;
    }
    switch (Move.Cat) {
        case "PHYSICAL":
            return ComputePhysicalDamages(GameInstance, Target, Sender, Move.Power!, Move.Type, CritChance)
            break;
        case "SPECIAL": 
            return ComputeSpecialDamages(GameInstance, Target, Sender, Move.Power!, Move.Type, CritChance)
            break;
        default:
            return({Damage : 0, Crit : false})
            break;
    }
}

function ComputePhysicalDamages(GameInstance : Game, Target : Pokemon, Sender : Pokemon, Power : number, AttackType : Pokemon_Types, CritChance : number) : DamageIsCrit {
    let damage = 40
    let crit = ProbabilityCheck(CritChanges.get(CritChance) ?? 1.0) ? 2.0 : 1.0
    damage = damage * (Power * (Sender.GetStatValue('Att') / 50.0))
    damage = (damage / Target.GetStatValue('Def') + 2.0)
    damage = damage * crit
    damage = damage * ((Sender.getPokemonTypes()[0] == AttackType || Sender.getPokemonTypes()[1] == AttackType) ? 1.5 : 1.0)
    damage = damage * ComputeTypeTable(GameInstance, AttackType, Target.getPokemonTypes())
    if (crit == 2.0) {
        GameInstance.AppendTextArea(`CRITICAL HIT !!!`)
    }
    return({Damage : Math.floor(damage), Crit : crit === 2.0})
}

function ComputeSpecialDamages(GameInstance : Game, Target : Pokemon, Sender : Pokemon, Power : number, AttackType : Pokemon_Types, CritChance : number) : DamageIsCrit {
    let damage = 40
    let crit = ProbabilityCheck(CritChanges.get(CritChance) ?? 1.0) ? 2.0 : 1.0
    damage = damage * (Power * (Sender.GetStatValue('SpeAtt') / 50.0))
    damage = (damage / Target.GetStatValue('SpeDef') + 2)
    damage = damage * crit
    damage = damage * ((Sender.getPokemonTypes()[0] == AttackType || Sender.getPokemonTypes()[1] == AttackType) ? 1.5 : 1.0)
    damage = damage * ComputeTypeTable(GameInstance, AttackType, Target.getPokemonTypes())
    if (crit == 2.0) {
        GameInstance.AppendTextArea(`CRITICAL HIT !!!`)
    }
    damage = Target.GetLP() - damage < 0 ? damage - (damage - Target.GetLP()) : damage
    return({Damage : Math.floor(damage), Crit : crit === 2.0})
}

export function InflictDamage(GameInstance : Game, Target : Pokemon, amount : number) {
    Target.SetLP(Target.GetLP() - amount)
    GameInstance.AppendTextArea(`${Target.GetName()} takes ${amount} points of damage !`)
    Target.FormatKO(GameInstance)
}

export function CanAttack(GameInstance : Game, Sender : Pokemon, Move : Move, Target : Pokemon, MoveIndex : number) : boolean {
    if (Sender.GetMovePP(MoveIndex) > 0) {
        if (Sender.GetStatut() === StatutEnum.None && Sender.GetConfusion() === false && Sender.GetFear() === false) {
            return(true)
        } else if (Sender.GetStatut() === StatutEnum.FREEZE) {
            if (Move.Type === Pokemon_Types.FIRE || Move.Name == 'Hydro Steam' || Move.Name == 'Steam Eruption' || ProbabilityCheck(20)) {
                GameInstance.AppendTextArea(`${Sender.GetName()} thawed out !`)
                Sender.SetStatut(StatutEnum.None)
                return(true)
            } else {
                GameInstance.AppendTextArea(`${Sender} is frozen solid !`)
                return(false)
            }
        } else if (Sender.GetStatut() === StatutEnum.PARALYZE) {
            if (ProbabilityCheck(75))
                return(true)
            else {
                GameInstance.AppendTextArea(`${Sender.GetName()} is paralyzed ! It can't move !`)
                return(false)
            }
        } else if (Sender.GetStatut() === StatutEnum.SLEEP) {
            if (ProbabilityCheck(33) || Sender.GetSleepTurn() === 3) {
                GameInstance.AppendTextArea(`${Sender.GetName()} woke up !`)
                Sender.SetSleepTurn(0)
                return(true)
            } else {
                GameInstance.AppendTextArea(`${Sender.GetName()} is fast asleep`)
                return(false)
            }
        } else if (Sender.GetFear()) {
            GameInstance.AppendTextArea(`${Sender.GetName()} flinched and couldn't move !`)
            return(false)
        } else if (Sender.GetConfusion()) {
            if (ProbabilityCheck(25) || Sender.GetConfusionTurn() === 4) {
                GameInstance.AppendTextArea(`${Sender.GetName()} snapped out of its confusion!`)
                Sender.SetConfusionTurn(0)
                return(true)
            } else if (ProbabilityCheck(33)) {
                GameInstance.AppendTextArea(`${Sender.GetName()} hurt himself in it's confusion !`)
                Sender.SetLP(Sender.GetLP() - ComputeConfusionDamage(Sender))
                return(false)
            } else {
                return(true)
            }
        }
    } else {
        if (Sender.GetMovePP(0) <= 0 && Sender.GetMovePP(1) <= 0 && Sender.GetMovePP(2) <= 0 && Sender.GetMovePP(3) <= 0) {
            GameInstance.AppendTextArea(`${Sender.GetName()} has no moves left !`)
            Moves.STRUGGLE.Effect(GameInstance, Target, Sender)
        } else {
            GameInstance.AppendTextArea(`${Sender.GetName()} try to use ${Move.Name} but there's no PP left for this move !`)
        }
        return(false)
    }
    return(true)
}

export function DrawbackDamage(GameInstance : Game, Pokemon : Pokemon, Damage : number, Percentage : number) {
    Pokemon.SetLP(Math.trunc(Pokemon.GetLP() - (Damage * Percentage)))
    GameInstance.AppendTextArea(`${Pokemon.GetName()} is hit with recoil !`)
    Pokemon.FormatKO(GameInstance)
}

export function MultiHitAttack5(GameInstance : Game, Target : Pokemon, Sender : Pokemon, MoveInfos : Move, CritFirstAttOnly : boolean) {
    let dmg = ComputeDamages(GameInstance, MoveInfos, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
    InflictDamage(GameInstance, Target, dmg.Damage)
    let index : number
    let randInt : number = (Math.floor(Math.random() * 100))
    let i : number = 1
        if (randInt < 15) {
            index = 5
        } else if (randInt < 30) {
            index = 4
        } else if (randInt < 65) {
            index = 3
        } else {
            index = 2
        }
    for (i; i < index && Target.GetKO() == false; i++) {
        dmg = ComputeDamages(GameInstance, MoveInfos, Target, Sender, CritFirstAttOnly ? 0 : Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
    }
    GameInstance.AppendTextArea(`It hit ${i} times !`)
}

export function MultiHitAttack2(GameInstance : Game, Target : Pokemon, Sender : Pokemon, MoveInfos : Move, CritFirstAttOnly : boolean) {
    let dmg = ComputeDamages(GameInstance, MoveInfos, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
    InflictDamage(GameInstance, Target, dmg.Damage)
    if (!Target.GetKO()){
        dmg = ComputeDamages(GameInstance, MoveInfos, Target, Sender, CritFirstAttOnly ? 0 : Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        GameInstance.AppendTextArea(`It hit 2 times !`)
    } else {
        GameInstance.AppendTextArea(`It hit 1 time !`)
    }
}

export function MultiHitAttackAccuracy(GameInstance : Game, Target : Pokemon, Sender : Pokemon, MoveInfos : Move, MaxNBHit : number, CallBack : (Value : number, Index? : number) => number) {
    let dmg = ComputeDamages(GameInstance, MoveInfos, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
    InflictDamage(GameInstance, Target, dmg.Damage)
    let index : number = 1
    let newMoveInfos : Move
    newMoveInfos = Object.assign({}, MoveInfos)
    for (index; index < MaxNBHit && !Target.GetKO() && AccuracyCheck(MoveInfos.Accuracy!, Sender); index++) {
        newMoveInfos.Power = CallBack(newMoveInfos.Power!, index)
        dmg = ComputeDamages(GameInstance, newMoveInfos, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
    }
    GameInstance.AppendTextArea(`It hit ${index} times !`)
}