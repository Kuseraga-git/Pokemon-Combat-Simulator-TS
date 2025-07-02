import { MoveName, TMoves, TPokedex } from "../Types";
import { Moves } from "./Moves";
import { Pokemon_Types } from "./Pokemon_Types";

export interface Pokemon {
  Name: string;
  Type1: Pokemon_Types;
  Type2: Pokemon_Types;
  Max_LP: number;
  Att: number;
  Def: number;
  SpeAtt: number;
  SpeDef: number;
  Speed: number;
  Image: string;
  Moves: MoveName[];
}

export const Pokedex: TPokedex = {
  PIKACHU: {
    Name: "Pikachu",
    Type1: Pokemon_Types.ELECTRICK,
    Type2: Pokemon_Types.None,
    Max_LP: 274,
    Att: 350,
    Def: 196,
    SpeAtt: 218,
    SpeDef: 218,
    Speed: 306,
    Image: '../../assets/Pokemons/Pikachu.png',
    Moves: [
      'ELECTACLE',
      'CALINERIE',
      'CASSE_BRIQUE',
      'QUEUE_DE_FER'
    ] as MoveName[]
  },
  FLORIZARRE: {
    Name: "Florizarre",
    Type1: Pokemon_Types.GRASS,
    Type2: Pokemon_Types.POISON,
    Max_LP: 364,
    Att: 289,
    Def: 291,
    SpeAtt: 328,
    SpeDef: 328,
    Speed: 284,
    Image: '../../assets/Pokemons/Florizarre.png',
    Moves: [
      'MEGA_SANGSUE',
      'SEISME',
      'BOMB_BEURK',
      'TEMPETE_VERTE'
    ] as MoveName[]
  },
  LOKHLASS: {
    Name: "Lokhlass",
    Type1: Pokemon_Types.WATER,
    Type2: Pokemon_Types.ICE,
    Max_LP: 464,
    Att: 295,
    Def: 284,
    SpeAtt: 295,
    SpeDef: 317,
    Speed: 240,
    Image: '../../assets/Pokemons/Lokhlass.png',
    Moves: [
      'SURF',
      'BLIZZARD',
      'PSYKO',
      'POUVOIR_ANTIQUE'
    ] as MoveName[]
  },
}