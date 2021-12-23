import { storyRenderer } from '../../../../utils/storybook/story-renderer.js';
import npcCardData from '../__tests__/npc-card.fixture.js';
import './characteristics-list.css';
import { characteristicsList } from './characteristics-list.js';

export default {
    title: 'Game/Bestiary/NPC Card/Characteristics',
    parameters: {
        componentSubtitle: 'Used for displaying the rules for the NPC',
    },
    decorators: [storyRenderer],
};

export const withOptional = () => characteristicsList(npcCardData.characteristics);

export const defaultOnly = () => {
    return characteristicsList({
        base: npcCardData.characteristics.base,
    });
};
