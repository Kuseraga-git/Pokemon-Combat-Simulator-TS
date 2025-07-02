import { Move, Moves } from "./data/Moves"
import { Pokedex, Pokemon } from "./data/Pokedex"

export type TPokedex = {
  [key : string] : Pokemon
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