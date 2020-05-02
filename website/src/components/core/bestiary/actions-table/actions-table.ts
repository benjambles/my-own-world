import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import type { Action, ActionGroup, Actions } from '../npc-types';

/**
 *
 * @param context
 * @param characteristics
 */
export const actionsTable: LitTpl<Actions> = (
    context,
    { limit, basic, special, learnable }: Actions
) => {
    const { html } = context;

    return html`<section class="actions">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Range</th>
                    <th>Effect</th>
                </tr>
            </thead>
            ${actionGroup(context, { actions: basic, title: 'Basic Actions', limit })}
            ${special
                ? actionGroup(context, {
                      actions: special,
                      title: 'Special Abilities',
                      className: 'special-actions',
                  })
                : null}
            ${learnable
                ? actionGroup(context, {
                      actions: learnable,
                      title: 'Learnable Special Abilities',
                      className: 'learnable-actions',
                  })
                : null}
        </table>
    </section>`;
};

interface ActionGroupData {
    actions: ActionGroup;
    title: string;
    limit?: number;
    className?: string;
}

const actionGroup: LitTpl<ActionGroupData> = (
    context,
    { actions, title, limit, className }: ActionGroupData
) => {
    const {
        html,
        directives: { ifDefined },
    } = context;
    const titleCols = limit ? 3 : 4;

    return html`
        <tbody class="${ifDefined(className)}">
            <tr>
                <th colspan="${titleCols}">${title}</th>
                ${limit
                    ? html`<th colspan="1">[Storyteller only] Actions per Turn: ${limit}</th>`
                    : null}
            </tr>
            ${Object.values(actions).map(action => actionRow(context, action))}
        </tbody>
    `;
};

const actionRow: LitTpl<Action> = (context, { name, autoHit, type, range, effect }: Action) => {
    const { html } = context;
    return html`
        <tr>
            <td>${name}${autoHit ? html`<span>Auto Hit</span>` : null}</td>
            <td>${type}</td>
            <td>${range ?? '-'}</td>
            <td>${effect}</td>
        </tr>
    `;
};
