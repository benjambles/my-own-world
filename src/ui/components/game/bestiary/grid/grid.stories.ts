import { partial } from 'ramda';
import { storyRenderer } from '../../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../../utils/templates/client-context';
import { actionGrid } from './grid';
import './grid.css';

export default {
    title: 'Game/Bestiary/NPC Card/Action Grid',
    parameters: {
        componentSubtitle: 'Used for displaying the actions an NPC can take',
    },
    decorators: [storyRenderer],
};

const render = partial(actionGrid, [CLIENT_CONTEXT]);

export const base = () => {
    return render(undefined);
};
