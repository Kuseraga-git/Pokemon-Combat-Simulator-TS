export interface StatutInfo {
    Name : string
    Image : string
}

export enum StatutEnum {
    BURN = "Burn",
    FREEZE = "Freeze",
    PARALYZE = "Paralyze",
    POISONED = "Poisoned",
    SLEEP = "Sleep",
    None = "None",
}

export const Statut : Record<StatutEnum, StatutInfo> = {
    [StatutEnum.BURN]: {Name : "Burn", Image : "./assets/Statuts/Burn.png"},
    [StatutEnum.FREEZE]: {Name : "Freeze", Image : "./assets/Statuts/Freeze.png"},
    [StatutEnum.PARALYZE]: {Name : "Paralyze", Image : "./assets/Statuts/Paralyze.png"},
    [StatutEnum.POISONED]: {Name : "Poisoned", Image : "./assets/Statuts/Poisoned.png"},
    [StatutEnum.SLEEP]: {Name : "Sleep", Image : "./assets/Statuts/Sleep.png"},
    [StatutEnum.None]: {Name : "None", Image : ""}
}