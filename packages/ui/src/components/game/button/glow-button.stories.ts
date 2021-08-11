import { getClientComponent, linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import { glowButton } from './glow-button.js';
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

const render = getClientComponent(glowButton);

export const base = () => render({ text: 'Test Button' });
