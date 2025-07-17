import { Request, Response } from "express-serve-static-core";
import { Teams } from "../classes/teams";
import { Game } from "../classes/game";

let gameInstance : Game = new Game()

export function CombatActionHandler(Req: Request, Res: Response) {
    gameInstance.CombatAction(Req.body.choice1, Req.body.indexNewPokemon1);
    Res.json({ success: true, Data: gameInstance})
}

export function init(request : Request, response : Response) {
    if (gameInstance.GetTeams().length == 0) {
        const Team1 = new Teams("toto")
        Team1.CreateTeamLeaf()
        const Team2 = new Teams("Tata")
        Team2.CreateTeamRed()
        
        gameInstance.AddTeam(Team1)
        gameInstance.AddTeam(Team2)
    }

    response.render("game", {Data : gameInstance})
}

export function reset(request : Request, response : Response) {
    gameInstance = new Game()
    response.redirect('/')
}