import type { LitTpl } from '../../../../utils/templates/lit-tpl.js';
import { lazyStylesheet } from '../../../utils/lazy-stylesheet.js';
import styles from './grid.css.json';

export const actionGrid: LitTpl<undefined> = (context) => {
    const { html } = context;

    return html`
        ${lazyStylesheet(context, '/styles/bestiary/grid.css')}
        <ol class="${styles.grid}">
            <li>
                <div class="${styles.hex} ${styles.centre}">
                    <span><span class="${styles.label}">Basic Attack</span></span>
                </div>
                <ol>
                    ${[1, 2, 3, 4, 5, 6].map((count) => arm(context, count))}
                </ol>
            </li>
        </ol>
    `;
};

const arm: LitTpl<number> = (context, count: number) => {
    const { html } = context;

    return html`
        <li class="${styles.arm} ${styles[`arm${count}`]}">
            <ol class="${styles.rows}">
                <li class="${styles.row}">
                    <ol>
                        <li class="${styles.hex} ${styles.basic3}">
                            <span><span class="${styles.label}">Skill 1</span></span>
                        </li>
                    </ol>
                </li>
                <li class="${styles.row} ${styles.row2}">
                    <ol>
                        <li class="${styles.hex} ${styles.special3}">
                            <span><span class="${styles.label}">Skill 2</span></span>
                        </li>
                        <li class="${styles.hex} ${styles.basic2}">
                            <span><span class="${styles.label}">Skill 3</span></span>
                        </li>
                        <li class="${styles.hex} ${styles.special3}">
                            <span><span class="${styles.label}">Skill 4</span></span>
                        </li>
                    </ol>
                </li>
                <li class="${styles.row} ${styles.row3}">
                    <ol>
                        <li class="${styles.hex} ${styles.special1}">
                            <span><span class="${styles.label}">Skill 5</span></span>
                        </li>
                        <li class="${styles.hex} ${styles.special1}">
                            <span><span class="${styles.label}">Skill 6</span></span>
                        </li>
                        <li class="${styles.hex} ${styles.basic1}">
                            <span><span class="${styles.label}">Skill 7</span></span>
                        </li>
                        <li class="${styles.hex} ${styles.special1}">
                            <span><span class="${styles.label}">Skill 8</span></span>
                        </li>
                        <li class="${styles.hex} ${styles.special1}">
                            <span><span class="${styles.label}">Skill 9</span></span>
                        </li>
                    </ol>
                </li>
            </ol>
        </li>
    `;
};
