import { linkStoryRenderer } from '../../utils/storybook/story-renderer.js';
import { link } from './link.js';

export default {
    title: 'Atoms/Links/Light',
    decorators: [linkStoryRenderer],
    parameters: {
        componentSubtitle:
            'A wrapper around the standard anchor tag for light backgrounds',
        docs: {
            iframeHeight: '100px',
        },
    },
};

export const standard = () => link({ text: 'Link', href: '/' });

export const active = () => {
    return link({
        text: 'Active Link',
        href: '/',
        display: { active: true },
    });
};

export const underlined = () => {
    return link({
        text: 'Underlined Link',
        href: '/',
        display: { underlined: true },
    });
};

export const bold = () => {
    return link({
        text: 'Bold Link',
        href: '/',
        display: { bold: true },
    });
};
