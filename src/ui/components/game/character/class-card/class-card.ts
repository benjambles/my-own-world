import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import styles from './class-card.css.json';

export interface ClassDetails {
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

interface ClassFeature {
    icon: string;
    theme: string;
    flavour: string;
}

interface ClassCardProps {
    view: 'small' | 'large';
    classDetails: ClassDetails;
}

/**
 * Class card used in the character creation section of a game.
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
export const classCard: LitTpl<ClassCardProps> = (context, data: ClassCardProps) => {
    const {
        html,
        directives: { classMap },
    } = context;

    const { classDetails } = data;
    const { mainColor, textColor } = classDetails.colorTheme;
    const { thumbPortrait, classLogo } = classDetails.assets;

    return html`
        <class-card
            class="${classMap({ [styles.classCard]: true, [styles.large]: data.view === 'large' })}"
        >
            <figure>
                <img src="${thumbPortrait}" alt="" />
            </figure>
            <div
                class="${styles.classCardInfo}"
                style="background-color:${mainColor}; color:${textColor};"
            >
                <img class="${styles.logo}" src="${classLogo}" />
                <h1>${classDetails.name}</h1>
                <span>"${classDetails.quote}"</span>
                <p>${classDetails.description}</p>
            </div>
            <div
                class="${styles.classFeatures}"
                style="background-color:${mainColor}; color:${textColor};"
            >
                ${classDetails.classFeatures.map((feature) => classFeature(context, feature))}
            </div>
        </class-card>
    `;
};

/**
 *
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
const classFeature: LitTpl<ClassFeature> = (context, { icon, theme, flavour }: ClassFeature) => {
    const { html } = context;

    return html`
        <div>
            <img src="${icon}" alt="" />
            <h2>${theme}</h2>
            <p>${flavour}</p>
        </div>
    `;
};
