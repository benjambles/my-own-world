import { storyRenderer } from '../../../utils/storybook/story-renderer';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { footer } from './footer';
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

export const base = () => {
    return footer(CLIENT_CONTEXT, { links });
};
base.story = {
    name: 'default',
};
