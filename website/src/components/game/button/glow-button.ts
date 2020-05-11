import type { LitTpl } from '../../../utils/templates/lit-tpl';
import styles from './glow-button.css.json';
import { lazyStylesheet } from '../../utils/lazy-stylesheet';

interface Data {
    text: string;
}

/**
 *
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
export const glowButton: LitTpl<Data> = (context, data: Data) => {
    const { html } = context;

    return html`
        <button class="${styles.buttonWrapper}">
            <span class="${styles.glowButton}">
                <span>${data.text}</span>
            </span>
        </button>
    `;
};
