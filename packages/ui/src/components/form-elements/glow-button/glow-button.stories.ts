import { html } from 'lit';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import { GlowButton } from './glow-button.js';

export default {
    title: 'Atoms/Forms/Glow Button',
    parameters: {
        component: GlowButton,
        componentSubtitle: 'Glowy button',
        backgrounds: { default: 'dark' },
    },
    decorators: [linkStoryRenderer],
};

export const base = () => html`<glow-button>Test Button</glow-button>`;

export const large = () => html`<glow-button class="large">Test Button</glow-button>`;
