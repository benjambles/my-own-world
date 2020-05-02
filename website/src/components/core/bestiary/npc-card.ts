import type { LitTpl } from '../../../utils/templates/lit-tpl';
import { actionsTable } from './actions-table/actions-table';
import { characteristicsList } from './characteristics-list/characteristics-list';
import { actionGrid } from './grid/grid';
import type { NPCCard } from './npc-types';
import { statsBlock } from './stats-block/stats-block';
import { turnOrder } from './turn-order/turn-order';

export const npcCard: LitTpl<NPCCard> = (
    context,
    { name, variant, stats, characteristics, turn_order, actions }: NPCCard
) => {
    const { html } = context;

    return html`
        <article>
            <h1>${name}</h1>
            ${statsBlock(context, { name, variant, stats })}
            <div>
                ${actionGrid(context)}
            </div>

            <div>
                ${characteristicsList(context, characteristics)} ${actionsTable(context, actions)}
                ${turnOrder(context, turn_order)}
            </div>
        </article>
    `;
};
