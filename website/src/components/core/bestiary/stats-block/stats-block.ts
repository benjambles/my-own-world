import { clientContext, clientResult } from '../../../../utils/templates/client-context';
import { serverContext, serverResult } from '../../../../utils/templates/server-context';
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
export function statsBlock(context: clientContext, data: StatsData): clientResult;
export function statsBlock(context: serverContext, data: StatsData): serverResult;
export function statsBlock(context, { name, variant, stats }: StatsData) {
    const { html } = context;

    return html`
        <section class="stats">
            ${name} ${variant} ${stats}
        </section>
    `;
}
