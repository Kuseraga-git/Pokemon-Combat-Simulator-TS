import { Pokemon } from "../classes/Pokemon"
import { Game } from "../classes/Game"
import { TMoves } from "../Types"
import { Category } from "./Category"
import { Pokemon_Types } from "./Pokemon_Types"
import { WriteInTextArea } from "../Gameplay/Display"
import { AccuracyCheck } from "./Accuracy"
import { ComputeDamages, DrawbackDamage, InflictDamage } from "../Gameplay/Offense"
import { ProbabilityCheck } from "../Gameplay/Utils"
import { ApplyConfusion, ApplyFear, ApplyStatut } from "../Gameplay/GStatut"
import { DownLevelStat, HealLP, UpLevelStat } from "../Gameplay/Alteration"
import { StatutEnum } from "./Statuts"
import { Weather } from "./Weather"

export interface Move {
    Name : string
    Cat : Category
    Type : Pokemon_Types
    Power : number | null
    Accuracy : number | null
    PP : number
    Effect : (GameInstance : Game, Target : Pokemon, Sender : Pokemon) => void
}

export const Moves: TMoves = {
  VOLT_TACKLE: {
    Name: "Volt Tackle",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.ELECTRICK,
    Power: 120,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        DrawbackDamage(Sender, dmg.Damage, 0.3)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.PARALYZE)
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  PLAY_ROUGH: {
    Name: "Play Rough",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.FAIRY,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          DownLevelStat(Target, 'Att')
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  BRICK_BREAK: {
    Name: "Brick Break",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.COMBAT,
    Power: 75,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          // TODO Remove Screen
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  IRON_TAIL: {
    Name: "Iron Tail",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.STEEL,
    Power: 100,
    Accuracy: 75,
    PP: 15,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(30)){
          DownLevelStat(Target, 'Def')
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  GIGA_DRAIN: {
    Name: "Giga Drain",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.GRASS,
    Power: 75,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (dmg.Damage > 0) {
          HealLP(Sender, dmg.Damage / 2)
        } 
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  EARTHQUAKE: {
    Name: "Earthquake",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.GROUND,
    Power: 100,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  SLUDGE_BOMB: {
    Name: "Sludge Bomb",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.POISON,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(30)){
          ApplyStatut(Target, StatutEnum.POISONED)
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  LEAF_STORM: {
    Name: "Leaf Storm",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.GRASS,
    Power: 130,
    Accuracy: 90,
    PP: 5,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        DownLevelStat(Sender, 'SpeAtt')
        DownLevelStat(Sender, 'SpeAtt')
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  SURF: {
    Name: "Surf",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.WATER,
    Power: 90,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  BLIZZARD: {
    Name: "Blizzard",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.ICE,
    Power: 110,
    Accuracy: 70,
    PP: 5,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (GameInstance.GetWeather() == Weather.HAIL || AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.FREEZE)
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  PSYCHIC: {
    Name: "Psychic",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.PSY,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          DownLevelStat(Target, 'SpeDef')
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  ANCIENT_POWER: {
    Name: "Ancient Power",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.ROCK,
    Power: 60,
    Accuracy: 100,
    PP: 5,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (ProbabilityCheck(10)){
          UpLevelStat(Sender, 'Att')
          UpLevelStat(Sender, 'Def')
          UpLevelStat(Sender, 'SpeAtt')
          UpLevelStat(Sender, 'SpeDef')
          UpLevelStat(Sender, 'Speed')
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  FIRE_BLAST: {
    Name: "Fire Blast",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.FIRE,
    Power: 110,
    Accuracy: 85,
    PP: 5,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.BURN)
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  HURRICANE: {
    Name: "Hurricane",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.FLY,
    Power: 110,
    Accuracy: 70,
    PP: 10,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (GameInstance.GetWeather() == Weather.RAIN || AccuracyCheck(GameInstance.GetWeather() === Weather.SUN ? 50 : this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(30)){
          ApplyConfusion(Target)
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  DRAGON_PULSE: {
    Name: "Dragon Pulse",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.DRAGON,
    Power: 85,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  FOCUS_BLAST: {
    Name: "Focus Blast",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.COMBAT,
    Power: 120,
    Accuracy: 70,
    PP: 5,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          DownLevelStat(Target, 'SpeDef')
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  POWER_WHIP: {
    Name: "Power Whip",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.GRASS,
    Power: 120,
    Accuracy: 85,
    PP: 10,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  DOUBLE_EDGE: {
    Name: "Double Edge",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.NORMAL,
    Power: 120,
    Accuracy: 10,
    PP: 15,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        DrawbackDamage(Sender, dmg.Damage, 0.3)
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  ROCK_SLIDE: {
    Name: "Rock Slide",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.ROCK,
    Power: 75,
    Accuracy: 90,
    PP: 10,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(30)){
          ApplyFear(Target)
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  HYDRO_PUMP: {
    Name: "Hydro Pump",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.WATER,
    Power: 120,
    Accuracy: 85,
    PP: 5,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  FLASH_CANNON: {
    Name: "Flash Cannon",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.STEEL,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          DownLevelStat(Target, 'SpeDef')
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  ICE_BEAM: {
    Name: "Ice Beam",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.ICE,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.FREEZE)
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  AURA_SPHERE: {
    Name: "Aura Sphere",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.COMBAT,
    Power: 80,
    Accuracy: null,
    PP: 20,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
      InflictDamage(Target, dmg.Damage)
    },
  },
  MOON_BLAST: {
    Name: "Moon Blast",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.FAIRY,
    Power: 95,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(30)){
          DownLevelStat(Target, 'SpeAtt')
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  TRI_ATTACK: {
    Name: "Tri Attack",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.NORMAL,
    Power: 80,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(20)){
          switch (Math.floor(Math.random() * 3)) {
            case 0:
              ApplyStatut(Target, StatutEnum.BURN)
              break;
            case 1:
              ApplyStatut(Target, StatutEnum.PARALYZE)
              break;
            case 2:
              ApplyStatut(Target, StatutEnum.FREEZE)
              break;
            default:
              break;
          }
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  FLAMMETHROWER: {
    Name: "Flammethrower",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.FIRE,
    Power: 90,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.BURN)
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  THUNDERBOLT: {
    Name: "Thunderbolt",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.ELECTRICK,
    Power: 90,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.PARALYZE)
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  DARK_PULSE: {
    Name: "Dark Pulse",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.DARK,
    Power: 80,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(20)){
          ApplyFear(Target)
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  SHADOW_BALL: {
    Name: "Shadow Ball",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.GHOST,
    Power: 80,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(20)){
          DownLevelStat(Target, 'SpeDef')
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  ENERGY_BALL: {
    Name: "Energy Ball",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.GRASS,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          DownLevelStat(Target, 'SpeDef')
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  FIRE_PUNCH: {
    Name: "Fire Punch",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.FIRE,
    Power: 75,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.BURN)
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  THUNDER_PUNCH: {
    Name: "Thunder Punch",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.ELECTRICK,
    Power: 75,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.PARALYZE)
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  ICE_PUNCH: {
    Name: "Ice Punch",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.ICE,
    Power: 75,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(Target, dmg.Damage)
        if (Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.PARALYZE)
        }
      } else {
        WriteInTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  LUTTE: {
    Name: "Lutte",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.NORMAL,
    Power: 50,
    Accuracy: null,
    PP: 1000,
    Effect(GameInstance, Target, Sender) {
      WriteInTextArea(`${Sender.GetName()} use ${this.Name} !`)
      let dmg = ComputeDamages(this.Cat, Target, Sender, this.Power!, this.Type, Sender.GetCritChance(), GameInstance.GetWeather())
      InflictDamage(Target, dmg.Damage)
      DrawbackDamage(Sender, Sender.GetMaxLP(), 0.25)
    },
  },
} as const;
