import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { storyRenderer } from '../../../utils/storybook/story-renderer.js';
import './unit-card.js';

export default {
    title: 'Components/Game/Unit Card',
    parameters: {
        componentSubtitle: '',
    },
    decorators: [storyRenderer],
} as Meta;

export const unitCard = () => html` <unit-card> </unit-card> `;
