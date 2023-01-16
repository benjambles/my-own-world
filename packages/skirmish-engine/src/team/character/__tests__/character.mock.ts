import { Character } from '../character.js';

export const mockCharacter: Character = {
    name: 'Eva Lumier',
    description: 'Dmage dealer',
    entityId: 'char-1',
    speciesId: 'species-01',
    factions: ['Player', 'Nomads'],
    preventedActions: ['sneak'],
    bodyParts: [
        {
            id: 'head-01',
            isCritial: true,
            modifiers: {
                onDamage: {
                    newActions: [],
                    preventedActions: [],
                    statChanges: [],
                },
            },
            name: 'head',
            type: 'head',
            state: 'normal',
        },
    ],
    skills: {
        pistols: 1,
        blades: 2,
        sniper_rifles: 3,
        hacking: 5,
    },
    experience: 3,
    stance: 'normal',
    items: [],
    state: 'normal',
    actions: [],
    stats: {
        combat: {},
        story: {},
    },
    traits: [],
    value: 0,
};
