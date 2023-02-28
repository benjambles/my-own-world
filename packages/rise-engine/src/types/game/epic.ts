import { Milestone } from './milestone.js';

export interface Epic {
    id: string;
    description: string;
    languageVariants?: {
        [name: string]: string;
    };
    milestones: Milestone[];
    synopsis: string;
    tags?: {
        [name: string]: string;
    };
    title: string;
}
