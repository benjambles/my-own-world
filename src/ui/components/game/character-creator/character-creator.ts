import type { LitTpl } from '../../../utils/templates/lit-tpl';
import styles from './character-creator.css.json';

interface CharacterCreator {}

/**
 *
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
export const characterCreator: LitTpl<CharacterCreator> = (context, data: CharacterCreator) => {
    const { html } = context;

    return html`<div class=${styles.characterCreator}>${data}</div>`;
};
