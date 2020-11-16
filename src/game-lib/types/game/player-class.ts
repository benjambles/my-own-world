import { ClassAction, ClassTrait, TideTurner } from './actions';

export type PlayerClasses = PlayerClass[];

export type PlayerClass = {
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
};

export type ClassFeature = {
    icon: string;
    theme: string;
    flavour: string;
};

type TierAbilities = {
    traits: {
        [name: string]: ClassTrait;
    };
    actions: {
        [name: string]: ClassAction;
    };
    tideTurners: {
        [name: string]: TideTurner;
    };
};
