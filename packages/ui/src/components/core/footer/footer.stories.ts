import { getClientComponent, storyRenderer } from '../../../utils/storybook/story-renderer.js';
import { footer } from './footer.js';
import './footer.css';

export default {
    title: 'Furniture/Footer',
    parameters: {
        componentSubtitle: 'Displays the footer links and copyright information',
    },
    decorators: [storyRenderer],
};

const links = [
    { text: 'Terms', href: '/terms' },
    { text: 'Privacy', href: '/privacy' },
    { text: 'Accessibility', href: '/accessibility' },
];

const render = getClientComponent(footer);

export const base = () => render({ links });
base.storyName = 'default';
