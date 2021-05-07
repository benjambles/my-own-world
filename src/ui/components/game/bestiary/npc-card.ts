import type { NPCCard } from '../../../../game-lib/types/game/npc.js';
import type { LitTpl } from '../../../utils/templates/lit-tpl.js';
import { lazyStylesheet } from '../../utils/lazy-stylesheet.js';
import { actionsTable } from './actions-table/actions-table.js';
import { characteristicsList } from './characteristics-list/characteristics-list.js';
import { actionGrid } from './grid/grid.js';
import cardStyles from './npc-card.css.json';
import { statsBlock } from './stats-block/stats-block.js';
import { turnOrder } from './turn-order/turn-order.js';

export const npcCard: LitTpl<NPCCard> = (
    context,
    { name, variant, stats, characteristics, turn_order, actions }: NPCCard,
) => {
    const { html } = context;

    return html`
        ${lazyStylesheet(context, '/styles/core/bestiary/npc-card.css')}
        <article class="${cardStyles.card}">
            <h1 class="${cardStyles.cardFull}">${name}</h1>
            <div class="${cardStyles.cardFull}">
                ${statsBlock(context, { name, variant, stats })}
            </div>
            <div class="${cardStyles.cardLeft} ${cardStyles.flexCol}">
                ${actionGrid(context, undefined)} ${turnOrder(context, turn_order)}
            </div>

            <div class="${cardStyles.cardRight}">
                ${characteristicsList(context, characteristics)} ${actionsTable(context, actions)}
            </div>
        </article>
    `;
};
