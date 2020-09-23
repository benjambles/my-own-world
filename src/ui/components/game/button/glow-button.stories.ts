import { partial } from 'ramda';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { glowButton } from './glow-button';
import './glow-button.css';

export default {
    title: 'Atoms/Buttons/Glow Button',
    parameters: {
        component: glowButton,
        componentSubtitle: 'Glowy button',
        backgrounds: { default: 'dark' },
    },
    decorators: [linkStoryRenderer],
};

const render = partial(glowButton, [CLIENT_CONTEXT]);

export const base = () => render({ text: 'Test Button' });
