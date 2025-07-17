import { Move, Moves } from "./datas/moves";
import { IPokemon, Pokedex } from "./datas/pokedex";

export type TPokedex = {
  [key : string] : IPokemon
}

export type PokemonName = keyof typeof Pokedex;

export type TMoves = {
  [key : string] : Move
}

export type MoveName = keyof typeof Moves

export type DamageIsCrit = {
  Damage : number,
  Crit : boolean
}