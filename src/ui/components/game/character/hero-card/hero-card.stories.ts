import { storyRenderer } from '../../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../../utils/templates/client-context';
import { heroCard } from './hero-card';
import fixture from './__tests__/player-character.fixture';
import './hero-card.css';
import { partial } from 'ramda';

export default {
    title: 'Game/Hero Card',
    parameters: {
        component: heroCard,
        componentSubtitle: 'Hero cards are a store for the details for a PC',
    },
    decorators: [storyRenderer],
};

const render = partial(heroCard, [CLIENT_CONTEXT]);

export const full = () => render(fixture);
