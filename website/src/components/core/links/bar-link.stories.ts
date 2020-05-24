import { withKnobs } from '@storybook/addon-knobs';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer';
import { barLink } from './bar-link';

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

export const linkBar = () => {
    return barLink(CLIENT_CONTEXT, { text: 'Bar Link', href: '/' });
};

export const activeLinkBar = () => {
    return barLink(CLIENT_CONTEXT, {
        text: 'Active Link Bar',
        href: '/',
        active: true,
    });
};
