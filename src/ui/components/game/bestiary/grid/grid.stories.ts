import { getClientComponent, storyRenderer } from '../../../../utils/storybook/story-renderer';
import { actionGrid } from './grid';
import './grid.css';

export default {
    title: 'Game/Bestiary/NPC Card/Action Grid',
    parameters: {
        componentSubtitle: 'Used for displaying the actions an NPC can take',
    },
    decorators: [storyRenderer],
};

const render = getClientComponent(actionGrid);

export const base = () => {
    return render(undefined);
};
