import { Milestone } from '../game/milestone.js';

export const milestoneMock: Milestone = {
    author: 'Ben Allen',
    language: 'en-GB',
    createdOn: new Date(),
    updatedAt: new Date(),
    title: '',
    description: '',
    synopsis: '',
    tags: [],
    stats: {
        players: 0,
        characters: 0,
        completions: 0,
        rating: {
            count: 9,
            score: 40,
        },
    },
    acts: [
        {
            title: 'Finding the problem',
            keyItems: {},
            encounters: {
                'choice-one': {
                    type: 'decision',
                    name: 'The first choice',
                    start: 'some-trigger',
                    steps: {},
                },
            },
        },
    ],
};
