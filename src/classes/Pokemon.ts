import { StatsChanges } from "../data/StatsChanges"
import { GetMove, Move } from "../data/Moves"
import { Pokedex } from "../data/Pokedex"
import { Pokemon_Types } from "../data/Pokemon_Types"
import { StatutEnum } from "../data/Statuts"
import { MoveName, TMoves, TPokedex } from "../Types"
import { Game } from "./Game"
import { WriteInTextArea } from "../Gameplay/Display"
import { Weather } from "../data/Weather"

export class Pokemon {
    private readonly Name : string
    private readonly Max_LP : number
    private CurrentLP : number
    private Type1 : Pokemon_Types
    private Type2 : Pokemon_Types
    private Att : number
    private AttLevel : number = 0
    private Def : number
    private DefLevel : number = 0
    private readonly SpeAtt : number
    private SpeAttLevel : number = 0
    private SpeDef : number
    private SpeDefLevel : number = 0
    private Speed : number
    private SpeedLevel : number = 0
    private AccuracyLevel : number = 0
    private CritChance : number = 0
    private KO : boolean = false
    private Statut : StatutEnum = StatutEnum.None
    private SleepTurn : number = 0
    private PoisonTurn : number = 0
    private Confusion : boolean = false
    private ConfusionTurn : number = 0
    private Fear : boolean = false
    private Moves : Move[]
    private PP : number[]
    private readonly Image : string

    constructor(pokemon : keyof typeof Pokedex) {
        const pokemonData = Pokedex[pokemon]
        this.Name = pokemonData.Name
        this.Max_LP = pokemonData.Max_LP
        this.CurrentLP = pokemonData.Max_LP
        this.Type1 = pokemonData.Type1
        this.Type2 = pokemonData.Type2
        this.Att = pokemonData.Att
        this.Def = pokemonData.Def
        this.SpeAtt = pokemonData.SpeAtt
        this.SpeDef = pokemonData.SpeDef
        this.Speed = pokemonData.Speed
        this.Moves = pokemonData.Moves
        this.PP = this.Moves.map(move => move.PP);
        this.Image = pokemonData.Image
    }

    PopInBattle(GameInstance : Game) {
        WriteInTextArea(`${this.Name} I choose you !!!`)
        this.ResetStats()
        this.WeatherUpgrade(GameInstance)
    }

    ResetStats() {
        this.AttLevel = 0
        this.DefLevel = 0
        this.SpeAttLevel = 0
        this.SpeDefLevel = 0
        this.SpeedLevel = 0
        this.Confusion = false
        this.Fear = false
        if (this.Statut === StatutEnum.PARALYZE) {
            this.Speed = Math.trunc(this.Speed / 2)
        }
        if (this.Statut === StatutEnum.BURN) {
            this.Att = Math.trunc(this.Att / 2)
        }
    }

    WeatherUpgrade(GameInstance : Game) {
        if (GameInstance.GetWeather() === Weather.SANDSTORM) {
            if (this.getPokemonTypes().includes(Pokemon_Types.ROCK)) {
                this.SpeDef += this.SpeDef * 3/2
            }
        } else if (GameInstance.GetWeather() === Weather.HAIL) {
            if (this.getPokemonTypes().includes(Pokemon_Types.ICE)) {
                this.Def += this.Def * 3/2
            }
        }
    }

    GetStatLevel(StatName : string) : number {
        switch (StatName) {
            case 'Att':
                return(this.AttLevel)
                break;
            case 'Def':
                return(this.DefLevel)
                break;
            case 'SpeAtt':
                return(this.SpeAttLevel)
                break;
            case 'SpeDef':
                return(this.SpeDefLevel)
                break;
            case 'Speed':
                return(this.SpeedLevel)
                break;        
            default:
                return NaN
                break;
        }
    }

    SetStatLevel(StatName : string, Value : number) {
        switch (StatName) {
            case 'Att':
                this.AttLevel = Value
                break;
            case 'Def':
                this.DefLevel = Value
                break;
            case 'SpeAtt':
                this.SpeAttLevel = Value
                break;
            case 'SpeDef':
                this.SpeDefLevel = Value
                break;
            case 'Speed':
                this.SpeedLevel = Value
                break;        
            default:
                break;
        }
    }

    UseMove(GameInstance : Game, MoveIndex : number, Target : Pokemon) : boolean {
        if (MoveIndex < 0 || MoveIndex >= this.Moves.length) {
            console.log("Invalid move index!");
            return false;
        }

        if (this.PP[MoveIndex] <= 0) {
            console.log("No PP left for this move!");
            return false;
        }
        
        // const move = GetMove(this.Moves[MoveIndex])
        this.Moves[MoveIndex].Effect(GameInstance, Target, this)
        this.PP[MoveIndex]--
        this.FormatKO()
        Target.FormatKO()
        return true
    }

    GetMoves() : Move[] {
        return(this.Moves)
    }

    GetMove(MoveIndex : number) : Move {
        return(this.Moves[MoveIndex])
    }

    GetStatValue(StatName : string) : number{
        switch (StatName) {
            case 'Att':
                return(this.Att * (StatsChanges.get(this.AttLevel) ?? 1))
                break;
            case 'Def':
                return(this.Def * (StatsChanges.get(this.DefLevel) ?? 1))
                break;
            case 'SpeAtt':
                return(this.SpeAtt * (StatsChanges.get(this.SpeAttLevel) ?? 1))
                break;
            case 'SpeDef':
                return(this.SpeDef * (StatsChanges.get(this.SpeDefLevel) ?? 1))
                break;
            case 'Speed':
                return(this.Speed * (StatsChanges.get(this.SpeedLevel) ?? 1))
                break;        
            default:
                return NaN
                break;
        }
    }

    FormatKO() {
        if (this.CurrentLP <= 0) {
            this.CurrentLP = 0
            this.Statut = StatutEnum.None
            this.KO = true
        }
    }
    
    GetKO() : boolean {
        return(this.KO)
    }

    GetName() : string {
        return(this.Name)
    }

    GetImage() : string {
        return(this.Image)
    }

    GetMovePP(MoveIndex : number) : number {
        return(this.PP[MoveIndex])
    }

    GetStatut() : StatutEnum {
        return(this.Statut)
    }

    SetStatut(NewStatut : StatutEnum) {
        this.Statut = NewStatut
    }

    GetConfusion() : boolean {
        return (this.Confusion)
    }

    SetConfusion(Value : boolean) {
        this.Confusion = Value
    }

    GetConfusionTurn() : number {
        return(this.ConfusionTurn)
    }

    SetConfusionTurn(Value : number) {
        this.ConfusionTurn = Value
        if (Value === 0) {
            this.Confusion = false
        }
    }

    GetFear() : boolean {
        return (this.Fear)
    }

    SetFear( value : boolean) {
        this.Fear = value
    }

    getPokemonTypes() : Pokemon_Types[] {
        return ([this.Type1, this.Type2])
    }

    GetLP() : number {
        return(this.CurrentLP)
    }

    SetLP(newLP : number) {
        this.CurrentLP = newLP
    }

    GetMaxLP() : number {
        return(this.Max_LP)
    }

    GetPoisonTurn() : number {
        return(this.PoisonTurn)
    }

    SetPoisonTurn(value : number) {
        this.PoisonTurn = value
    }

    GetSleepTurn() : number {
        return(this.SleepTurn)
    }

    SetSleepTurn(value : number) {
        this.SleepTurn = value
        if (value === 0) {
            this.Statut = StatutEnum.None
        }
    }

}