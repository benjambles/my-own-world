import { storyRenderer } from '../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { footer } from './footer';
import './footer.css';
import { partial } from 'ramda';

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

const render = partial(footer, [CLIENT_CONTEXT]);

export const base = () => render({ links });
base.storyName = 'default';
