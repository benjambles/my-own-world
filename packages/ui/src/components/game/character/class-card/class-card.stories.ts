import { storyRenderer } from '../../../../utils/storybook/story-renderer.js';
import './class-card.css';
import { classCard } from './class-card.js';
import { ardent } from './__tests__/character-classes.fixture.js';

export default {
    title: 'Game/Character Creator/Class Card',
    parameters: {
        component: classCard,
        componentSubtitle: 'Class introduction card for the character creation wizard',
    },
    decorators: [storyRenderer],
};

export const base = () => {
    return classCard({ view: 'large', classDetails: ardent });
};
