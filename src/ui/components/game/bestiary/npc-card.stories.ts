import { getClientComponent, storyRenderer } from '../../../utils/storybook/story-renderer';
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

const render = getClientComponent(npcCard);

export const veteran = () => render(npcData);
