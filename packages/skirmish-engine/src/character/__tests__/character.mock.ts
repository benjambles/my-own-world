import { Character } from '../character.js';

export const mockCharacter: Character = {
    givenName: 'Eva Lumier',
    items: {},
    factions: ['Player', 'Nomads'],
    relationships: {
        'faction:Player': 10,
        'faction:Nomads': 1,
        'individual:Bob Ross': 5,
        'species:Charr': -2,
    },
    classification: 'Human',
    traits: ['organic', 'cyborg', 'sentient'],
    stats: {
        combat: {
            actions: [4, 1],
            strength: [7, 7],
            toughness: [9, 9],
            willpower: [9, 3],
        },
        story: {
            charisma: 5,
            intuition: 4,
            perception: 3,
        },
    },
    actions: {},
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
    level: 3,
    experience: 3,
    stance: 'normal',
};
