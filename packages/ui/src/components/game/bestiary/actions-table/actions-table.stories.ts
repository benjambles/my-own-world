import { storyRenderer } from '../../../../utils/storybook/story-renderer.js';
import npcCardData from '../__tests__/npc-card.fixture';
import './actions-table.css';
import { actionsTable } from './actions-table.js';

export default {
    title: 'Game/Bestiary/NPC Card/Actions',
    parameters: {
        component: actionsTable,
        componentSubtitle: 'Used for displaying the actions that the NPC may take',
    },
    decorators: [storyRenderer],
};

export const complete = () => actionsTable(npcCardData.actions);

export const basicOnly = () => {
    return actionsTable({
        limit: npcCardData.actions.limit,
        basic: npcCardData.actions.basic,
    });
};

export const withSpecial = () => {
    return actionsTable({
        limit: npcCardData.actions.limit,
        basic: npcCardData.actions.basic,
        special: npcCardData.actions.special,
    });
};

export const withLearnable = () => {
    return actionsTable({
        limit: npcCardData.actions.limit,
        basic: npcCardData.actions.basic,
        learnable: npcCardData.actions.learnable,
    });
};
