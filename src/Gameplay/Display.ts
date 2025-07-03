import { Pokemon } from "../classes/Pokemon";
import { Game } from "../classes/Game";
import { Teams } from "../classes/Teams";
import { MoveName, TMoves } from "../Types";
import { Move, Moves } from "../data/Moves";
import { Statut, StatutEnum } from "../data/Statuts";

export function ResetTextArea() {
    document.getElementById("zone-de-texte")!.innerHTML = ''
}

export function WriteInTextArea(Content : string) {
    document.getElementById("zone-de-texte")!.innerHTML += `${Content}<br>`
}

export function StandardDisplay(GameInstance : Game) {
    DisplayPokemon1(GameInstance.GetTeams()[0].GetPokemon(GameInstance.GetIndexPokemon1()), GameInstance)
    DisplayPokemon2(GameInstance.GetTeams()[1].GetPokemon(GameInstance.GetIndexPokemon2()))
    DisplayTeam1(GameInstance, GameInstance.GetTeams()[0])
    DisplayTeam2(GameInstance.GetTeams()[1])
}

export function DisplayPokemon1(Pokemon1 : Pokemon, GameInstance : Game) {
    const pokemonCard : string = CreatePokemonCombatCard(Pokemon1, 1)
    document.getElementById("pokemon1")!.innerHTML = pokemonCard
    const movesButton = <HTMLElement>document.getElementById("capa-list1")
    for (const [index, element] of Pokemon1.GetMoves().entries()) {
        movesButton.innerHTML += CreatePokemonMove(element, Pokemon1.GetMovePP(index), index)
    }
    const Moves = <NodeListOf<Element>>document.querySelectorAll(".capa")
    for (const [index, element] of Moves.entries()) {
        element.addEventListener("click", function(event) {
            GameInstance.CombatAction(index)
            document.getElementById(`PPCapa${index}`)!.textContent = Pokemon1.GetMovePP(index).toString()
        })
    }
    document.getElementById("aleatoire")!.addEventListener("click", function(event) {
        let randValue = Math.floor(Math.random() * 4)
        GameInstance.CombatAction(randValue)
        document.getElementById(`PPCapa${randValue}`)!.textContent = Pokemon1.GetMovePP(randValue).toString()
    })
}

export function DisplayPokemon2(Pokemon : Pokemon) {
    const pokemonCard : string= CreatePokemonCombatCard(Pokemon, 2)
    document.getElementById("pokemon2")!.innerHTML = pokemonCard
}

export function DisplayTeam1(GameInstance : Game, Team : Teams) {
    const teamContainer = <HTMLElement>document.getElementById("equipe1")
    Team.GetPokemons().forEach((pokemon, pkmIndex) => {
        const pokemonCard = CreatePokemonCard(pokemon, pkmIndex, Team, 1)
        teamContainer.innerHTML += pokemonCard
    })
}

export function DisplayTeam2(Team : Teams) {
    const teamContainer = <HTMLElement>document.getElementById("equipe2")
    teamContainer.innerHTML = ''
    Team.GetPokemons().forEach((pokemon, index) => {
        const pokemonCard = CreateStatutTeam2(pokemon, index)
        teamContainer.innerHTML += pokemonCard
    })
}

export function CreatePokemonCombatCard(Pokemon : Pokemon, index : number) : string{
    return (`
        <div class="card" data-index="${index}">
            <div class="pokemon-infos">
                <h5 class="card-title">${Pokemon.GetName()}</h5>
                <progress id="PV${index}-progress" value="${Pokemon.GetLP()}" max="${Pokemon.GetMaxLP()}">${Pokemon.GetLP()} / ${Pokemon.GetMaxLP()}</progress>
                <p class="card-text" id="PV${index}">PV: ${Pokemon.GetLP()} / ${Pokemon.GetMaxLP()}</p>
                <img class="Pokemon_Type" src="./assets/Types/Type_${Pokemon.getPokemonTypes()[0]}.png"/>
                <img class="Pokemon_Type" src="./assets/Types/Type_${Pokemon.getPokemonTypes()[1]}.png"/>
                <p class="card-text">Statut: <img id="pkm-statut-${index}" class="statut-box" src="${Statut[Pokemon.GetStatut()].Image}"></img></p>
            </div>
            <img class="pokemon-image" src="${Pokemon.GetImage()}" alt="${Pokemon.GetName()}" />
        </div>
    `)
}

