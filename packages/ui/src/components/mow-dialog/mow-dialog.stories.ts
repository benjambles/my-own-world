import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { storyRenderer } from '../../utils/storybook/story-renderer.js';
import './mow-dialog.js';

export default {
    title: 'Atoms/Dialog',
    parameters: {
        componentSubtitle: 'Dialog',
    },
    decorators: [storyRenderer],
} as Meta;

export const base = () => {
    const openLoginTrigger = 'mow:login.open';

    return html`
        <mow-dialog triggeropeneventname=${openLoginTrigger}>
            <p>Some text</p>
        </mow-dialog>
        <button
            @click=${() => {
                window.dispatchEvent(new CustomEvent(openLoginTrigger));
            }}
        >
            Log in
        </button>
    `;
};
base.storyName = 'default';
