import { linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import { darkLink } from './dark-link.js';

export default {
    title: 'Atoms/Links/Dark',
    decorators: [linkStoryRenderer],
    parameters: {
        componentSubtitle: 'A wrapper around the standard anchor tag for dark backgrounds',
        docs: {
            iframeHeight: '100px',
        },
        backgrounds: { default: 'dark' },
    },
};

export const standard = () => darkLink({ text: 'Link', href: '/' });

export const active = () => {
    return darkLink({
        text: 'Active Link',
        href: '/',
        display: { active: true },
    });
};

export const underlined = () => {
    return darkLink({
        text: 'Underlined Link',
        href: '/',
        display: { underlined: true },
    });
};

export const bold = () => {
    return darkLink({
        text: 'Bold Link',
        href: '/',
        display: { bold: true },
    });
};
