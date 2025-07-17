import { Move } from "../datas/moves"
import { IPokemon } from "../datas/pokedex"
import { Pokemon_Types } from "../datas/pokemonTypes"
import { StatsChanges } from "../datas/statsChanges"
import { StatutEnum } from "../datas/statuts"
import { Weather } from "../datas/weather"
import { Game } from "./game"

export class Pokemon {
    private readonly Name : string
    private readonly MaxLP : number
    private CurrentLP : number
    private Type1 : Pokemon_Types
    private Type2 : Pokemon_Types
    private Att : number
    private AttLevel : number = 0
    private Def : number
    private DefLevel : number = 0
    private SpeAtt : number
    private SpeAttLevel : number = 0
    private SpeDef : number
    private SpeDefLevel : number = 0
    private Speed : number
    private SpeedLevel : number = 0
    private AccuracyLevel : number = 0
    private CritChance : number = 1
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

    constructor(pokemon : IPokemon) {
        this.Name = pokemon.Name
        this.MaxLP = pokemon.MaxLP
        this.CurrentLP = pokemon.MaxLP
        this.Type1 = pokemon.Type1
        this.Type2 = pokemon.Type2
        this.Att = pokemon.Att
        this.Def = pokemon.Def
        this.SpeAtt = pokemon.SpeAtt
        this.SpeDef = pokemon.SpeDef
        this.Speed = pokemon.Speed
        this.Moves = pokemon.Moves
        this.PP = this.Moves.map(move => move.PP);
        this.Image = pokemon.Image
    }

    PopInBattle(GameInstance : Game) {
        GameInstance.AppendTextArea(`${this.Name} I choose you !!!`)
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
        this.Moves[MoveIndex].Effect(GameInstance, Target, this)
        this.PP[MoveIndex]--
        this.FormatKO(GameInstance)
        Target.FormatKO(GameInstance)
        return true
    }

    GetMoves() : Move[] {
        return(this.Moves)
    }

    GetMove(MoveIndex : number) : Move {
        return(this.Moves[MoveIndex])
    }

    GetRawStat(StatName : string) : number {
        switch (StatName) {
            case 'Att':
                return(this.Att)
                break;
            case 'Def':
                return(this.Def)
                break;
            case 'SpeAtt':
                return(this.SpeAtt)
                break;
            case 'SpeDef':
                return(this.SpeDef)
                break;
            case 'Speed':
                return(this.Speed)
                break;        
            default:
                return NaN
                break;
        }
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

    SetRawStat(StatName : string, Value : number) {
        switch (StatName) {
            case 'Att':
                this.Att = Value
                break;
            case 'Def':
                this.Def = Value
                break;
            case 'SpeAtt':
                this.SpeAtt = Value
                break;
            case 'SpeDef':
                this.SpeDef = Value
                break;
            case 'Speed':
                this.Speed = Value
                break;        
            default:
                break;
        }
    }

    FormatKO(GameInstance : Game) {
        if (this.CurrentLP <= 0 && !this.KO) {
            this.CurrentLP = 0
            this.Statut = StatutEnum.None
            this.KO = true
            GameInstance.AppendTextArea(`${this.Name} fall KO !`)
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
        return(this.MaxLP)
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

    GetCritChance() : number {
        return(this.CritChance)
    }
    
    SetCritChance(Value : number) {
        this.CritChance = Value
    }

    GetAccuracyLevel() : number {
        return(this.AccuracyLevel)
    }

    SetAccuracyLevel(Value : number) {
        this.AccuracyLevel = Value
    }
}