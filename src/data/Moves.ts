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
