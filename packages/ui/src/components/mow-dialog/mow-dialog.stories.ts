import { Meta } from '@storybook/web-components';
import { storyRenderer } from '../../utils/storybook/story-renderer.js';
import { html } from 'lit';
import './mow-dialog.js';

export default {
    title: 'Atoms/Dialog',
    parameters: {
        componentSubtitle: 'Dialog',
    },
    decorators: [storyRenderer],
} as Meta;

export const base = () => {
    return html`
        <mow-dialog triggeropeneventname="openlogin">
            <p>Some text</p>
        </mow-dialog>
        <button
            @click=${() => {
                window.dispatchEvent(new CustomEvent('openlogin'));
            }}
        >
            Log in
        </button>
    `;
};
base.storyName = 'default';
