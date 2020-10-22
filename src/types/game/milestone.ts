import { Item } from './items';

export type Milestone = {
    title: string;
    description: string;
    synopsis: string;
    tags: string[];
    stats: {
        players: number;
        characters: number;
        completions: number;
        rating: {
            count: number;
            score: number;
        };
    };
    author: string;
    language: string;
    createdOn: Date;
    updatedAt: Date;
    acts: Act[];
};

export type Act = {
    title: string;
    keyItems: {
        [name: string]: Item;
    };
    encounters: {
        [name: string]: Encounter;
    };
};

export type Encounter = Combat | Crossroad;
export type CombatType = 'combat';
export type CrossroadTypes = 'decision' | 'divergence' | 'discovery' | 'dialogue';

export type Combat = {
    type: CombatType;
    name: string;
};

export type Crossroad = {
    name: string;
    type: CrossroadTypes;
    start: string;
    steps: {
        [name: string]: {
            name: string;
            type: CrossroadTypes;
        };
    };
};
