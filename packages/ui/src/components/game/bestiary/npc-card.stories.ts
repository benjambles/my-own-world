import { storyRenderer } from '../../../utils/storybook/story-renderer.js';
import './npc-card.css';
import { npcCard } from './npc-card.js';
import npcData from './__tests__/npc-card.fixture';

export default {
    title: 'Game/Bestiary/NPC Card',
    parameters: {
        component: npcCard,
        componentSubtitle: 'Displays the stats needed for a party to control an NPC',
    },
    decorators: [storyRenderer],
};

export const veteran = () => npcCard(npcData);
