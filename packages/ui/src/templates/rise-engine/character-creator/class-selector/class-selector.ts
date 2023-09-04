import { html } from 'lit';
import { classCard, ClassDetails } from '../../character/class-card/class-card.js';
import styles from './class-selector.css.js';

interface ClassSelector {
    title: string;
    characterClasses: ClassDetails[];
}

/**
 * Displays a list of possible classes for the user to select
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
export function classSelector(data: ClassSelector) {
    return html`
        <h1>${data.title}</h1>
        <div class=${styles.classSelector}>
            ${data.characterClasses.map((charClass) =>
                classCard({ view: 'small', classDetails: charClass }),
            )}
        </div>
    `;
}
