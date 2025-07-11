import { Game } from "./classes/Game";
import { Teams } from "./classes/Teams";
import { StandardDisplay } from "./Gameplay/Display";

const Team1 = new Teams("toto")
Team1.CreateTeamLeaf()
const Team2 = new Teams("Tata")
Team2.CreateTeamRed()

const game : Game = new Game()
game.AddTeam(Team1)
game.AddTeam(Team2)

StandardDisplay(game)