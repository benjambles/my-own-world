import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import styles from './class-selector.css.json';

interface ClassSelector {
    characterClasses: any[];
}

/**
 * Displays a list of possible classes for the user to select
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
export const classSelector: LitTpl<ClassSelector> = (context, data: ClassSelector) => {
    const { html } = context;

    return html`
        <div class=${styles.classSelector}>
            ${data.characterClasses.map(() => html`<div></div>`)}
        </div>
    `;
};
