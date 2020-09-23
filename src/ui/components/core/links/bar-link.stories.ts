import { withKnobs } from '@storybook/addon-knobs';
import { getClientComponent, linkStoryRenderer } from '../../../utils/storybook/story-renderer';
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

const render = getClientComponent(barLink);

export const linkBar = () => render({ text: 'Bar Link', href: '/' });

export const activeLinkBar = () => {
    return render({
        text: 'Active Link Bar',
        href: '/',
        active: true,
    });
};
