import { storyRenderer } from '../../../../utils/storybook/story-renderer.js';
import npcData from '../__tests__/npc-card.fixture.js';
import './turn-order.css';
import { turnOrder } from './turn-order.js';

export default {
    title: 'Game/Bestiary/NPC Card/Turn Order',
    parameters: {
        component: turnOrder,
        componentSubtitle: 'Specifies the steps an AI controlled NPC must take each turn',
    },
    decorators: [storyRenderer],
};

export const base = () => turnOrder(npcData.turn_order);
