import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { storyRenderer } from '../../utils/storybook/story-renderer.js';
import './mow-pagination.js';

export default {
    title: 'Components/Pagination',
    parameters: {
        componentSubtitle: 'Pagination',
    },
    decorators: [storyRenderer],
} as Meta;

export const Base = () => {
    return html`<mow-pagination itemCount="180"></mow-pagination>`;
};
Base.storyName = 'default';

export const OnePage = () => {
    return html`<mow-pagination itemCount="10"></mow-pagination>`;
};

export const FullDisplay = () => {
    return html`<mow-pagination itemCount="180"></mow-pagination>`;
};

export const OffsetDisplay = () => {
    return html`<mow-pagination itemCount="600"></mow-pagination>`;
};
