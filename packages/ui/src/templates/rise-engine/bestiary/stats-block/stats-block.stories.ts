import { storyRenderer } from '../../../../utils/storybook/story-renderer.js';
import npcData from '../__tests__/npc-card.fixture.js';
import './stats-block.css';
import { statsBlock } from './stats-block.js';

export default {
    title: 'Game/Bestiary/NPC Card/Stats Block',
    parameters: {
        component: statsBlock,
        componentSubtitle: 'Displays the stats block for an NPC',
    },
    decorators: [storyRenderer],
};

export const base = () => {
    return statsBlock({
        name: npcData.name,
        variant: npcData.variant,
        stats: npcData.stats,
    });
};
