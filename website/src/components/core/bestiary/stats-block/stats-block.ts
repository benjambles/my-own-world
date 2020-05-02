import type { LitTpl } from '../../../../utils/templates/lit-tpl';
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
        <section class="stats">
            ${name} ${variant} ${stats}
        </section>
    `;
};
