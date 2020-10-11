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

export type Encounter = {
    type: 'combat' | 'crossroad';
    name: string;
};
