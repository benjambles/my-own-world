import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { storyRenderer } from '../../utils/storybook/story-renderer.js';
import './site-footer.js';

export default {
    title: 'Furniture/Footer',
    parameters: {
        componentSubtitle: 'Displays the footer links and copyright information',
    },
    decorators: [storyRenderer],
} as Meta;

const links = [
    { text: 'Terms', href: '/terms' },
    { text: 'Privacy', href: '/privacy' },
    { text: 'Accessibility', href: '/accessibility' },
];

export const base = () => html`
    <site-footer>
        <span slot="site-name">Kh&ocirc;ra</span>
        ${links.map(
            ({ text, href }) => html`<a href="${href}" role="listitem">${text}</a>`,
        )}
    </site-footer>
`;
base.storyName = 'default';
