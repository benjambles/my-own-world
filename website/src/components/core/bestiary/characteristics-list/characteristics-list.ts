import { clientContext, clientResult } from '../../../../utils/templates/client-context';
import { serverContext, serverResult } from '../../../../utils/templates/server-context';
import type { Characteristics, CharacteristicGroup } from '../npc-types';

/**
 *
 * @param context
 * @param characteristics
 */
export function characteristicsList(
    context: clientContext,
    characteristics: Characteristics
): clientResult;
export function characteristicsList(
    context: serverContext,
    characteristics: Characteristics
): serverResult;
export function characteristicsList(context, { base, optional }: Characteristics) {
    const { html } = context;

    return html`
        <section class="characteristics">
            ${characteristicGroup(context, base)}
            ${optional ? characteristicGroup(context, optional) : null}
        </section>
    `;
}

/**
 *
 * @param context
 * @param characteristics
 */
function characteristicGroup(
    context: clientContext,
    characteristics: CharacteristicGroup
): clientResult;
function characteristicGroup(
    context: serverContext,
    characteristics: CharacteristicGroup
): serverResult;
function characteristicGroup(context, { title, details }: CharacteristicGroup) {
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
}
