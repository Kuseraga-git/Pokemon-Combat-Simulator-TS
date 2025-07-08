import { Pokemon } from "../classes/Pokemon";
import { WriteInTextArea } from "../Gameplay/Display";

export const AccuracyChanges = new Map<number, number>([
    [-6, 3/9],
    [-5, 3/8],
    [-4, 3/7],
    [-3, 3/6],
    [-2, 3/5],
    [-1, 3/4],
    [0, 1],
    [1, 4/3],
    [2, 5/3],
    [3, 6/3],
    [4, 7/3],
    [5, 8/3],
    [6, 9/3],
]);

export function AccuracyCheck(Accuracy : number, Pokemon : Pokemon) : boolean {
    let randValue : number = Math.trunc(Math.random() * 100) + 1
    return(randValue <= (Accuracy * AccuracyChanges.get(Pokemon.GetAccuracyLevel())!))
}

export function DownLevelAccuracy(Pokemon : Pokemon) {
    if (Pokemon.GetAccuracyLevel() > -6) {
        WriteInTextArea(`${Pokemon.GetName()}'s Accuracy fell !`)
        Pokemon.SetAccuracyLevel(Pokemon.GetAccuracyLevel() - 1)
    } else {
        WriteInTextArea(`${Pokemon.GetName()}'s Accuracy won't go any lower !`)
    }
}

export function UpLevelAccuracy(Pokemon : Pokemon) {
    if (Pokemon.GetAccuracyLevel() < 6) {
        WriteInTextArea(`${Pokemon.GetName()}'s Accuracy rose !`)
        Pokemon.SetAccuracyLevel(Pokemon.GetAccuracyLevel() + 1)
    } else {
        WriteInTextArea(`${Pokemon.GetName()}'s Accuracy won't go any higher !`)
    }
}