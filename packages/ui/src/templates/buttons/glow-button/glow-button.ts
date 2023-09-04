import { html } from 'lit';
import styles from './glow-button.css.js';

interface Data {
    text: string;
}

/**
 *
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
export function glowButton(data: Data) {
    return html`
        <button class="${styles.buttonWrapper}">
            <span class="${styles.glowButton}">
                <span>${data.text}</span>
            </span>
        </button>
    `;
}
