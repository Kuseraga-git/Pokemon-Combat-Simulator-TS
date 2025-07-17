import { Game } from "../classes/game"
import { Pokemon_Types } from "../datas/pokemonTypes"

export function ComputeTypeTable(GameInstance : Game, AttackType : Pokemon_Types, Types : Pokemon_Types[]) : number{
    let result : number = 1.0
    if (AttackType == "Steel") {
        result = SteelCheck(Types[0], result)
        result = SteelCheck(Types[1], result)
    }
    if (AttackType == "Combat") {
        result = CombatCheck(Types[0], result)
        result = CombatCheck(Types[1], result)
    }
    if (AttackType == "Dragon") {
        result = DragonCheck(Types[0], result)
        result = DragonCheck(Types[1], result)
    }
    if (AttackType == "Electrick") {
        result = ElectrickCheck(Types[0], result)
        result = ElectrickCheck(Types[1], result)
    }
    if (AttackType == "Fairy") {
        result = FairyCheck(Types[0], result)
        result = FairyCheck(Types[1], result)
    }
    if (AttackType == "Fire") {
        result = FireCheck(Types[0], result)
        result = FireCheck(Types[1], result)
    }
    if (AttackType == "Ice") {
        result = IceCheck(Types[0], result)
        result = IceCheck(Types[1], result)
    }
    if (AttackType == "Bug") {
        result = BugCheck(Types[0], result)
        result = BugCheck(Types[1], result)
    }
    if (AttackType == "Water") {
        result = WaterCheck(Types[0], result)
        result = WaterCheck(Types[1], result)
    }
    if (AttackType == "Normal") {
        result = NormalCheck(Types[0], result)
        result = NormalCheck(Types[1], result)
    }
    if (AttackType == "Grass") {
        result = GrassCheck(Types[0], result)
        result = GrassCheck(Types[1], result)
    }
    if (AttackType == "Poison") {
        result = PoisonCheck(Types[0], result)
        result = PoisonCheck(Types[1], result)
    }
    if (AttackType == "Psy") {
        result = PsyCheck(Types[0], result)
        result = PsyCheck(Types[1], result)
    }
    if (AttackType == "Rock") {
        result = RockCheck(Types[0], result)
        result = RockCheck(Types[1], result)
    }
    if (AttackType == "Ground") {
        result = GroundCheck(Types[0], result)
        result = GroundCheck(Types[1], result)
    }
    if (AttackType == "Ghost") {
        result = GhostCheck(Types[0], result)
        result = GhostCheck(Types[1], result)
    }
    if (AttackType == "Dark") {
        result = DarkCheck(Types[0], result)
        result = DarkCheck(Types[1], result)
    }
    if (AttackType == "Fly") {
        result = FlyCheck(Types[0], result)
        result = FlyCheck(Types[1], result)
    }
    if (result < 1.0 && result > 0) {
        GameInstance.AppendTextArea(`It's not very effective...`)
    } else if (result > 1.0) {
        GameInstance.AppendTextArea(`It's super effective !`)
    } else if (result == 0) {
        GameInstance.AppendTextArea(`It doesn't affect this pokemon...`)
    }
    return(result)
}

