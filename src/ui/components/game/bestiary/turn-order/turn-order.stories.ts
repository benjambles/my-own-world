import { getClientComponent, storyRenderer } from '../../../../utils/storybook/story-renderer.js';
import npcData from '../__tests__/npc-card.fixture.js';
import { turnOrder } from './turn-order.js';
import './turn-order.css';

export default {
    title: 'Game/Bestiary/NPC Card/Turn Order',
    parameters: {
        component: turnOrder,
        componentSubtitle: 'Specifies the steps an AI controlled NPC must take each turn',
    },
    decorators: [storyRenderer],
};

const render = getClientComponent(turnOrder);

export const base = () => render(npcData.turn_order);
