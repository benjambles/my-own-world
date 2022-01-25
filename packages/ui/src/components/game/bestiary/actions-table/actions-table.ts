import type { Action, ActionGroup, Actions } from '@benjambles/rise-engine/dist/types/game/npc.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { lazyStylesheet } from '../../../utils/lazy-stylesheet.js';
import styles from './actions-table.css.js';

/**
 *
 * @param characteristics
 */
export function actionsTable({ limit, basic, special, learnable }: Actions) {
    return html`
        ${lazyStylesheet('/styles/game/bestiary/actions-table/actions-table.css')}
        <section class="${styles.actions}">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Range</th>
                        <th>Effect</th>
                    </tr>
                </thead>
                ${actionGroup({
                    actions: basic,
                    title: 'Basic Actions',
                    limit,
                })}
                ${special
                    ? actionGroup({
                          actions: special,
                          title: 'Special Abilities',
                          className: styles.specialActions,
                      })
                    : null}
                ${learnable
                    ? actionGroup({
                          actions: learnable,
                          title: 'Learnable Special Abilities',
                          className: styles.learnableActions,
                      })
                    : null}
            </table>
        </section>
    `;
}

interface ActionGroupData {
    actions: ActionGroup;
    title: string;
    limit?: number;
    className?: string;
}

function actionGroup({ actions, title, limit, className }: ActionGroupData) {
    const titleCols = limit ? 3 : 4;

    return html`
        <tbody class="${ifDefined(className)}">
            <tr>
                <th colspan="${titleCols}">${title}</th>
                ${limit
                    ? html`<th colspan="1">[Storyteller only] Actions per Turn: ${limit}</th>`
                    : null}
            </tr>
            ${Object.values(actions).map((action) => actionRow(action))}
        </tbody>
    `;
}

function actionRow({ name, autoHit, type, range, effect }: Action) {
    return html`
        <tr>
            <td>${name}${autoHit ? html`<span>Auto Hit</span>` : null}</td>
            <td>${type}</td>
            <td>${range ?? '-'}</td>
            <td>${effect}</td>
        </tr>
    `;
}
