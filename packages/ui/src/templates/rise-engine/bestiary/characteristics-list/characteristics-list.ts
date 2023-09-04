import {
    CharacteristicGroup,
    Characteristics,
} from '@benjambles/rise-engine/dist/types/game/npc.js';
import { html } from 'lit';
import { lazyStylesheet } from '../../../utils/lazy-stylesheet.js';
import styles from './characteristics-list.css.js';

/**
 *
 * @param context
 * @param characteristics
 */
export function characteristicsList({ base, optional }: Characteristics) {
    return html`
        ${lazyStylesheet(
            '/mow-ui/styles/core/bestiary/character-list/character-list.css',
        )}
        <section class="${styles.characteristics}">
            ${characteristicGroup(base)}
            ${optional ? characteristicGroup(optional) : null}
        </section>
    `;
}

/**
 *
 * @param context
 * @param characteristics
 */
function characteristicGroup({ title, details }: CharacteristicGroup) {
    return html`
        <h2>${title}</h2>
        <dl class="${styles.characteristics__group}">
            ${Object.entries(details).map(
                ([name, description]) => html`
                    <div>
                        <dt>${name}:</dt>
                        <dd>${description}</dd>
                    </div>
                `,
            )}
        </dl>
    `;
}
