import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import { lazyStylesheet } from '../../../utils/lazy-stylesheet';
import type { CharacteristicGroup, Characteristics } from '@gameLib/types/game/npc';
import styles from './characteristics-list.css.json';
/**
 *
 * @param context
 * @param characteristics
 */
export const characteristicsList: LitTpl<Characteristics> = (
    context,
    { base, optional }: Characteristics,
) => {
    const { html } = context;

    return html`
        ${lazyStylesheet(context, '/styles/core/bestiary/character-list/character-list.css')}
        <section class="${styles.characteristics}">
            ${characteristicGroup(context, base)}
            ${optional ? characteristicGroup(context, optional) : null}
        </section>
    `;
};

/**
 *
 * @param context
 * @param characteristics
 */
const characteristicGroup: LitTpl<CharacteristicGroup> = (
    context,
    { title, details }: CharacteristicGroup,
) => {
    const { html } = context;

    return html`
        <h2>${title}</h2>
        <dl class="${styles.characteristics__group}">
            ${Object.entries(details).map(
                ([name, description]) =>
                    html`
                        <div>
                            <dt>${name}:</dt>
                            <dd>${description}</dd>
                        </div>
                    `,
            )}
        </dl>
    `;
};
