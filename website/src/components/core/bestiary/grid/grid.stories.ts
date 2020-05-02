import '../../../../static/styles/base.css';
import '../../../../static/styles/components/bestiary/grid.css';
import { storyRenderer } from '../../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../../utils/templates/client-context';
import { actionGrid } from './grid';

export default {
    title: 'Bestiary/NPC Card/Action Grid',
    parameters: {
        componentSubtitle: 'Used for displaying the actions an NPC can take',
    },
    decorators: [storyRenderer],
};

export function base() {
    return actionGrid(CLIENT_CONTEXT);
}
