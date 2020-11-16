import { Milestone } from './milestone';

export type Epic = {
    id: string;
    title: string;
    description: string;
    synopsis: string;
    milestones: Milestone[];
    languageVariants?: {
        [name: string]: string;
    };
    tags?: {
        [name: string]: string;
    };
};
