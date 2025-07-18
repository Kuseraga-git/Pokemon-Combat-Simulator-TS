import { Request, Response } from "express-serve-static-core";
import { Teams } from "../classes/teams";
import { Game } from "../classes/game";

let gameInstance : Game = new Game()

export function CombatActionHandler(Request: Request, Response: Response) {
    gameInstance.CombatAction(Request.body.choice1, Request.body.indexNewPokemon1);
    Response.json({ success: true, Data: gameInstance})
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
    let WinnerIndex : number = Request.body.WinnerIndex
    let WinnerTeam : Teams = Request.body.WinnerTeam
    let LoserTeam : Teams = Request.body.LoserTeam
    Response.render("gameEnd", {WinnerIndex : WinnerIndex, WinnerTeam : WinnerTeam, LoserTeam : LoserTeam})
}