export interface StatutInfo {
    Name : string
    Image : string
}

export enum StatutEnum {
    BURN = "BURN",
    FREEZE = "FREEZE",
    PARALYZE = "PARALYZE",
    POISONED = "POISONED",
    SLEEP = "SLEEP",
    None = "None",
}

export const Statut : Record<StatutEnum, StatutInfo> = {
    [StatutEnum.BURN]: {Name : "Burn", Image : "../../Images_Statuts/Burn.png"},
    [StatutEnum.FREEZE]: {Name : "Freeze", Image : "../../Images_Statuts/Freeze.png"},
    [StatutEnum.PARALYZE]: {Name : "Paralyze", Image : "../../Images_Statuts/Paralyze.png"},
    [StatutEnum.POISONED]: {Name : "Poisoned", Image : "../../Images_Statuts/Poisoned.png"},
    [StatutEnum.SLEEP]: {Name : "Sleep", Image : "../../Images_Statuts/Sleep.png"},
    [StatutEnum.None]: {Name : "None", Image : ""}
}