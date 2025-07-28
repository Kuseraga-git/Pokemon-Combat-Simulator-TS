import { Request, Response } from "express-serve-static-core";
import { Teams } from "../classes/teams";
import { Game } from "../classes/game";
import { GameState } from "../datas/gameState";

let gameInstance : Game = new Game()

export function CombatActionHandler(Request: Request, Response: Response) {
    if (gameInstance.CombatAction(Request.body.choice1, Request.body.indexNewPokemon1) != GameState.GAME) {
        Response.json({ 
            success: true, 
            redirect: '/end',
            GameState: gameInstance.GetGameState(),
            Data: gameInstance
        });
    } else {
        Response.json({ success: true, Data: gameInstance})
    }
}

export function InitGame(Request : Request, Response : Response) {
    if (gameInstance.GetTeams().length == 0) {
        const Team1 = new Teams("toto")
        Team1.CreateTeamLeaf()
        const Team2 = new Teams("Tata")
        Team2.CreateTeamRed()
        
        gameInstance.AddTeam(Team1)
        gameInstance.AddTeam(Team2)
    }

    Response.render("game", {Data : gameInstance})
}

export function ResetGame(Request : Request, Response : Response) {
    gameInstance = new Game()
    Response.redirect('/')
}

export function FinishGame(Request : Request, Response : Response) {
    let WinnerIndex : number = gameInstance.GetGameState() == GameState.WIN1 ? 0 : gameInstance.GetGameState() == GameState.WIN2 ? 1 : -1
    let WinnerTeam : Teams = gameInstance.GetGameState() == GameState.WIN2 ? gameInstance.GetTeams()[1] : gameInstance.GetTeams()[0]
    let LoserTeam : Teams = gameInstance.GetGameState() == GameState.WIN2 ? gameInstance.GetTeams()[0] : gameInstance.GetTeams()[1]
    Response.render("gameEnd", {WinnerIndex : WinnerIndex, WinnerTeam : WinnerTeam, LoserTeam : LoserTeam, Data: gameInstance})
}