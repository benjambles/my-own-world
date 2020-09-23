import { partial } from 'ramda';
import { storyRenderer } from '../../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../../utils/templates/client-context';
import npcData from '../__tests__/npc-card.fixture';
import { turnOrder } from './turn-order';
import './turn-order.css';

export default {
    title: 'Game/Bestiary/NPC Card/Turn Order',
    parameters: {
        component: turnOrder,
        componentSubtitle: 'Specifies the steps an AI controlled NPC must take each turn',
    },
    decorators: [storyRenderer],
};

const render = partial(turnOrder, [CLIENT_CONTEXT]);

export const base = () => render(npcData.turn_order);
