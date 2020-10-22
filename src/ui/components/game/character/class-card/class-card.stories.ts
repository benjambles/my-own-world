import { getClientComponent, storyRenderer } from '../../../../utils/storybook/story-renderer';
import { classCard } from './class-card';
import './class-card.css';

const render = getClientComponent(classCard);

export default {
    title: 'Game/Character Creator/Class Card',
    parameters: {
        component: classCard,
        componentSubtitle: 'Class introduction card for the character creation wizard',
    },
    decorators: [storyRenderer],
};

export const base = () => {
    return render({
        name: 'Ardent',
        quote: 'We are fire, or we are fuel.',
        description:
            'The Ardent weaves arcane power into complex chains of magic that can lay waste to an entire battlefield or strike down single targets with merciless efficiency. As mercurial and dangerous as the untameable magical forces she parleys with, the Ardent is driven by a burning obsession with power that makes her a fearsome ally, and an even more terrifying enemy.',
        assets: {
            thumbPortrait: '',
            classLogo: '',
        },
        colorTheme: {
            mainColor: '#f60',
            textColor: '#fff',
        },
        classFeatures: [
            {
                icon: '',
                theme: 'Needling Magic',
                flavour:
                    'Forge wild flames of arcane energy into a precise assault that will burn through any enemy’s defense.',
            },
            {
                icon: '',
                theme: 'Destruction Magic',
                flavour:
                    'Weave and detonate complex spells that unleash a blast of searing annihilation on the battlefield.',
            },
            {
                icon: '',
                theme: 'Manipulation Magic',
                flavour:
                    'Craft illusions and warp reality—and even time itself—with the shimmering heat of your inner fire.',
            },
        ],
    });
};
