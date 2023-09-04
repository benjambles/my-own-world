import { linkStoryRenderer } from '../../utils/storybook/story-renderer.js';
import { barLink } from './bar-link.js';

export default {
    title: 'Atoms/Links/Bar',
    decorators: [linkStoryRenderer],
    parameters: {
        componentSubtitle: 'A wrapper around the standard anchor tag for menus',
        docs: {
            iframeHeight: '100px',
        },
    },
};

export const linkBar = () => barLink({ text: 'Bar Link', href: '/' });

export const activeLinkBar = () => {
    return barLink({
        text: 'Active Link Bar',
        href: '/',
        active: true,
    });
};
