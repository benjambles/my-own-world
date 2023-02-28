import { HeroData, ProfessionOptions } from '../../types/game/hero.js';
import { PlayerClass } from '../../types/game/player-class.js';

export function setClass(hero: HeroData, playerClass: PlayerClass) {
    return { ...hero, class: playerClass };
}

export function setName(hero: HeroData, name: string) {
    return { ...hero, name };
}

export function setProfession(hero: HeroData, profession: ProfessionOptions) {
    return { ...hero, profession };
}
