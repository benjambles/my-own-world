export interface NPCCard {
    name: string;
    variant: string;
    turn_order: string[];
    characteristics: Characteristics;
    actions: Actions;
    stats: Stats;
}

export interface Characteristics {
    base: CharacteristicGroup;
    optional?: CharacteristicGroup;
}

export interface CharacteristicGroup {
    title: string;
    details: {
        [name: string]: string;
    };
}

export interface Actions {
    limit: number;
    basic: ActionGroup;
    special?: ActionGroup;
    learnable?: ActionGroup;
}

export interface ActionGroup {
    [name: string]: Action;
}

export interface Action {
    name: string;
    autoHit?: boolean;
    type: string;
    range?: number;
    effect: string;
}

export interface Stats {
    hp: {
        max: number;
        current: number;
        temporary: number;
    };
    toughness: number;
    resistance: number;
    rank: string;
    type: string;
    flow: number;
    size: string;
}
