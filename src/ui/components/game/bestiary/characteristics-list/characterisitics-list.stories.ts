import { getClientComponent, storyRenderer } from '../../../../utils/storybook/story-renderer.js';
import npcCardData from '../__tests__/npc-card.fixture.js';
import { characteristicsList } from './characteristics-list.js';
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
