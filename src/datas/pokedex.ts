import { TPokedex } from "../types";
import { Move, Moves } from "./moves";
import { Pokemon_Types } from "./pokemonTypes";

export interface IPokemon {
  Name: string;
  Type1: Pokemon_Types;
  Type2: Pokemon_Types;
  MaxLP: number;
  Att: number;
  Def: number;
  SpeAtt: number;
  SpeDef: number;
  Speed: number;
  Image: string;
  Moves: Move[];
}

export const Pokedex: TPokedex = {
  PIKACHU: {
    Name: "Pikachu",
    Type1: Pokemon_Types.ELECTRICK,
    Type2: Pokemon_Types.None,
    MaxLP: 274,
    Att: 350,
    Def: 196,
    SpeAtt: 218,
    SpeDef: 218,
    Speed: 306,
    Image: '../../assets/Pokemons/Pikachu.png',
    Moves: [
      Moves.VOLT_TACKLE,
      Moves.PLAY_ROUGH,
      Moves.BRICK_BREAK,
      Moves.IRON_TAIL,
    ]
  },
  VENUSAURE: {
    Name: "Venusaure",
    Type1: Pokemon_Types.GRASS,
    Type2: Pokemon_Types.POISON,
    MaxLP: 364,
    Att: 289,
    Def: 291,
    SpeAtt: 328,
    SpeDef: 328,
    Speed: 284,
    Image: '../../assets/Pokemons/Venusaure.png',
    Moves: [
      Moves.GIGA_DRAIN,
      Moves.EARTHQUAKE,
      Moves.SLUDGE_BOMB,
      Moves.LEAF_STORM
    ]
  },
  LAPRAS: {
    Name: "Lapras",
    Type1: Pokemon_Types.WATER,
    Type2: Pokemon_Types.ICE,
    MaxLP: 464,
    Att: 295,
    Def: 284,
    SpeAtt: 295,
    SpeDef: 317,
    Speed: 240,
    Image: '../../assets/Pokemons/Lapras.png',
    Moves: [
      Moves.SURF,
      Moves.BLIZZARD,
      Moves.PSYCHIC,
      Moves.ANCIENT_POWER
    ]
  },
  CHARIZARD: {
    Name: "Charizard",
    Type1: Pokemon_Types.FIRE,
    Type2: Pokemon_Types.FLY,
    MaxLP: 360,
    Att: 293,
    Def: 280,
    SpeAtt: 348,
    SpeDef: 295,
    Speed: 328,
    Image: '../../assets/Pokemons/Charizard.png',
    Moves: [
      Moves.FIRE_BLAST,
      Moves.HURRICANE,
      Moves.DRAGON_PULSE,
      Moves.FOCUS_BLAST
    ]
  },
  EXEGGUTOR: {
    Name: "Exeggutor",
    Type1: Pokemon_Types.GRASS,
    Type2: Pokemon_Types.PSY,
    MaxLP: 394,
    Att: 317,
    Def: 295,
    SpeAtt: 383,
    SpeDef: 273,
    Speed: 229,
    Image: '../../assets/Pokemons/Exeggutor.png',
    Moves: [
      Moves.POWER_WHIP,
      Moves.PSYCHIC,
      Moves.DOUBLE_EDGE,
      Moves.ANCIENT_POWER
    ]
  },
  TAUROS: {
    Name: "Tauros",
    Type1: Pokemon_Types.NORMAL,
    Type2: Pokemon_Types.None,
    MaxLP: 354,
    Att: 328,
    Def: 317,
    SpeAtt: 196,
    SpeDef: 262,
    Speed: 350,
    Image: '../../assets/Pokemons/Tauros.png',
    Moves: [
      Moves.DOUBLE_EDGE,
      Moves.EARTHQUAKE,
      Moves.ROCK_SLIDE,
      Moves.IRON_TAIL
    ]
  },
  BLASTOISE: {
    Name: "Blastoise",
    Type1: Pokemon_Types.WATER,
    Type2: Pokemon_Types.None,
    MaxLP: 362,
    Att: 291,
    Def: 328,
    SpeAtt: 295,
    SpeDef: 339,
    Speed: 280,
    Image: '../../assets/Pokemons/Blastoise.png',
    Moves: [
      Moves.HYDRO_PUMP,
      Moves.FLASH_CANNON,
      Moves.ICE_BEAM,
      Moves.AURA_SPHERE
    ]
  },
  CLEFABLE: {
    Name: "Clefable",
    Type1: Pokemon_Types.FAIRY,
    Type2: Pokemon_Types.None,
    MaxLP: 394,
    Att: 262,
    Def: 269,
    SpeAtt: 317,
    SpeDef: 306,
    Speed: 240,
    Image: '../../assets/Pokemons/Clefable.png',
    Moves: [
      Moves.MOON_BLAST,
      Moves.TRI_ATTACK,
      Moves.FLAMMETHROWER,
      Moves.DARK_PULSE
    ]
  },
  GENGAR: {
    Name: "Gengar",
    Type1: Pokemon_Types.GHOST,
    Type2: Pokemon_Types.POISON,
    MaxLP: 324,
    Att: 251,
    Def: 240,
    SpeAtt: 394,
    SpeDef: 273,
    Speed: 350,
    Image: '../../assets/Pokemons/Gengar.png',
    Moves: [
      Moves.DARK_PULSE,
      Moves.SHADOW_BALL,
      Moves.SLUDGE_BOMB,
      Moves.ENERGY_BALL
    ]
  },
}