import { ClassAction, ClassTrait, TideTurner } from './actions.js';

export interface PlayerClass {
    name: string;
    description: string;
    quote: string;
    classFeatures: [ClassFeature, ClassFeature, ClassFeature];
    assets: {
        classLogo: string;
        fullPortrait: string;
        thumbPortrait: string;
        mapIcon: string;
    };
    colorTheme: {
        mainColor: string;
        textColor: string;
    };
    tiers: [TierAbilities, TierAbilities, TierAbilities, TierAbilities];
}

export interface ClassFeature {
    icon: string;
    theme: string;
    flavour: string;
}

interface TierAbilities {
    traits: {
        [name: string]: ClassTrait;
    };
    actions: {
        [name: string]: ClassAction;
    };
    tideTurners: {
        [name: string]: TideTurner;
    };
}
