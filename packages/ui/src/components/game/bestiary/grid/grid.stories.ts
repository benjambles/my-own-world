import { storyRenderer } from '../../../../utils/storybook/story-renderer.js';
import './grid.css';
import { actionGrid } from './grid.js';

export default {
    title: 'Game/Bestiary/NPC Card/Action Grid',
    parameters: {
        componentSubtitle: 'Used for displaying the actions an NPC can take',
    },
    decorators: [storyRenderer],
};

export const base = () => {
    return actionGrid();
};
