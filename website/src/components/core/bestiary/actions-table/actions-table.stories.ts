import '../../../../static/styles/base.css';
import { storyRenderer } from '../../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../../utils/templates/client-context';
import { actionsTable } from './actions-table';
import npcCardData from '../__tests__/npc-card.fixture';
import '../npc-card.css';

export default {
    title: 'Bestiary/NPC Card/Actions',
    parameters: {
        component: actionsTable,
        componentSubtitle: 'Used for displaying the actions that the NPC may take',
    },
    decorators: [storyRenderer],
};

export function complete() {
    return actionsTable(CLIENT_CONTEXT, npcCardData.actions);
}

export function basicOnly() {
    return actionsTable(CLIENT_CONTEXT, {
        limit: npcCardData.actions.limit,
        basic: npcCardData.actions.basic,
    });
}

export function withSpecial() {
    return actionsTable(CLIENT_CONTEXT, {
        limit: npcCardData.actions.limit,
        basic: npcCardData.actions.basic,
        special: npcCardData.actions.special,
    });
}

export function withLearnable() {
    return actionsTable(CLIENT_CONTEXT, {
        limit: npcCardData.actions.limit,
        basic: npcCardData.actions.basic,
        learnable: npcCardData.actions.learnable,
    });
}
