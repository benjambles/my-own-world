import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import styles from './hero-card.css.json';
import type { HeroData } from '../../../../types/game/hero';

/**
 * Render a character sheet for a player character
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
export const heroCard: LitTpl<HeroData> = (context, data: HeroData) => {
    const { html } = context;

    return html`
        <article class="${styles.heroCard}">
            <div class="${styles.col1}">
                <span>Name: ${data.name}</span>
                <div>
                    <span>HP:</span>
                    <span>Class: ${data.class.name}</span>
                    <span>Tier: ${data.tier}</span>
                </div>
            </div>
            <div class="${styles.col2}">Col2</div>
        </article>
    `;
};
