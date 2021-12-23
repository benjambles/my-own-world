import { html } from 'lit';
import styles from './character-creator.css.js';

interface CharacterCreator {}

/**
 *
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
export function characterCreator(data: CharacterCreator) {
    return html`<div class=${styles.characterCreator}>${data}</div>`;
}
