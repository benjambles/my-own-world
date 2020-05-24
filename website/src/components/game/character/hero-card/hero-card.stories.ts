import { storyRenderer } from '../../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../../utils/templates/client-context';
import { heroCard } from './hero-card';
import fixture from './__tests__/player-character.fixture';
import './hero-card.css';

export default {
    title: 'Game/Hero Card',
    parameters: {
        component: heroCard,
        componentSubtitle: 'Hero cards are a store for the details for a PC',
    },
    decorators: [storyRenderer],
};

export const full = () => {
    return heroCard(CLIENT_CONTEXT, fixture);
};