function SteelCheck(type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result / 2.0
            break;
        case "Combat":
            result = result
            break;
        case "Dragon":
            result = result
            break;
        case "Water":
            result = result / 2.0
            break;
        case "Electrick":
            result = result / 2.0
            break;
        case "Fairy":
            result = result * 2.0
            break;
        case "Fire":
            result = result / 2.0
            break;
        case "Ice":
            result = result * 2.0
            break;
        case "Bug":
            result = result
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result
            break;
        case "Poison":
            result = result
            break;
        case "Psy":
            result = result
            break;
        case "Rock":
            result = result * 2.0
            break;
        case "Ground":
            result = result
            break;
        case "Ghost":
            result = result
            break;
        case "Dark":
            result = result
            break;
        case "Fly":
            result = result
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function CombatCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result * 2.0
            break;
        case "Combat":
            result = result
            break;
        case "Dragon":
            result = result
            break;
        case "Water":
            result = result
            break;
        case "Electrick":
            result = result
            break;
        case "Fairy":
            result = result / 2.0
            break;
        case "Fire":
            result = result
            break;
        case "Ice":
            result = result * 2.0
            break;
        case "Bug":
            result = result / 2.0
            break;
        case "Normal":
            result = result * 2.0
            break;
        case "Grass":
            result = result
            break;
        case "Poison":
            result = result / 2.0
            break;
        case "Psy":
            result = result / 2.0
            break;
        case "Rock":
            result = result * 2.0
            break;
        case "Ground":
            result = result
            break;
        case "Ghost":
            result = result * 0.0
            break;
        case "Dark":
            result = result * 2.0
            break;
        case "Fly":
            result = result / 2.0
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function DragonCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result / 2.0
            break;
        case "Combat":
            result = result
            break;
        case "Dragon":
            result = result * 2.0
            break;
        case "Water":
            result = result
            break;
        case "Electrick":
            result = result
            break;
        case "Fairy":
            result = result * 0.0
            break;
        case "Fire":
            result = result
            break;
        case "Ice":
            result = result
            break;
        case "Bug":
            result = result
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result
            break;
        case "Poison":
            result = result
            break;
        case "Psy":
            result = result
            break;
        case "Rock":
            result = result
            break;
        case "Ground":
            result = result
            break;
        case "Ghost":
            result = result
            break;
        case "Dark":
            result = result
            break;
        case "Fly":
            result = result
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function WaterCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result
            break;
        case "Combat":
            result = result
            break;
        case "Dragon":
            result = result / 2.0
            break;
        case "Water":
            result = result / 2.0
            break;
        case "Electrick":
            result = result
            break;
        case "Fairy":
            result = result
            break;
        case "Fire":
            result = result * 2.0
            break;
        case "Ice":
            result = result
            break;
        case "Bug":
            result = result
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result / 2.0
            break;
        case "Poison":
            result = result
            break;
        case "Psy":
            result = result
            break;
        case "Rock":
            result = result * 2.0
            break;
        case "Ground":
            result = result * 2.0
            break;
        case "Ghost":
            result = result
            break;
        case "Dark":
            result = result
            break;
        case "Fly":
            result = result
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function ElectrickCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result
            break;
        case "Combat":
            result = result
            break;
        case "Dragon":
            result = result / 2.0
            break;
        case "Water":
            result = result * 2.0
            break;
        case "Electrick":
            result = result / 2.0
            break;
        case "Fairy":
            result = result
            break;
        case "Fire":
            result = result
            break;
        case "Ice":
            result = result
            break;
        case "Bug":
            result = result
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result / 2.0
            break;
        case "Poison":
            result = result
            break;
        case "Psy":
            result = result
            break;
        case "Rock":
            result = result
            break;
        case "Ground":
            result = result * 0.0
            break;
        case "Ghost":
            result = result
            break;
        case "Dark":
            result = result
            break;
        case "Fly":
            result = result * 2.0
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function FairyCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result / 2.0
            break;
        case "Combat":
            result = result
            break;
        case "Dragon":
            result = result * 2.0
            break;
        case "Water":
            result = result * 2.0
            break;
        case "Electrick":
            result = result
            break;
        case "Fairy":
            result = result
            break;
        case "Fire":
            result = result / 2.0
            break;
        case "Ice":
            result = result
            break;
        case "Bug":
            result = result
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result
            break;
        case "Poison":
            result = result / 2.0
            break;
        case "Psy":
            result = result
            break;
        case "Rock":
            result = result
            break;
        case "Ground":
            result = result
            break;
        case "Ghost":
            result = result
            break;
        case "Dark":
            result = result / 2.0
            break;
        case "Fly":
            result = result
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function FireCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result * 2.0
            break;
        case "Combat":
            result = result
            break;
        case "Dragon":
            result = result / 2.0
            break;
        case "Water":
            result = result / 2.0
            break;
        case "Electrick":
            result = result
            break;
        case "Fairy":
            result = result
            break;
        case "Fire":
            result = result / 2.0
            break;
        case "Ice":
            result = result * 2.0
            break;
        case "Bug":
            result = result * 2.0
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result * 2.0
            break;
        case "Poison":
            result = result
            break;
        case "Psy":
            result = result
            break;
        case "Rock":
            result = result / 2.0
            break;
        case "Ground":
            result = result
            break;
        case "Ghost":
            result = result
            break;
        case "Dark":
            result = result
            break;
        case "Fly":
            result = result
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function IceCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result / 2.0
            break;
        case "Combat":
            result = result
            break;
        case "Dragon":
            result = result * 2.0
            break;
        case "Water":
            result = result / 2.0
            break;
        case "Electrick":
            result = result
            break;
        case "Fairy":
            result = result
            break;
        case "Fire":
            result = result / 2.0
            break;
        case "Ice":
            result = result / 2.0
            break;
        case "Bug":
            result = result
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result * 2.0
            break;
        case "Poison":
            result = result
            break;
        case "Psy":
            result = result
            break;
        case "Rock":
            result = result
            break;
        case "Ground":
            result = result * 2.0
            break;
        case "Ghost":
            result = result
            break;
        case "Dark":
            result = result
            break;
        case "Fly":
            result = result * 2.0
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function BugCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result / 2.0
            break;
        case "Combat":
            result = result / 2.0
            break;
        case "Dragon":
            result = result
            break;
        case "Water":
            result = result
            break;
        case "Electrick":
            result = result
            break;
        case "Fairy":
            result = result / 2.0
            break;
        case "Fire":
            result = result / 2.0
            break;
        case "Ice":
            result = result
            break;
        case "Bug":
            result = result
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result * 2.0
            break;
        case "Poison":
            result = result / 2.0
            break;
        case "Psy":
            result = result * 2.0
            break;
        case "Rock":
            result = result
            break;
        case "Ground":
            result = result
            break;
        case "Ghost":
            result = result / 2.0
            break;
        case "Dark":
            result = result * 2.0
            break;
        case "Fly":
            result = result / 2.0
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function NormalCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result / 2.0
            break;
        case "Combat":
            result = result
            break;
        case "Dragon":
            result = result
            break;
        case "Water":
            result = result
            break;
        case "Electrick":
            result = result
            break;
        case "Fairy":
            result = result
            break;
        case "Fire":
            result = result
            break;
        case "Ice":
            result = result
            break;
        case "Bug":
            result = result
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result
            break;
        case "Poison":
            result = result
            break;
        case "Psy":
            result = result
            break;
        case "Rock":
            result = result / 2.0
            break;
        case "Ground":
            result = result
            break;
        case "Ghost":
            result = result * 0.0
            break;
        case "Dark":
            result = result
            break;
        case "Fly":
            result = result
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function GrassCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result / 2.0
            break;
        case "Combat":
            result = result
            break;
        case "Dragon":
            result = result / 2.0
            break;
        case "Water":
            result = result * 2.0
            break;
        case "Electrick":
            result = result
            break;
        case "Fairy":
            result = result
            break;
        case "Fire":
            result = result / 2.0
            break;
        case "Ice":
            result = result
            break;
        case "Bug":
            result = result / 2.0
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result / 2.0
            break;
        case "Poison":
            result = result / 2.0
            break;
        case "Psy":
            result = result
            break;
        case "Rock":
            result = result * 2.0
            break;
        case "Ground":
            result = result * 2.0
            break;
        case "Ghost":
            result = result
            break;
        case "Dark":
            result = result
            break;
        case "Fly":
            result = result / 2.0
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function PoisonCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result * 0.0
            break;
        case "Combat":
            result = result
            break;
        case "Dragon":
            result = result
            break;
        case "Water":
            result = result
            break;
        case "Electrick":
            result = result
            break;
        case "Fairy":
            result = result * 2.0
            break;
        case "Fire":
            result = result
            break;
        case "Ice":
            result = result
            break;
        case "Bug":
            result = result
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result * 2.0
            break;
        case "Poison":
            result = result / 2.0
            break;
        case "Psy":
            result = result
            break;
        case "Rock":
            result = result / 2.0
            break;
        case "Ground":
            result = result / 2.0
            break;
        case "Ghost":
            result = result / 2.0
            break;
        case "Dark":
            result = result
            break;
        case "Fly":
            result = result
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function PsyCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result / 2.0
            break;
        case "Combat":
            result = result * 2.0
            break;
        case "Dragon":
            result = result
            break;
        case "Water":
            result = result
            break;
        case "Electrick":
            result = result
            break;
        case "Fairy":
            result = result
            break;
        case "Fire":
            result = result
            break;
        case "Ice":
            result = result
            break;
        case "Bug":
            result = result
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result
            break;
        case "Poison":
            result = result * 2.0
            break;
        case "Psy":
            result = result / 2.0
            break;
        case "Rock":
            result = result
            break;
        case "Ground":
            result = result
            break;
        case "Ghost":
            result = result
            break;
        case "Dark":
            result = result * 0.0
            break;
        case "Fly":
            result = result
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function RockCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result / 2.0
            break;
        case "Combat":
            result = result / 2.0
            break;
        case "Dragon":
            result = result
            break;
        case "Water":
            result = result
            break;
        case "Electrick":
            result = result
            break;
        case "Fairy":
            result = result
            break;
        case "Fire":
            result = result * 2.0
            break;
        case "Ice":
            result = result * 2.0
            break;
        case "Bug":
            result = result * 2.0
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result
            break;
        case "Poison":
            result = result
            break;
        case "Psy":
            result = result
            break;
        case "Rock":
            result = result
            break;
        case "Ground":
            result = result / 2.0
            break;
        case "Ghost":
            result = result
            break;
        case "Dark":
            result = result
            break;
        case "Fly":
            result = result * 2.0
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function GroundCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result * 2.0
            break;
        case "Combat":
            result = result
            break;
        case "Dragon":
            result = result
            break;
        case "Water":
            result = result
            break;
        case "Electrick":
            result = result * 2.0
            break;
        case "Fairy":
            result = result
            break;
        case "Fire":
            result = result * 2.0
            break;
        case "Ice":
            result = result
            break;
        case "Bug":
            result = result / 2.0
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result / 2.0
            break;
        case "Poison":
            result = result * 2.0
            break;
        case "Psy":
            result = result
            break;
        case "Rock":
            result = result * 2.0
            break;
        case "Ground":
            result = result
            break;
        case "Ghost":
            result = result
            break;
        case "Dark":
            result = result
            break;
        case "Fly":
            result = result * 0.0
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function GhostCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result
            break;
        case "Combat":
            result = result
            break;
        case "Dragon":
            result = result
            break;
        case "Water":
            result = result
            break;
        case "Electrick":
            result = result
            break;
        case "Fairy":
            result = result
            break;
        case "Fire":
            result = result
            break;
        case "Ice":
            result = result
            break;
        case "Bug":
            result = result
            break;
        case "Normal":
            result = result * 0.0
            break;
        case "Grass":
            result = result
            break;
        case "Poison":
            result = result
            break;
        case "Psy":
            result = result * 2.0
            break;
        case "Rock":
            result = result
            break;
        case "Ground":
            result = result
            break;
        case "Ghost":
            result = result * 2.0
            break;
        case "Dark":
            result = result / 2.0
            break;
        case "Fly":
            result = result
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function DarkCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result
            break;
        case "Combat":
            result = result / 2.0
            break;
        case "Dragon":
            result = result
            break;
        case "Water":
            result = result
            break;
        case "Electrick":
            result = result
            break;
        case "Fairy":
            result = result / 2.0
            break;
        case "Fire":
            result = result
            break;
        case "Ice":
            result = result
            break;
        case "Bug":
            result = result
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result
            break;
        case "Poison":
            result = result
            break;
        case "Psy":
            result = result * 2.0
            break;
        case "Rock":
            result = result
            break;
        case "Ground":
            result = result
            break;
        case "Ghost":
            result = result * 2.0
            break;
        case "Dark":
            result = result / 2.0
            break;
        case "Fly":
            result = result
            break;
        default:
            result = result
            break;
    }
    return(result)
}

function FlyCheck (type : Pokemon_Types, result : number) : number {
    switch (type) {
        case "Steel":
            result = result / 2.0
            break;
        case "Combat":
            result = result * 2.0
            break;
        case "Dragon":
            result = result
            break;
        case "Water":
            result = result
            break;
        case "Electrick":
            result = result / 2.0
            break;
        case "Fairy":
            result = result
            break;
        case "Fire":
            result = result
            break;
        case "Ice":
            result = result
            break;
        case "Bug":
            result = result * 2.0
            break;
        case "Normal":
            result = result
            break;
        case "Grass":
            result = result * 2.0
            break;
        case "Poison":
            result = result
            break;
        case "Psy":
            result = result
            break;
        case "Rock":
            result = result / 2.0
            break;
        case "Ground":
            result = result
            break;
        case "Ghost":
            result = result
            break;
        case "Dark":
            result = result
            break;
        case "Fly":
            result = result
            break;
        default:
            result = result
            break;
    }
    return(result)
}
