import { getClientComponent, storyRenderer } from '../../../../utils/storybook/story-renderer';
import npcCardData from '../__tests__/npc-card.fixture';
import { actionsTable } from './actions-table';
import './actions-table.css';

export default {
    title: 'Game/Bestiary/NPC Card/Actions',
    parameters: {
        component: actionsTable,
        componentSubtitle: 'Used for displaying the actions that the NPC may take',
    },
    decorators: [storyRenderer],
};

const render = getClientComponent(actionsTable);

export const complete = () => render(npcCardData.actions);

export const basicOnly = () => {
    return render({
        limit: npcCardData.actions.limit,
        basic: npcCardData.actions.basic,
    });
};

export const withSpecial = () => {
    return render({
        limit: npcCardData.actions.limit,
        basic: npcCardData.actions.basic,
        special: npcCardData.actions.special,
    });
};

export const withLearnable = () => {
    return render({
        limit: npcCardData.actions.limit,
        basic: npcCardData.actions.basic,
        learnable: npcCardData.actions.learnable,
    });
};
