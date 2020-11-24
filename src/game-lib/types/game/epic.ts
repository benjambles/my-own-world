import { Milestone } from './milestone';

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
