import { storyRenderer } from '../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { npcCard } from './npc-card';
import './npc-card.css';
import npcData from './__tests__/npc-card.fixture';

export default {
    title: 'Bestiary/NPC Card',
    parameters: {
        component: npcCard,
        componentSubtitle: 'Displays the stats needed for a party to control an NPC',
    },
    decorators: [storyRenderer],
};

export function veteran() {
    return npcCard(CLIENT_CONTEXT, npcData);
}
