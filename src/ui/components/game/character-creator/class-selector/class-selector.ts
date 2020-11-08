import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import { classCard, ClassDetails } from '../../character/class-card/class-card';
import styles from './class-selector.css.json';

interface ClassSelector {
    title: string;
    characterClasses: ClassDetails[];
}

/**
 * Displays a list of possible classes for the user to select
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
export const classSelector: LitTpl<ClassSelector> = (context, data: ClassSelector) => {
    const { html } = context;

    return html`
        <h1>${data.title}</h1>
        <div class=${styles.classSelector}>
            ${data.characterClasses.map((charClass) =>
                classCard(context, { view: 'small', classDetails: charClass }),
            )}
        </div>
    `;
};
