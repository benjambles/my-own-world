import { withKnobs } from '@storybook/addon-knobs';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer';
import { BarLink } from './bar-link';

export default {
    title: 'Atoms/Links/Bar',
    decorators: [withKnobs, linkStoryRenderer],
    parameters: {
        componentSubtitle: 'A wrapper around the standard anchor tag for menus',
        docs: {
            iframeHeight: '100px',
        },
    },
};

export function linkBar() {
    return BarLink(CLIENT_CONTEXT, { text: 'Bar Link', href: '/' });
}

export function activeLinkBar() {
    return BarLink(CLIENT_CONTEXT, {
        text: 'Active Link Bar',
        href: '/',
        active: true,
    });
}
