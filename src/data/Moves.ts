import { Pokemon } from "../classes/Pokemon"
import { Game } from "../classes/Game"
import { MoveName, TMoves } from "../Types"
import { Category } from "./Category"
import { Pokemon_Types } from "./Pokemon_Types"

export interface Move {
    Name : string
    Cat : Category
    Type : Pokemon_Types
    Power : number | null
    Accuracy : number | null
    PP : number
    Effect : (GameInstance : Game, Target : Pokemon, Sender : Pokemon) => void
}

export function GetMove(moveName : MoveName) : Move {
        return Moves[moveName]
    }

export const Moves: TMoves = {
  ELECTACLE: {
    Name: "Electacle",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.ELECTRICK,
    Power: 120,
    Accuracy: 100,
    PP: 15,
    Effect() {
      console.log("Electacle: i'm working");
      // Add your move logic here
    }
  },
  CALINERIE: {
    Name: "Câlinerie",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.FAIRY,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect() {
      console.log("Câlinerie: i'm working");
      // Add your move logic here
    }
  },
  CASSE_BRIQUE: {
    Name: "Casse-Brique",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.COMBAT,
    Power: 75,
    Accuracy: 100,
    PP: 15,
    Effect() {
      console.log("Casse brique: i'm working");
      // Add your move logic here
    }
  },
  QUEUE_DE_FER: {
    Name: "Queue de Fer",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.STEEL,
    Power: 100,
    Accuracy: 75,
    PP: 15,
    Effect() {
      console.log("Electacle: i'm working");
      // Add your move logic here
    }
  },
  MEGA_SANGSUE: {
    Name: "Méga-Sangsue",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.GRASS,
    Power: 75,
    Accuracy: 100,
    PP: 10,
    Effect() {
      console.log("Electacle: i'm working");
      // Add your move logic here
    }
  },
  SEISME: {
    Name: "Séisme",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.GROUND, // Should be GROUND type when you add it
    Power: 100,
    Accuracy: 100,
    PP: 10,
    Effect() {
      console.log("Electacle: i'm working");
      // Add your move logic here
    }
  },
  BOMB_BEURK: {
    Name: "Bomb-Beurk",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.POISON,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect() {
      console.log("Electacle: i'm working");
      // Add your move logic here
    }
  },
  TEMPETE_VERTE: {
    Name: "Tempête Verte",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.GRASS,
    Power: 130,
    Accuracy: 90,
    PP: 5,
    Effect() {
      console.log("Electacle: i'm working");
      // Add your move logic here
    }
  },
  SURF: {
    Name: "Surf",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.WATER,
    Power: 90,
    Accuracy: 100,
    PP: 15,
    Effect() {
      console.log("Electacle: i'm working");
      // Add your move logic here
    }
  },
  BLIZZARD: {
    Name: "Blizzard",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.ICE,
    Power: 110,
    Accuracy: 70,
    PP: 5,
    Effect() {
      console.log("Electacle: i'm working");
      // Add your move logic here
    }
  },
  PSYKO: {
    Name: "Psyko",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.PSY,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect() {
      console.log("Electacle: i'm working");
      // Add your move logic here
    }
  },
  POUVOIR_ANTIQUE: {
    Name: "Pouvoir Antique",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.PSY,
    Power: 60,
    Accuracy: 100,
    PP: 5,
    Effect() {
      console.log("Electacle: i'm working");
      // Add your move logic here
    },
  },
  FIRE_BLAST: {
    Name: "Fire Blast",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.FIRE,
    Power: 110,
    Accuracy: 85,
    PP: 5,
    Effect() {
      console.log("Fire Blast: i'm working");
      // Add your move logic here
    },
  },
  HURRICANE: {
    Name: "Hurricane",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.FLY,
    Power: 110,
    Accuracy: 70,
    PP: 10,
    Effect() {
      console.log("Hurricane: i'm working");
      // Add your move logic here
    },
  },
  DRAGON_PULSE: {
    Name: "Dragon Pulse",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.DRAGON,
    Power: 85,
    Accuracy: 100,
    PP: 10,
    Effect() {
      console.log("Dragon Pulse: i'm working");
      // Add your move logic here
    },
  },
  FOCUS_BLAST: {
    Name: "Focus Blast",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.COMBAT,
    Power: 120,
    Accuracy: 70,
    PP: 5,
    Effect() {
      console.log("Focus Blast: i'm working");
      // Add your move logic here
    },
  },
  POWER_WHIP: {
    Name: "Power Whip",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.GRASS,
    Power: 120,
    Accuracy: 85,
    PP: 10,
    Effect() {
      console.log("Power Whip: i'm working");
      // Add your move logic here
    },
  },
  DOUBLE_EDGE: {
    Name: "Double Edge",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.NORMAL,
    Power: 120,
    Accuracy: 10,
    PP: 15,
    Effect() {
      console.log("Double Edge: i'm working");
      // Add your move logic here
    },
  },
  ROCK_SLIDE: {
    Name: "Rock Slide",
    Cat: Category.PHYSIQUE,
    Type: Pokemon_Types.ROCK,
    Power: 80,
    Accuracy: 90,
    PP: 10,
    Effect() {
      console.log("Rock Slide: i'm working");
      // Add your move logic here
    },
  },
  HYDRO_PUMP: {
    Name: "Hydro Pump",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.WATER,
    Power: 120,
    Accuracy: 85,
    PP: 5,
    Effect() {
      console.log("Hydro Pump: i'm working");
      // Add your move logic here
    },
  },
  FLASH_CANNON: {
    Name: "Flash Cannon",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.STEEL,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect() {
      console.log("Flash Cannon: i'm working");
      // Add your move logic here
    },
  },
  ICE_BEAM: {
    Name: "Ice Beam",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.ICE,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect() {
      console.log("Ice Beam: i'm working");
      // Add your move logic here
    },
  },
  AURA_SPHERE: {
    Name: "Aura Sphere",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.COMBAT,
    Power: 120,
    Accuracy: null,
    PP: 20,
    Effect() {
      console.log("Focus Blast: i'm working");
      // Add your move logic here
    },
  },
  MOON_BLAST: {
    Name: "Moon Blast",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.FAIRY,
    Power: 95,
    Accuracy: 100,
    PP: 15,
    Effect() {
      console.log("Focus Blast: i'm working");
      // Add your move logic here
    },
  },
  TRI_ATTACK: {
    Name: "Tri Attack",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.NORMAL,
    Power: 80,
    Accuracy: 100,
    PP: 10,
    Effect() {
      console.log("Tri Attack: i'm working");
      // Add your move logic here
    },
  },
  FLAMMETHROWER: {
    Name: "Flammethrower",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.FIRE,
    Power: 90,
    Accuracy: 100,
    PP: 15,
    Effect() {
      console.log("Flammethrower: i'm working");
      // Add your move logic here
    },
  },
  THUNDERBOLT: {
    Name: "Thunderbolt",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.ELECTRICK,
    Power: 90,
    Accuracy: 100,
    PP: 15,
    Effect() {
      console.log("Thunderbolt: i'm working");
      // Add your move logic here
    },
  },
  DARK_PULSE: {
    Name: "Dark Pulse",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.DARK,
    Power: 80,
    Accuracy: 100,
    PP: 15,
    Effect() {
      console.log("Dark Pulse: i'm working");
      // Add your move logic here
    },
  },
  SHADOW_BALL: {
    Name: "Shadow Ball",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.GHOST,
    Power: 80,
    Accuracy: 100,
    PP: 15,
    Effect() {
      console.log("Shadow Ball: i'm working");
      // Add your move logic here
    },
  },
  ENERGY_BALL: {
    Name: "Energy Ball",
    Cat: Category.SPECIAL,
    Type: Pokemon_Types.GRASS,
    Power: 90,
    Accuracy: 100,
    PP: 10,
    Effect() {
      console.log("Energy Ball: i'm working");
      // Add your move logic here
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
      console.log("Lutte: i'm working");
      // Add your move logic here
    },
  },
} as const;
