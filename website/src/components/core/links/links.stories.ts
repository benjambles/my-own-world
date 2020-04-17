import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer';
import { Link } from './link';

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

export function standard() {
    return Link(CLIENT_CONTEXT, { text: 'Link', href: '/' });
}

export function active() {
    return Link(CLIENT_CONTEXT, { text: 'Active Link', href: '/', display: { active: true } });
}

export function underlined() {
    return Link(CLIENT_CONTEXT, {
        text: 'Underlined Link',
        href: '/',
        display: { underlined: true },
    });
}

export function bold() {
    return Link(CLIENT_CONTEXT, { text: 'Bold Link', href: '/', display: { bold: true } });
}

export function playground() {
    return Link(CLIENT_CONTEXT, {
        text: text('text', 'Click here', 'Attributes'),
        href: text('href', '/', 'Attributes'),
        display: {
            active: boolean('display.active', false, 'Display Props'),
            bold: boolean('display.bold', false, 'Display Props'),
            underlined: boolean('display.underlined', false, 'Display Props'),
        },
    });
}
playground.story = {
    decorators: [withKnobs],
};
