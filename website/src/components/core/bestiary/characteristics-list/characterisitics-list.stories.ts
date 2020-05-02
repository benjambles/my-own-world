import '../../../../static/styles/base.css';
import { storyRenderer } from '../../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../../utils/templates/client-context';
import { characteristicsList } from './characteristics-list';
import npcCardData from '../__tests__/npc-card.fixture';
import '../npc-card.css';

export default {
    title: 'Bestiary/NPC Card/Characteristics',
    parameters: {
        componentSubtitle: 'Used for displaying the rules for the NPC',
    },
    decorators: [storyRenderer],
};

export function withOptional() {
    return characteristicsList(CLIENT_CONTEXT, npcCardData.characteristics);
}

export function defaultOnly() {
    return characteristicsList(CLIENT_CONTEXT, { base: npcCardData.characteristics.base });
}
