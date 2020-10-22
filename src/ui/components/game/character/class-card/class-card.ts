import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import { ClassFeature } from '../../../../../types/game/player-class';
import styles from './class-card.css.json';

interface ClassCard {
    name: string;
    description: string;
    quote: string;
    classFeatures: [ClassFeature, ClassFeature, ClassFeature];
    assets: {
        classLogo: string;
        thumbPortrait: string;
    };
    colorTheme: {
        mainColor: string;
        textColor: string;
    };
}

/**
 * Class card used in the character creation section of a game.
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
export const classCard: LitTpl<ClassCard> = (context, data: ClassCard) => {
    const { html } = context;

    const { mainColor, textColor } = data.colorTheme;
    const { thumbPortrait, classLogo } = data.assets;

    return html`
        <section class="${styles.classCard}">
            <figure>
                <img src="${thumbPortrait}" />
            </figure>
            <div
                class="${styles.classCardInfo}"
                style="background-color:${mainColor}; color:${textColor};"
            >
                <img class="${styles.logo}" src="${classLogo}" />
                <h1>${data.name}</h1>
                <span>"${data.quote}"</span>
                <p>${data.description}</p>
            </div>
            <div
                class="${styles.classFeatures}"
                style="background-color:${mainColor}; color:${textColor};"
            >
                ${data.classFeatures.map((feature) => {
                    return html`
                        <div>
                            <img src="${feature.icon}" />
                            <h2>${feature.theme}</h2>
                            <p>${feature.flavour}</p>
                        </div>
                    `;
                })}
            </div>
        </section>
    `;
};
