import { getClientComponent, storyRenderer } from '../../../../utils/storybook/story-renderer';
import npcCardData from '../__tests__/npc-card.fixture';
import { characteristicsList } from './characteristics-list';
import './characteristics-list.css';

export default {
    title: 'Game/Bestiary/NPC Card/Characteristics',
    parameters: {
        componentSubtitle: 'Used for displaying the rules for the NPC',
    },
    decorators: [storyRenderer],
};

const render = getClientComponent(characteristicsList);

export const withOptional = () => render(npcCardData.characteristics);

export const defaultOnly = () => {
    return render({
        base: npcCardData.characteristics.base,
    });
};
