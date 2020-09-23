import { withKnobs } from '@storybook/addon-knobs';
import { CLIENT_CONTEXT } from '../../../utils/templates/client-context';
import { linkStoryRenderer } from '../../../utils/storybook/story-renderer';
import { barLink } from './bar-link';
import { partial } from 'ramda';

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

const render = partial(barLink, [CLIENT_CONTEXT]);

export const linkBar = () => render({ text: 'Bar Link', href: '/' });

export const activeLinkBar = () => {
    return render({
        text: 'Active Link Bar',
        href: '/',
        active: true,
    });
};
