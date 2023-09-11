import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { storyRenderer } from '../../../utils/storybook/story-renderer.js';
import './dice-check.js';

export default {
    title: 'Game Components/Dice Callout',
    parameters: {
        componentSubtitle: '',
    },
    decorators: [storyRenderer],
} as Meta;

export const standardCheckSuccess = () => html`
    <dice-check roll="11" target="9">
        David is checking to see if his Sniper can see Bens Engineer who is in cover.
        <noscript>11 > 9 = Success</noscript>
    </dice-check>
`;

export const standardCheckEven = () => html`
    <dice-check roll="8" target="8">
        Ben is checking to see if his Hacker avoids poison damage
        <noscript>8 < 8 = Success</noscript>
    </dice-check>
`;

export const standardCheckFail = () => html`
    <dice-check roll="4" target="8">
        Ben is checking to see if his Hacker avoids poison damage
        <noscript>4 < 8 = Fail</noscript>
    </dice-check>
`;

export const opposedCheckSuccess = () => html`
    <opposed-check
        actortext="Shotgun"
        actorValue="6"
        targettext="Composite Armour"
        targetvalue="5"
        roll="7"
    >
        An example of a successful shooting attack
    </opposed-check>
`;

export const opposedCheckCrit = () => html`
    <opposed-check
        actortext="Shotgun"
        actorValue="6"
        targettext="Composite Armour"
        targetvalue="5"
        roll="11"
    >
        An example of a critical shooting attack
    </opposed-check>
`;

export const opposedCheckFail = () => html`
    <opposed-check
        actortext="Shotgun"
        actorValue="6"
        targettext="Composite Armour"
        targetvalue="5"
        roll="1"
    >
        An example of a failed shooting attack
    </opposed-check>
`;

export const opposedNoFail = () => html`
    <opposed-check
        actortext="Sniper Rifle"
        actorValue="10"
        targettext="Clothing"
        targetvalue="2"
        roll="1"
    >
        An example of a shooting attack that can't fail
    </opposed-check>
`;

export const opposedNoCrit = () => html`
    <opposed-check
        actortext="Stub Pistol"
        actorValue="4"
        targettext="Heavy Armour"
        targetvalue="10"
        roll="9"
    >
        An example of a shooting attack that can't crit
    </opposed-check>
`;
