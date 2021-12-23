import type { HeroData } from '@benjambles/mow-game/dist/types/game/hero.js';
import { html } from 'lit';
import styles from './hero-card.css.js';

/**
 * Render a character sheet for a player character
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
export function heroCard(data: HeroData) {
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
}
