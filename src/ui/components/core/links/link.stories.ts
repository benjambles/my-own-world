import { getClientComponent, linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import { link } from './link.js';

export default {
    title: 'Atoms/Links/Light',
    decorators: [linkStoryRenderer],
    parameters: {
        componentSubtitle: 'A wrapper around the standard anchor tag for light backgrounds',
        docs: {
            iframeHeight: '100px',
        },
    },
};

const render = getClientComponent(link);

export const standard = () => render({ text: 'Link', href: '/' });

export const active = () => {
    return render({
        text: 'Active Link',
        href: '/',
        display: { active: true },
    });
};

export const underlined = () => {
    return render({
        text: 'Underlined Link',
        href: '/',
        display: { underlined: true },
    });
};

export const bold = () => {
    return render({
        text: 'Bold Link',
        href: '/',
        display: { bold: true },
    });
};
