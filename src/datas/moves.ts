import { Game } from "../classes/game"
import { Pokemon } from "../classes/pokemon"
import { DownLevelStat, HealLP, UpLevelStat } from "../gameplay/alterations"
import { ComputeDamages, DrawbackDamage, InflictDamage, MultiHitAttack2, MultiHitAttack5, MultiHitAttackAccuracy } from "../gameplay/offense"
import { ApplyConfusion, ApplyFear, ApplyStatut } from "../gameplay/statutGameplay"
import { ProbabilityCheck } from "../gameplay/utils"
import { ApplyNewWeather } from "../gameplay/weather"
import { TMoves } from "../types"
import { AccuracyCheck, DownLevelAccuracy } from "./accuracy"
import { Category } from "./category"
import { Pokemon_Types } from "./pokemonTypes"
import { StatutEnum } from "./statuts"
import { Weather } from "./weather"

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
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.ELECTRICK,
    Power: 120,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        DrawbackDamage(GameInstance, Sender, dmg.Damage, 1/3)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.PARALYZE)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  PLAY_ROUGH: {
    Name: "Play Rough",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.FAIRY,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          DownLevelStat(GameInstance, Target, 'Att')
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  BRICK_BREAK: {
    Name: "Brick Break",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.COMBAT,
    Power: 75,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          // TODO Remove Screen
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  IRON_TAIL: {
    Name: "Iron Tail",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.STEEL,
    Power: 100,
    Accuracy: 75,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(30)){
          DownLevelStat(GameInstance, Target, 'Def')
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (dmg.Damage > 0) {
          HealLP(GameInstance, Sender, dmg.Damage / 2)
        } 
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  EARTHQUAKE: {
    Name: "Earthquake",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.GROUND,
    Power: 100,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(30)){
          ApplyStatut(Target, StatutEnum.POISONED)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        DownLevelStat(GameInstance, Sender, 'SpeAtt')
        DownLevelStat(GameInstance, Sender, 'SpeAtt')
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (GameInstance.GetWeather() == Weather.HAIL || AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.FREEZE)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          DownLevelStat(GameInstance, Target, 'SpeDef')
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (ProbabilityCheck(10)){
          UpLevelStat(GameInstance, Sender, 'Att')
          UpLevelStat(GameInstance, Sender, 'Def')
          UpLevelStat(GameInstance, Sender, 'SpeAtt')
          UpLevelStat(GameInstance, Sender, 'SpeDef')
          UpLevelStat(GameInstance, Sender, 'Speed')
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.BURN)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (GameInstance.GetWeather() == Weather.RAIN || AccuracyCheck(GameInstance.GetWeather() === Weather.SUN ? 50 : this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(30)){
          ApplyConfusion(Target)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          DownLevelStat(GameInstance, Target, 'SpeDef')
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  POWER_WHIP: {
    Name: "Power Whip",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.GRASS,
    Power: 120,
    Accuracy: 85,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  DOUBLE_EDGE: {
    Name: "Double Edge",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.NORMAL,
    Power: 120,
    Accuracy: 10,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        DrawbackDamage(GameInstance, Sender, dmg.Damage, 1/3)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  ROCK_SLIDE: {
    Name: "Rock Slide",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.ROCK,
    Power: 75,
    Accuracy: 90,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(30)){
          ApplyFear(Target)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          DownLevelStat(GameInstance, Target, 'SpeDef')
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.FREEZE)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
      InflictDamage(GameInstance, Target, dmg.Damage)
    },
  },
  MOON_BLAST: {
    Name: "Moon Blast",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.FAIRY,
    Power: 95,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(30)){
          DownLevelStat(GameInstance, Target, 'SpeAtt')
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(20)){
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
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.BURN)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.PARALYZE)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(20)){
          ApplyFear(Target)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(20)){
          DownLevelStat(GameInstance, Target, 'SpeDef')
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
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
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          DownLevelStat(GameInstance, Target, 'SpeDef')
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  FIRE_PUNCH: {
    Name: "Fire Punch",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.FIRE,
    Power: 75,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.BURN)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  THUNDER_PUNCH: {
    Name: "Thunder Punch",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.ELECTRICK,
    Power: 75,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.PARALYZE)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  ICE_PUNCH: {
    Name: "Ice Punch",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.ICE,
    Power: 75,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.PARALYZE)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  HYDRO_STEAM: {
    Name: "Hydro Steam",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.WATER,
    Power: 80,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  DRACO_METEOR: {
    Name: "Draco Meteor",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.DRAGON,
    Power: 130,
    Accuracy: 90,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        DownLevelStat(GameInstance, Sender, 'SpeAtt')
        DownLevelStat(GameInstance, Sender, 'SpeAtt')
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  OVERHEAT: {
    Name: "Overheat",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.FIRE,
    Power: 130,
    Accuracy: 90,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        DownLevelStat(GameInstance, Sender, 'SpeAtt')
        DownLevelStat(GameInstance, Sender, 'SpeAtt')
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  PSYCHO_BOOST: {
    Name: "Psycho Boost",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.PSY,
    Power: 130,
    Accuracy: 90,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        DownLevelStat(GameInstance, Sender, 'SpeAtt')
        DownLevelStat(GameInstance, Sender, 'SpeAtt')
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  V_CREATE: {
    Name: "V-Create",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.FIRE,
    Power: 180,
    Accuracy: 90,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        DownLevelStat(GameInstance, Sender, 'Def')
        DownLevelStat(GameInstance, Sender, 'SpeDef')
        DownLevelStat(GameInstance, Sender, 'Speed')
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  BLUE_FLARE: {
    Name: "Blue Flare",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.FIRE,
    Power: 130,
    Accuracy: 85,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(20)){
          ApplyStatut(Target, StatutEnum.BURN)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  MUDDY_WATER: {
    Name: "Muddy Water",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.WATER,
    Power: 90,
    Accuracy: 85,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(30)){
          DownLevelAccuracy(GameInstance, Target)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  CROSS_CHOP: {
    Name: "Cross Chop",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.COMBAT,
    Power: 100,
    Accuracy: 80,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance() + 1, GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  BUG_BUZZ: {
    Name: "Bug Buzz",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.BUG,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          DownLevelStat(GameInstance, Target, 'SpeDef')
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  CRUNCH: {
    Name: "Crunch",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.DARK,
    Power: 80,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(20)){
          DownLevelStat(GameInstance, Target, 'Def')
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  AQUA_TAIL: {
    Name: "Aqua Tail",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.WATER,
    Power: 90,
    Accuracy: 90,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  SELF_DESTRUCT: {
    Name: "Self Destruct",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.NORMAL,
    Power: 200,
    Accuracy: 100,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        InflictDamage(GameInstance, Sender, Sender.GetLP())
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  EXPLOSION: {
    Name: "Explosion",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.NORMAL,
    Power: 250,
    Accuracy: 100,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        InflictDamage(GameInstance, Sender, Sender.GetLP())
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  MEGA_KICK: {
    Name: "Mega Kick",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.NORMAL,
    Power: 120,
    Accuracy: 75,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  SUPERPOWER: {
    Name: "Superpower",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.COMBAT,
    Power: 120,
    Accuracy: 100,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        DownLevelStat(GameInstance, Sender, 'Att')
        DownLevelStat(GameInstance, Sender, 'Def')
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  THUNDER: {
    Name: "Thunder",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.ELECTRICK,
    Power: 110,
    Accuracy: 70,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (GameInstance.GetWeather() == Weather.RAIN || AccuracyCheck(GameInstance.GetWeather() == Weather.SUN ? 50 : this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(30)){
          ApplyStatut(Target, StatutEnum.PARALYZE)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  HEAD_SMASH: {
    Name: "Head Smash",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.ROCK,
    Power: 150,
    Accuracy: 80,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        DrawbackDamage(GameInstance, Sender, dmg.Damage, 1/2)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  GUNK_SHOT: {
    Name: "Gunk Shot",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.POISON,
    Power: 120,
    Accuracy: 80,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(30)){
          ApplyStatut(Target, StatutEnum.POISONED)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  TWISTER: {
    Name: "Twister",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.DRAGON,
    Power: 40,
    Accuracy: 100,
    PP: 20,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(20)){
          ApplyFear(Target)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  DOUBLE_SLAP: {
    Name: "Double Slap",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.NORMAL,
    Power: 15,
    Accuracy: 85,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, true)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  BULLET_SEED: {
    Name: "Bullet Seed",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.GRASS,
    Power: 25,
    Accuracy: 100,
    PP: 30,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, false)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  ROCK_BLAST: {
    Name: "Rock Blast",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.ROCK,
    Power: 25,
    Accuracy: 90,
    PP: 25,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, false)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  ARM_THRUST: {
    Name: "Arm Thrust",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.COMBAT,
    Power: 15,
    Accuracy: 100,
    PP: 20,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, false)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  FURY_SWIPES: {
    Name: "Fury Swipes",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.NORMAL,
    Power: 18,
    Accuracy: 80,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, true)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  PIN_MISSILE: {
    Name: "Pin Missile",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.BUG,
    Power: 25,
    Accuracy: 95,
    PP: 20,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, false)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  FURY_ATTACK: {
    Name: "Fury Attack",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.NORMAL,
    Power: 15,
    Accuracy: 85,
    PP: 20,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, true)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  SPIKE_CANNON: {
    Name: "Spike Cannon",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.NORMAL,
    Power: 20,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, false)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  TAIL_SLAP: {
    Name: "Tail Slap",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.NORMAL,
    Power: 25,
    Accuracy: 85,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, false)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  BONE_RUSH: {
    Name: "Bone Rush",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.GROUND,
    Power: 25,
    Accuracy: 90,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, false)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  BARRAGE: {
    Name: "Barrage",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.NORMAL,
    Power: 20,
    Accuracy: 85,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, false)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  COMET_PUNCH: {
    Name: "Comet Punch",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.NORMAL,
    Power: 18,
    Accuracy: 85,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, true)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  WATER_SHURIKEN: { // TODO : Priority
    Name: "Water Shuriken",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.WATER,
    Power: 15,
    Accuracy: 100,
    PP: 20,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, false)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  SCALE_SHOT: {
    Name: "Scale Shot",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.DRAGON,
    Power: 25,
    Accuracy: 90,
    PP: 20,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, false)
        UpLevelStat(GameInstance, Sender, 'Speed')
        DownLevelStat(GameInstance, Sender, 'Def')
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  ICICLE_SPEAR: {
    Name: "Icicle Spear",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.ICE,
    Power: 25,
    Accuracy: 100,
    PP: 30,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack5(GameInstance, Target, Sender, this, false)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  TWIN_BEAM: {
    Name: "Twin Beam",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.PSY,
    Power: 40,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack2(GameInstance, Target, Sender, this, false)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  BONEMERANG: {
    Name: "Bonemerang",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.GROUND,
    Power: 50,
    Accuracy: 90,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttack2(GameInstance, Target, Sender, this, false)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  TRIPLE_AXEL: {
    Name: "Triple Axel",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.ICE,
    Power: 20,
    Accuracy: 90,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttackAccuracy(GameInstance, Target, Sender, this, 3, (value) => value + 20)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  TRIPLE_KICK: {
    Name: "Triple Kick",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.COMBAT,
    Power: 10,
    Accuracy: 90,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        MultiHitAttackAccuracy(GameInstance, Target, Sender, this, 3, (value, index) => value * (1 + index!))
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  BOOMBURST: {
    Name: "Boomburst",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.NORMAL,
    Power: 140,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  OVERDRIVE: {
    Name: "Overdrive",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.ELECTRICK,
    Power: 80,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  FLARE_BLITZ: {
    Name: "Flare Blitz",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.FIRE,
    Power: 120,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        DrawbackDamage(GameInstance, Sender, dmg.Damage, 1/3)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.BURN)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  SUNNY_DAY: {
    Name: "Sunny Day",
    Cat: Category.STATUS,
    Type: Pokemon_Types.FIRE,
    Power: null,
    Accuracy: null,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      ApplyNewWeather(GameInstance, Weather.SUN)
    }
  },
  RAIN_DANCE: {
    Name: "Rain Dance",
    Cat: Category.STATUS,
    Type: Pokemon_Types.WATER,
    Power: null,
    Accuracy: null,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      ApplyNewWeather(GameInstance, Weather.RAIN)
    }
  },
  SANDSTORM: {
    Name: "Sandstorm",
    Cat: Category.STATUS,
    Type: Pokemon_Types.ROCK,
    Power: null,
    Accuracy: null,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      ApplyNewWeather(GameInstance, Weather.SANDSTORM)
    }
  },
  HAIL: {
    Name: "Hail",
    Cat: Category.STATUS,
    Type: Pokemon_Types.ICE,
    Power: null,
    Accuracy: null,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      ApplyNewWeather(GameInstance, Weather.HAIL)
    }
  },
  MORNING_SUN: {
    Name:"Morning Sun",
    Cat: Category.STATUS,
    Type: Pokemon_Types.NORMAL,
    Power: null,
    Accuracy: null,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      let value : number
      switch (GameInstance.GetWeather()) {
        case Weather.SUN:
          value = Sender.GetMaxLP()*2/3
          break;
        case Weather.None:
          value = Sender.GetMaxLP()*1/2
          break
        default:
          value = Sender.GetMaxLP()*1/4
          break;
      }
      HealLP(GameInstance, Sender, value)
    }
  },
  SYNTHESIS: {
    Name:"Synthesis",
    Cat: Category.STATUS,
    Type: Pokemon_Types.GRASS,
    Power: null,
    Accuracy: null,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      let value : number
      switch (GameInstance.GetWeather()) {
        case Weather.SUN:
          value = Sender.GetMaxLP()*2/3
          break;
        case Weather.None:
          value = Sender.GetMaxLP()*1/2
          break
        default:
          value = Sender.GetMaxLP()*1/4
          break;
      }
      HealLP(GameInstance, Sender, value)
    }
  },
  MOONLIGHT: {
    Name:"Moonlight",
    Cat: Category.STATUS,
    Type: Pokemon_Types.FAIRY,
    Power: null,
    Accuracy: null,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      let value : number
      switch (GameInstance.GetWeather()) {
        case Weather.SUN:
          value = Sender.GetMaxLP()*2/3
          break;
        case Weather.None:
          value = Sender.GetMaxLP()*1/2
          break
        default:
          value = Sender.GetMaxLP()*1/4
          break;
      }
      HealLP(GameInstance, Sender, value)
    }
  },
  GROWTH: {
    Name: "Growth",
    Cat: Category.STATUS,
    Type: Pokemon_Types.NORMAL,
    Power: null,
    Accuracy: null,
    PP: 20,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      UpLevelStat(GameInstance, Sender, 'Att')
      UpLevelStat(GameInstance, Sender, 'SpeAtt')
      if (GameInstance.GetWeather() === Weather.SUN) {
        UpLevelStat(GameInstance, Sender, 'Att')
        UpLevelStat(GameInstance, Sender, 'SpeAtt')
      }
    }
  },
  HEAL_PULSE: {
    Name: "Heal Pulse",
    Cat: Category.STATUS,
    Type: Pokemon_Types.PSY,
    Power: null,
    Accuracy: null,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      HealLP(GameInstance, Target, Target.GetMaxLP()*1/2)
    }
  },
  RECOVER: {
    Name: "Recover",
    Cat: Category.STATUS,
    Type: Pokemon_Types.NORMAL,
    Power: null,
    Accuracy: null,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      HealLP(GameInstance, Sender, Sender.GetMaxLP()*1/2)
    }
  },
  STRENGTH: {
    Name: "Strength",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.NORMAL,
    Power: 80,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  METEOR_DRIVE: {
    Name: "Sunsteel Strike",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.STEEL,
    Power: 100,
    Accuracy: 100,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  PRECIPICE_BLADES: {
    Name: "Precipice Blades",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.GROUND,
    Power: 120,
    Accuracy: 85,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  ZAP_CANNON: {
    Name: "Zap Cannon",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.ELECTRICK,
    Power: 120,
    Accuracy: 50,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        ApplyStatut(Target, StatutEnum.PARALYZE)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  SWORDS_DANCE: {
    Name: "Swords Dance",
    Cat: Category.STATUS,
    Type: Pokemon_Types.NORMAL,
    Power: null,
    Accuracy: null,
    PP: 20,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      UpLevelStat(GameInstance, Sender, 'Att')
      UpLevelStat(GameInstance, Sender, 'Att')
    }
  },
  CLOSE_COMBAT: {
    Name: "Close Combat",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.COMBAT,
    Power: 120,
    Accuracy: 100,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        DownLevelStat(GameInstance, Sender, 'Def')
        DownLevelStat(GameInstance, Sender, 'SpeDef')
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  WICKED_TORQUE: {
    Name: "Wicked Torque",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.DARK,
    Power: 80,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(10)){
          ApplyStatut(Target, StatutEnum.SLEEP)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  CONFUSE_RAY: {
    Name: "Confuse Ray",
    Cat: Category.STATUS,
    Type: Pokemon_Types.GHOST,
    Power: null,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        ApplyConfusion(Target)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  BULLDOZE: {
    Name: "Bulldoze",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.GROUND,
    Power: 60,
    Accuracy: 100,
    PP: 20,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        DownLevelStat(GameInstance, Target, 'Speed')
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  HYPER_VOICE: {
    Name: "Hyper Voice",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.NORMAL,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        // TODO : ByPass clone
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  LIQUIDATION: {
    Name: "Liquidation",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.WATER,
    Power: 85,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(20)){
          DownLevelStat(GameInstance, Target, 'Def')
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  STONE_EDGE: {
    Name: "Stone Edge",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.ROCK,
    Power: 100,
    Accuracy: 80,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance() + 1, GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    },
  },
  MATCHA_GOTCHA: {
    Name: "Matcha Gotcha",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.GRASS,
    Power: 80,
    Accuracy: 90,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        HealLP(GameInstance, Sender, dmg.Damage/2)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(20)){
          ApplyStatut(Target, StatutEnum.BURN)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  STEAM_ERUPTION: {
    Name: "Steam Eruption",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.WATER,
    Power: 110,
    Accuracy: 95,
    PP: 5,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (Target.GetStatut() === StatutEnum.FREEZE) {
          Target.SetStatut(StatutEnum.None)
        }
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(30)){
          ApplyStatut(Target, StatutEnum.BURN)
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  SPIRIT_BREAK: {
    Name: "Spirit Break",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.FAIRY,
    Power: 75,
    Accuracy: 100,
    PP: 15,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        DownLevelStat(GameInstance, Target, 'SpeAtt')
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  CHILLING_WATER: {
    Name: "Chilling Water",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.WATER,
    Power: 50,
    Accuracy: 100,
    PP: 20,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        DownLevelStat(GameInstance, Target, 'Att')
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  BRINE: {
    Name: "Brine",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.WATER,
    Power: 65,
    Accuracy: 100,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        if (Sender.GetLP() <= Sender.GetMaxLP()/2) {
          this.Power = this.Power! * 2
        }
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  METEOR_MASH: {
    Name: "Meteor Mash",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.STEEL,
    Power: 90,
    Accuracy: 90,
    PP: 10,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
        InflictDamage(GameInstance, Target, dmg.Damage)
        if (!Target.GetKO() && dmg.Damage > 0 && ProbabilityCheck(20)){
          UpLevelStat(GameInstance, Sender, 'Att')
        }
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  METAL_SOUND: {
    Name: "Metal Sound",
    Cat: Category.STATUS,
    Type: Pokemon_Types.STEEL,
    Power: null,
    Accuracy: 85,
    PP: 40,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      if (AccuracyCheck(this.Accuracy!, Sender)) {
        DownLevelStat(GameInstance, Target, 'SpeDef')
        DownLevelStat(GameInstance, Target, 'SpeDef')
      } else {
        GameInstance.AppendTextArea(`${Sender.GetName()}'s attack missed !`)
      }
    }
  },
  DRAGON_DANCE: {
    Name: "Dragon Dance",
    Cat: Category.STATUS,
    Type: Pokemon_Types.DRAGON,
    Power: null,
    Accuracy: null,
    PP: 20,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      UpLevelStat(GameInstance, Sender, 'SpeAtt')
      UpLevelStat(GameInstance, Sender, 'Speed')
    }
  },
  STRUGGLE: {
    Name: "Struggle",
    Cat: Category.PHYSICAL,
    Type: Pokemon_Types.NORMAL,
    Power: 50,
    Accuracy: null,
    PP: 1000,
    Effect(GameInstance : Game, Target : Pokemon, Sender : Pokemon) {
      GameInstance.AppendTextArea(`${Sender.GetName()} use ${this.Name} !`)
      let dmg = ComputeDamages(GameInstance, this, Target, Sender, Sender.GetCritChance(), GameInstance.GetWeather())
      InflictDamage(GameInstance, Target, dmg.Damage)
      DrawbackDamage(GameInstance, Sender, Sender.GetMaxLP(), 0.25)
    },
  },
} as const;
