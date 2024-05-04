import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { storyRenderer } from '../../utils/storybook/story-renderer.js';
import './filter-bar.js';

export default {
    title: 'Components/Filter Bar',
    parameters: {
        componentSubtitle: 'Displays a filter bar component',
    },
    decorators: [storyRenderer],
} as Meta;

export const Base = () => {
    return html`
        <filter-bar>
            <filter-item href="?type=all" filter="all">All</filter-item>
            <filter-item href="?type=campaign" filter="campaign">Campaign</filter-item>
            <filter-item href="?type=skirmish" filter="skirmish">Skirmish</filter-item>
        </filter-bar>
    `;
};
Base.storyName = 'default';

export const Selected = () => {
    return html`
        <filter-bar>
            <filter-item href="?type=all" filter="all">All</filter-item>
            <filter-item class="selected" href="?type=campaign" filter="campaign"
                >Campaign</filter-item
            >
            <filter-item href="?type=skirmish" filter="skirmish">Skirmish</filter-item>
        </filter-bar>
    `;
};
