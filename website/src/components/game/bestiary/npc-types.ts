export type NPCCard = {
    name: string;
    variant: string;
    turn_order: string[];
    characteristics: Characteristics;
    actions: Actions;
    stats: Stats;
};

export type Characteristics = {
    base: CharacteristicGroup;
    optional?: CharacteristicGroup;
};

export type CharacteristicGroup = {
    title: string;
    details: {
        [name: string]: string;
    };
};

export type Actions = {
    limit: number;
    basic: ActionGroup;
    special?: ActionGroup;
    learnable?: ActionGroup;
};

export type ActionGroup = {
    [name: string]: Action;
};

export type Action = {
    name: string;
    autoHit?: boolean;
    type: string;
    range?: number;
    effect: string;
};

export type Stats = {
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
};

export type TurnOrder = string[];
