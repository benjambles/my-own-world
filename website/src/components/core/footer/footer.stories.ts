import '../../../static/styles/base.css';
import '../../../static/styles/components/footer.css';
import { CLIENT_CONTEXT } from '../../../utils/client-context';
import { storyRenderer } from '../../../utils/story-renderer';
import { Footer } from './footer';

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

export const footer = () => {
    return Footer(CLIENT_CONTEXT, { links });
};
