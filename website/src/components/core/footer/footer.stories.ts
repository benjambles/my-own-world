import '../../../static/styles/base.css';
import '../../../static/styles/components/footer.css';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { storyRenderer } from '../../../utils/storybook/story-renderer';
import { footer } from './footer';

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
