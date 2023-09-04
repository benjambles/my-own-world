import { linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import './glow-button.css.js';
import { glowButton } from './glow-button.js';

export default {
    title: 'Atoms/Buttons/Glow Button',
    parameters: {
        component: glowButton,
        componentSubtitle: 'Glowy button',
        backgrounds: { default: 'dark' },
    },
    decorators: [linkStoryRenderer],
};

export const base = () => glowButton({ text: 'Test Button' });
