import { partial } from 'ramda';
import { storyRenderer } from '../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { npcCard } from './npc-card';
import './npc-card.css';
import npcData from './__tests__/npc-card.fixture';

export default {
    title: 'Game/Bestiary/NPC Card',
    parameters: {
        component: npcCard,
        componentSubtitle: 'Displays the stats needed for a party to control an NPC',
    },
    decorators: [storyRenderer],
};

const render = partial(npcCard, [CLIENT_CONTEXT]);

export const veteran = () => render(npcData);
