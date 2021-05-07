import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { getClientComponent, linkStoryRenderer } from '../../../utils/storybook/story-renderer.js';
import { darkLink } from './dark-link.js';

export default {
    title: 'Atoms/Links/Dark',
    decorators: [withKnobs, linkStoryRenderer],
    parameters: {
        componentSubtitle: 'A wrapper around the standard anchor tag for dark backgrounds',
        docs: {
            iframeHeight: '100px',
        },
        backgrounds: { default: 'dark' },
    },
};

const render = getClientComponent(darkLink);

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

export const playground = () => {
    return render({
        text: text('text', 'Click here', 'Attributes'),
        href: text('href', '/', 'Attributes'),
        display: {
            active: boolean('display.active', false, 'Display Props'),
            bold: boolean('display.bold', false, 'Display Props'),
            underlined: boolean('display.underlined', false, 'Display Props'),
        },
    });
};
