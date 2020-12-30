import type { Stats } from '@gameLib/types/game/npc';
import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import { lazyStylesheet } from '../../../utils/lazy-stylesheet';
import styles from './stats-block.css.json';

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
        <section class="${styles.stats}">
            <span class="${styles.name}">
                <b>Name:</b>
                <span class="${styles.title}">${name}</span> ${variant
                    ? html`<span>[${variant}]</span>`
                    : null}
            </span>
            <span class="${styles.health}">
                <b>HP:</b> <span>${stats.hp.current}/${stats.hp.max}</span>
            </span>
            <span class="${styles.toughness}"> <b>Toughness:</b> ${stats.toughness} </span>
            <span class="${styles.resistance}"> <b>Resistance:</b> ${stats.resistance} </span>
            <span> <b>Rank:</b> ${stats.rank} </span>
            <span> <b>Type:</b> ${stats.type} </span>
            <span> <b>Flow:</b> ${stats.flow} </span>
            <span> <b>Size:</b> ${stats.size} </span>
        </section>
    `;
};
