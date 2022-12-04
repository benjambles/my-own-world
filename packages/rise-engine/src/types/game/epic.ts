import { Milestone } from './milestone.js';

export interface Epic {
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
}
