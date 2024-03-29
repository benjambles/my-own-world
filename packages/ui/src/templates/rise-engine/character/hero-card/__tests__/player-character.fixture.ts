import { HeroData } from '@benjambles/rise-engine/dist/types/game/hero.js';

const mockHero: HeroData = {
    name: 'Eva Lumier',
    tier: 1,
    class: {
        name: 'Ardent',
        id: 'ardent',
        actions: [
            {
                id: 'spark',
                name: 'Spark',
                types: ['amplify', 'exploit'],
                action_type: 'trait',
                target: {
                    number: 1,
                    type: ['spell'],
                },
                range: 0,
                effect: {
                    text: 'Amp. Effect: When you Hit a Foe with a Spell, +[Tier+2] Damage.',
                },
                speed: 'free',
            },
            {
                id: 'ground-zero',
                name: 'Ground Zero',
                types: ['general', 'exploit'],
                action_type: 'trait',
                target: {
                    number: 0,
                    type: ['self'],
                },
                range: 0,
                effect: {
                    text: '-2 Range on your next Spell (Min 1). All Foes Hit by your next Spell suffer 1 Stack of BURNING. 1 per Round.',
                },
                speed: 'fast',
            },
            {
                id: 'soul-strike',
                name: 'Soul Strike',
                types: ['general', 'spell'],
                action_type: 'action',
                target: {
                    number: 1,
                    type: ['foe'],
                },
                range: 7,
                effect: { text: '[Tier+1]d12 Damage vs. Resistance.' },
                speed: 'slow',
            },
            {
                id: 'mana-echos',
                name: 'Mana Echoes',
                types: ['general', 'spell'],
                action_type: 'action',
                target: {
                    number: 1,
                    type: ['foe'],
                },
                range: 7,
                effect: {
                    text: 'AUTO-HIT (Skip CAP). [Tier]d8 Damage vs. Resistance.',
                },
                speed: 'fast',
            },
            {
                id: 'raging-inferno',
                name: 'Raging Inferno',
                types: ['general', 'spell'],
                action_type: 'action',
                target: {
                    number: 3,
                    type: ['foe'],
                },
                range: 3,
                effect: { text: '[Tier+1]d8 Damage vs. Resistance.' },
                speed: 'slow',
            },
            {
                id: 'hearts-glow',
                name: 'Hearth’s Glow',
                types: ['amplify', 'spell'],
                action_type: 'action',
                target: {
                    number: 1,
                    type: ['spell'],
                },
                range: 0,
                effect: {
                    text: 'Amp. Effect: When you Hit a Foe with a Spell, 1 Hero heals [Tier+3] HP.',
                },
                speed: 'fast',
            },
        ],
        tide_turners: [
            {
                id: 'composite-magic',
                name: 'Composite Magic',
                action_type: 'tide_turner',
                types: ['general', 'exploit'],
                target: {
                    number: 0,
                    type: ['self'],
                },
                range: 0,
                effect: {
                    text: 'Your next 2 Spells are Free Actions.',
                },
                speed: 'slow',
            },
            {
                id: 'shatterstorm',
                name: 'Shatterstorm',
                action_type: 'tide_turner',
                types: ['general', 'exploit'],
                target: {
                    number: 3,
                    type: ['foes'],
                },
                range: 3,
                effect: {
                    text: '[Tier]d12 PIERCING Damage and Target Foes suffer 5 Stacks of VULNERABLITY.',
                },
                speed: 'slow',
            },
        ],
    },
    profession: {
        name: 'Mystic',
        id: 'mystic',
        aspects: {
            offensive: {
                tier1: {
                    name: 'Precise',
                    id: 'precise',
                    offsets: {
                        accuracy: 2,
                    },
                },
            },
            defensive: {
                tier1: {
                    name: 'Willful',
                    id: 'willful',
                    offsets: {
                        hp: 3,
                        toughness: 1,
                        willpower: 2,
                    },
                },
            },
            utility: {
                tier1: {
                    name: 'Precise',
                    id: 'precise',
                    offsets: {
                        actions: {
                            amplify: 1,
                        },
                    },
                },
            },
        },
    },
    actionPoints: {
        current: 4,
        max: 4,
    },
    stats: {
        base: {
            hp: 20,
            defense: 4,
            barrier: 4,
            skill: 8,
            limits: {
                amplify: 1,
                sustain: 1,
                trigger: 1,
            },
            actions: {
                tide_turner_charges: 2,
                move: { min: 1, max: 1 },
                shift: { min: 1, max: 1 },
            },
            critical: 2,
            accuracy: 10,
            penetration: 5,
            toughness: 4,
            resistance: 4,
            willpower: 4,
            dodge: 4,
        },
        resolved: {
            hp: 20,
            defense: 4,
            barrier: 4,
            skill: 8,
            limits: {
                amplify: 1,
                sustain: 1,
                trigger: 1,
            },
            actions: {
                tide_turner_charges: 2,
                move: { min: 1, max: 1 },
                shift: { min: 1, max: 1 },
            },
            critical: 2,
            accuracy: 10,
            penetration: 5,
            toughness: 4,
            resistance: 4,
            willpower: 4,
            dodge: 4,
        },
        current: {
            hp: 20,
            defense: 4,
            barrier: 4,
            skill: 8,
            limits: {
                amplify: 1,
                sustain: 1,
                trigger: 1,
            },
            actions: {
                tide_turner_charges: 2,
                move: { min: 1, max: 1 },
                shift: { min: 1, max: 1 },
            },
            critical: 2,
            accuracy: 10,
            penetration: 5,
            toughness: 4,
            resistance: 4,
            willpower: 4,
            dodge: 4,
        },
    },
    skills: {
        major: {
            name: 'Insight',
            id: 'insight',
            bonus: 8,
        },
        minor: [
            { name: 'Focus', id: 'focus', bonus: 4 },
            { name: 'Mend', id: 'mend', bonus: 4 },
            { name: 'Endurance', id: 'endurance', bonus: 4 },
        ],
        maneuver: {
            name: 'Analyze',
            id: 'analyze',
            text: 'Make a Skill Check. If you succeed, +3 P to your next Action. 1 Stack.',
            speed: 'fast',
        },
    },
    equipment: {
        melee: {
            type: 'melee',
            name: 'Scepter',
            id: 'scepter',
            hands: 1,
            range: 1,
            damage: {
                attack_dice: {
                    sides: 4,
                    bonus_dice: 1,
                },
                type: 'toughness',
            },
            offsets: {
                accuracy: 1,
            },
            additional_effect: 'Your first Spell each Encounter is a Fast Action.',
        },
        offhand: {
            name: 'Focus Item',
            id: 'focus_item',
            offsets: {
                resistance: 2,
            },
            additional_effect: '',
        },
        ranged: {
            type: 'ranged',
            range: 6,
            name: 'Wand',
            id: 'wand',
            damage: {
                attack_dice: {
                    sides: 6,
                    bonus_dice: 0,
                },
                type: 'resistance',
            },
            offsets: {
                critical: 1,
            },
            additional_effect: '',
        },
        armour: {
            name: 'Robes',
            id: 'robes',
            offsets: {
                resistance: 1,
            },
        },
        keepsakes: [
            {
                name: 'Emberwind Spark',
                type: 'keepsake',
                useable_in: [
                    'combat',
                    'crossroad',
                    'custom',
                    'role-playing',
                    'encounter',
                ],
                effect: {
                    text: 'Alter 1 Roll result by +/-4',
                },
                speed: 'free',
                availability: {
                    charges: 1,
                    period: 'milestone',
                    used: 0,
                },
                locked: true,
            },
            {
                name: 'Life Binder',
                type: 'keepsake',
                useable_in: [
                    'combat',
                    'crossroad',
                    'custom',
                    'role-playing',
                    'encounter',
                ],
                effect: {
                    text: 'When reduced to 0 HP for the first time, retain 1 HP instead and gain +10 to Barrier Scores until the start of your next Turn.',
                },
                speed: 'free',
                availability: {
                    charges: 1,
                    period: 'milestone',
                    used: 0,
                },
                locked: false,
            },
        ],
        items: [],
    },

    anchors: [
        {
            type: 'person',
            id: 'cap_guard',
            name: 'Captain of the guard',
        },
        {
            type: 'person',
            id: 'family_machia',
            name: 'The Machia family',
        },
        {
            type: 'person',
            id: 'order_adriel',
            name: 'The Military Order of Adriel',
        },
        {
            type: 'topic of interest',
            id: 'regional_herbs',
            name: 'Regional herbs',
        },
        {
            type: 'topic of interest',
            id: 'castle_architecture',
            name: 'Castle architecture',
        },
        {
            type: 'topic of interest',
            id: 'realm_history',
            name: 'History of the realm',
        },
    ],
};

export default mockHero;