export function CreatePokemonCard(Pokemon : Pokemon, Index : number, Team : Teams, IndexTeam : number) {
    return(`
        <button class="equipe${IndexTeam}-pokemon-card">
            <div class="${Team.GetTrainer()}">
                <h5 class="card-title">${Pokemon.GetName()}</h5>
                <p id="equipe${IndexTeam}-${Index}" class="card-text">PV: ${Pokemon.GetLP()} / ${Pokemon.GetMaxLP()}</p>
                <img class="Team_Type" src="./assets/Types/Type_${Pokemon.getPokemonTypes()[0]}.png"/>
                <img class="Team_Type" src="./assets/Types/Type_${Pokemon.getPokemonTypes()[1]}.png"/>
                <p class="card-text-mini"><img id="equipe${IndexTeam}-${Index}-statut" class="statut-box" src="${Statut[Pokemon.GetStatut()].Image}"></img></p>
                <ul>
                    <li class="list_Capa_mini"><div class="capa_mini ${Pokemon.GetMove(0).Type}">${Pokemon.GetMove(0).Name} <span class="PP_Capa_mini"><span id="${Index}PPCapa${'0'}">${Pokemon.GetMovePP(0)}</span>/${Pokemon.GetMove(0).PP}</span><img class="cat_Capa_mini" src="./assets/Utils/${Pokemon.GetMove(0).Cat}.png"/></div></li>
                    <li class="list_Capa_mini"><div class="capa_mini ${Pokemon.GetMove(1).Type}">${Pokemon.GetMove(1).Name} <span class="PP_Capa_mini"><span id="${Index}PPCapa${'1'}">${Pokemon.GetMovePP(1)}</span>/${Pokemon.GetMove(0).PP}</span><img class="cat_Capa_mini" src="./assets/Utils/${Pokemon.GetMove(1).Cat}.png"/></div></li>
                    <li class="list_Capa_mini"><div class="capa_mini ${Pokemon.GetMove(2).Type}">${Pokemon.GetMove(2).Name} <span class="PP_Capa_mini"><span id="${Index}PPCapa${'2'}">${Pokemon.GetMovePP(2)}</span>/${Pokemon.GetMove(0).PP}</span><img class="cat_Capa_mini" src="./assets/Utils/${Pokemon.GetMove(2).Cat}.png"/></div></li>
                    <li class="list_Capa_mini"><div class="capa_mini ${Pokemon.GetMove(3).Type}">${Pokemon.GetMove(3).Name} <span class="PP_Capa_mini"><span id="${Index}PPCapa${'3'}">${Pokemon.GetMovePP(3)}</span>/${Pokemon.GetMove(0).PP}</span><img class="cat_Capa_mini" src="./assets/Utils/${Pokemon.GetMove(3).Cat}.png"/></div></li>
                </ul>
            </div>
        </button>
    `)
}

export function CreatePokemonMove(Move : Move, PP : number, Index : number) : string {
    return `<li class="list_Capa"><button class="capa ${Move.Type}">${Move.Name} <span class="PP_Capa"><span id="PPCapa${Index}">${PP}</span>/${Move.PP}</span><img class="cat_Capa" src="./assets/Utils/${Move.Cat}.png"/></button></li>`;
}

export function CreateStatutTeam2(Pokemon : Pokemon, Index : number) {
    return `<img id="equipe2-${Index}" class="pokeball" src="${Pokemon.GetKO() ? "./assets/Utils/pokeball_ko.png" : Pokemon.GetStatut() != StatutEnum.None ? "./assets/Utils/pokeball_statut.png" : "./assets/Utils/pokeball_ok.png"}"></img>`;
}

export function UpdateLPPokemons(Pokemon1 : Pokemon, Index : number, Pokemon2 : Pokemon, Team2 : Teams) {
    (document.getElementById("PV1-progress") as HTMLProgressElement).value = Pokemon1.GetLP();
    document.getElementById("PV1")!.textContent = `PV: ${Pokemon1.GetLP()} / ${Pokemon1.GetMaxLP()}`;
    document.getElementById(`equipe1-${Index}`)!.textContent = `PV: ${Pokemon1.GetLP()} / ${Pokemon1.GetMaxLP()}`;
    (document.getElementById(`equipe1-${Index}-statut`) as HTMLImageElement).src = Statut[Pokemon1.GetStatut()].Image;
    (document.getElementById(`pkm-statut-1`) as HTMLImageElement).src = Statut[Pokemon1.GetStatut()].Image;
    (document.getElementById("PV2-progress") as HTMLProgressElement).value = Pokemon2.GetLP();
    document.getElementById("PV2")!.textContent = `PV: ${Pokemon2.GetLP()} / ${Pokemon2.GetMaxLP()}`;
    (document.getElementById(`pkm-statut-2`) as HTMLImageElement).src = Statut[Pokemon2.GetStatut()].Image;
    document.getElementById(`${Index}PPCapa0`)!.textContent = Pokemon1.GetMovePP(0).toString()
    document.getElementById(`${Index}PPCapa1`)!.textContent = Pokemon1.GetMovePP(1).toString()
    document.getElementById(`${Index}PPCapa2`)!.textContent = Pokemon1.GetMovePP(2).toString()
    document.getElementById(`${Index}PPCapa3`)!.textContent = Pokemon1.GetMovePP(3).toString()
    DisplayTeam2(Team2)
}