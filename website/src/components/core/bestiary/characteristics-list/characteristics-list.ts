import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import type { CharacteristicGroup, Characteristics } from '../npc-types';

/**
 *
 * @param context
 * @param characteristics
 */
export const characteristicsList: LitTpl<Characteristics> = (
    context,
    { base, optional }: Characteristics
) => {
    const { html } = context;

    return html`
        <section class="characteristics">
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
    { title, details }: CharacteristicGroup
) => {
    const { html } = context;

    return html`
        <h2>${title}</h2>
        <dl class="characteristics__group">
            ${Object.entries(details).map(
                ([name, description]) =>
                    html`
                        <div>
                            <dt>${name}:</dt>
                            <dd>${description}</dd>
                        </div>
                    `
            )}
        </dl>
    `;
};
