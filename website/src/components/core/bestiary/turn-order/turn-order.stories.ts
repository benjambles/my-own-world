import { storyRenderer } from '../../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../../utils/templates/client-context';
import { turnOrder } from './turn-order';
import npcData from '../__tests__/npc-card.fixture';
import '../npc-card.css';

export default {
    title: 'Bestiary/NPC Card/Turn Order',
    parameters: {
        component: turnOrder,
        componentSubtitle: 'Specifies the steps an AI controlled NPC must take each turn',
    },
    decorators: [storyRenderer],
};

export function base() {
    return turnOrder(CLIENT_CONTEXT, npcData.turn_order);
}
