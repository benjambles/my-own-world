import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { storyRenderer } from '../../utils/storybook/story-renderer.js';
import './skip-links.js';

export default {
    title: 'Components/Skiplinks',
    parameters: {
        componentSubtitle: 'Skiplinks',
    },
    decorators: [storyRenderer],
} as Meta;

export const base = () => {
    return html`
        <p>Click here and then keep pressing tab</p>
        <skip-links>
            <a href="#content">Go to Content</a>
            <a href="#footer">Go to Footer</a>
        </skip-links>
    `;
};
base.storyName = 'default';
