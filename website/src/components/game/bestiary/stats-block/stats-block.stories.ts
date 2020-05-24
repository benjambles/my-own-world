import { storyRenderer } from '../../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../../utils/templates/client-context';
import npcData from '../__tests__/npc-card.fixture';
import { statsBlock } from './stats-block';
import './stats-block.css';

export default {
    title: 'Game/Bestiary/NPC Card/Stats Block',
    parameters: {
        component: statsBlock,
        componentSubtitle: 'Displays the stats block for an NPC',
    },
    decorators: [storyRenderer],
};

export const base = () => {
    return statsBlock(CLIENT_CONTEXT, {
        name: npcData.name,
        variant: npcData.variant,
        stats: npcData.stats,
    });
};
