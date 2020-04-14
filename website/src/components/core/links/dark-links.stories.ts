import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { CLIENT_CONTEXT } from '../../../utils/client-context';
import { linkStoryRendererDark } from '../../../utils/story-renderer';
import { DarkLink } from './dark-link';

export default {
    title: 'Atoms/Links/Dark',
    decorators: [withKnobs, linkStoryRendererDark],
    parameters: {
        componentSubtitle: 'A wrapper around the standard anchor tag for dark backgrounds',
        docs: {
            iframeHeight: '100px',
        },
    },
};

export function standard() {
    return DarkLink(CLIENT_CONTEXT, { text: 'Link', href: '/' });
}

export function active() {
    return DarkLink(CLIENT_CONTEXT, { text: 'Active Link', href: '/', display: { active: true } });
}

export function underlined() {
    return DarkLink(CLIENT_CONTEXT, {
        text: 'Underlined Link',
        href: '/',
        display: { underlined: true },
    });
}

export function bold() {
    return DarkLink(CLIENT_CONTEXT, { text: 'Bold Link', href: '/', display: { bold: true } });
}

export function playground() {
    return DarkLink(CLIENT_CONTEXT, {
        text: text('text', 'Click here', 'Attributes'),
        href: text('href', '/', 'Attributes'),
        display: {
            active: boolean('display.active', false, 'Display Props'),
            bold: boolean('display.bold', false, 'Display Props'),
            underlined: boolean('display.underlined', false, 'Display Props'),
        },
    });
}
