import { getClientComponent, storyRenderer } from '../../../../utils/storybook/story-renderer';
import { heroCard } from './hero-card';
import './hero-card.css';
import fixture from './__tests__/player-character.fixture';

export default {
    title: 'Game/Hero Card',
    parameters: {
        component: heroCard,
        componentSubtitle: 'Hero cards are a store for the details for a PC',
    },
    decorators: [storyRenderer],
};

const render = getClientComponent(heroCard);

export const full = () => render(fixture);
