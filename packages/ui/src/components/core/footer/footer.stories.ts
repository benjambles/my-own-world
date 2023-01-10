import { Meta } from '@storybook/web-components';
import { storyRenderer } from '../../../utils/storybook/story-renderer.js';
import './footer.css';
import { footer } from './footer.js';

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

export const base = () => footer({ links });
base.storyName = 'default';
