export interface StatBlocks {
    combat: {
        [name: string]: [number, number]; // [Max, Current]
    };
    story: {
        [name: string]: number;
    };
}

export interface Modifiers {
    newActions: [];
    preventedActions: [];
    statChanges: [];
}
