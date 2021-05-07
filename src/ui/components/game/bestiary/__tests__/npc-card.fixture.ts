import { NPCCard } from '../../../../../game-lib/types/game/npc.js';

const cardData: NPCCard = {
    name: 'Chaser DoorCrasher',
    variant: 'veteran',
    stats: {
        hp: {
            max: 250,
            current: 250,
            temporary: 0,
        },
        toughness: 20,
        resistance: 20,
        rank: 'Elite',
        type: 'Human',
        flow: 4,
        size: '1x1',
    },
    turn_order: [
        'Read the Default Characteristics. You may also use the Optional Modifiers if you wish.',
        'Roll 1d6.',
        'Perform the Action in the central Action Hex, followed by each Action in every subsequent Action Hex.',
    ],
    characteristics: {
        base: {
            title: 'Default characteristics',
            details: {
                unpredictable:
                    'Assign a number to each non-FALLEN Hero on 1d4. Roll 1d4 at the start of Chaser Doorcrasher’s Turn. Chaser Doorcrasher Moves toward and Attacks that Hero this Turn. Reroll if roll result is unassigned to a Hero.',
                overstrung: 'Loses 10 HP at the start of each of its Turns.',
                juggernaut:
                    'Negate the first 30 Damage (before  /  ) Chaser Doorcrasher takes each Round.',
            },
        },
        optional: {
            title: 'Optional modifiers',
            details: {
                'manic movement': '2 Free Shifts at any point during Chaser Doorcrasher’s Turn.',
            },
        },
    },
    actions: {
        limit: 4,
        basic: {
            attack: {
                name: 'Chop VS',
                type: 'Melee',
                range: 1,
                effect: 'Deal 2d10 + 15 VS  .',
            },
        },
        special: {
            a: {
                name: 'Whirling Axe VS ',
                type: 'A',
                range: 1,
                effect:
                    'Deal 1d10 + 10 Damage VS . Hero cannot take Move Actions until the end of next Turn.',
            },
            b: {
                name: 'Meat Cleaver VS',
                type: 'B',
                range: 1,
                effect: 'Deal 2d10 + 10 Damage VS  FRAGILITY VS  .',
            },
            c: {
                name: 'Huff Pixie',
                type: 'C',
                effect:
                    '+10   until start of next Turn and remove 1 Sustained Effect from Doorcrasher. Lose 10 HP.',
            },
            d: {
                name: 'Defend and Recover',
                type: 'D',
                effect: '+10  until start of next Turn. Heals 30 HP.',
            },
        },
        learnable: {
            e: {
                name: 'Bowling Bash',
                autoHit: true,
                type: 'E',
                range: 1,
                effect:
                    'Deal 2d10 + 10 Damage VS  and Hero is pushed directly away 5 Squares (if possible). All other Heroes adjacent to pushed Target during or when the Forced Movement ends take 5 PIERCING Damage.',
            },
            f: {
                name: 'Savage Slash VS [Acrobatics OR Endurance]',
                type: 'F',
                range: 1,
                effect:
                    'Trig. Cond: If an adjacent Hero uses a Basic Attack or Exploit, Trig. Effect: Doorcrasher makes a Basic Attack before that Hero’s Action is completed. If the Attack hits, deal Basic Attack Damage and Cancel that Hero’s Action.',
            },
        },
    },
};

export default cardData;
