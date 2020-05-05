import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import { lazyStylesheet } from '../../../utils/lazy-stylesheet';
import type { Stats } from '../npc-types';

interface StatsData {
    name: string;
    variant: string;
    stats: Stats;
}

/**
 *
 * @param context
 * @param data
 */
export const statsBlock: LitTpl<StatsData> = (context, { name, variant, stats }: StatsData) => {
    const { html } = context;

    return html`
        ${lazyStylesheet(context, '/styles/core/bestiary/stats-block/stats-block.css')}
        <section class="stats">
            <span class="name">
                <b>Name:</b> ${name} ${variant ? html`<span>[${variant}]</span>` : null}
            </span>
            <span> <b>HP:</b> ${stats.hp.current}/${stats.hp.max} </span>
            <span> <b>Toughness:</b> ${stats.toughness} </span>
            <span> <b>Resistance:</b> ${stats.resistance} </span>
            <span> <b>Rank:</b> ${stats.rank} </span>
            <span> <b>Type:</b> ${stats.type} </span>
            <span> <b>Flow:</b> ${stats.flow} </span>
            <span> <b>Size:</b> ${stats.size} </span>
        </section>
    `;
};
