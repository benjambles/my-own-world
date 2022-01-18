import type { NPCCard } from '@benjambles/rise-engine/dist/types/game/npc.js';
import { html } from 'lit';
import { lazyStylesheet } from '../../utils/lazy-stylesheet.js';
import { actionsTable } from './actions-table/actions-table.js';
import { characteristicsList } from './characteristics-list/characteristics-list.js';
import { actionGrid } from './grid/grid.js';
import cardStyles from './npc-card.css.js';
import { statsBlock } from './stats-block/stats-block.js';
import { turnOrder } from './turn-order/turn-order.js';

export function npcCard({ name, variant, stats, characteristics, turn_order, actions }: NPCCard) {
    return html`
        ${lazyStylesheet('/styles/core/bestiary/npc-card.css')}
        <article class="${cardStyles.card}">
            <h1 class="${cardStyles.cardFull}">${name}</h1>
            <div class="${cardStyles.cardFull}">${statsBlock({ name, variant, stats })}</div>
            <div class="${cardStyles.cardLeft} ${cardStyles.flexCol}">
                ${actionGrid()} ${turnOrder(turn_order)}
            </div>

            <div class="${cardStyles.cardRight}">
                ${characteristicsList(characteristics)} ${actionsTable(actions)}
            </div>
        </article>
    `;
}
