import { html } from 'lit';
import { RenderProps } from '../../../utils/render-template.js';
import { paths as rosterPaths } from '../../tools/roster/config.js';
import { paths as rulesPaths } from '../config.js';
import styles from './quick-start.css.js';

export default function (): RenderProps {
    return {
        assets: {
            styles: [{ href: '/static/styles/routes/rules/quick-start/quick-start.css' }],
            scripts: [],
        },
        template: html`
            <section-header sectionname="Quick Start">
                <a slot="root-link" href="${rulesPaths.index}">Rules</a>
                <a href="${rosterPaths.index}">Squad Creator</a>
                <a href="/game/missions">Missions</a>
                <a href="/downloads">Downloads</a>
            </section-header>
            <main class="page--quick-start ${styles.quickStart}">
                <nav>
                    <ul>
                        <li><a href="${rulesPaths.index}">Rules</a></li>
                        <li><a href="${rulesPaths.quickstart}">Quick Start</a></li>
                    </ul>
                </nav>

                <section>
                    <h1>Getting Started</h1>

                    <p>
                        Kh&ocirc;ra is designed as a modular ruleset with simple core
                        rules, that can be extended from the outset or as and when you
                        become more adept at leading your crews.
                    </p>

                    <p>
                        This quick start guide will walk you through a few rounds of
                        actions with the basic rules, using prebuilt characters, and
                        explain some of the basic concepts needed to understand the game.
                    </p>

                    <h2>What you'll need</h2>

                    <p>In order to play games of Kh&ocirc;ra you'll need a things.</p>

                    <p>
                        <b>Dice </b> - All rolls in Kh&ocirc;ra use 12 sided dice (known
                        as d12), unlike many other games you're not rolling handfulls of
                        dice so a few d12 or an app that can represent them is perfect.
                    </p>

                    <p>
                        <b>Your forces </b> - You'll need a few tokens or miniatures to
                        represent your forces. 28-32mm miniatures are ideal, however the
                        game can work at other scales with some conversion of
                        measurements.
                    </p>

                    <p>
                        <b>Somewhere to play</b> - Each mission will describe the size of
                        the playspace, however 1m&sup2; will be more than enough for most
                        games. 3D terrain is optional, but it will enhance your play
                        experience, you can easily play on a map drawn on a suitable
                        material.
                    </p>

                    <p>
                        <b>Something to measure with</b> - a tape measure, ruler, etc. A
                        tape measure is preferable as it will allow you to be more
                        accurate and have a lower chance of accidentally knocking
                        something over.
                    </p>

                    <p>
                        <b>Unit information</b> - Finally you'll need your squads
                        information. We'll provide this for the quick start, however for
                        your own missions you can write one on paper, print it or use our
                        online tool to manage your squads.
                    </p>

                    <h2>Setup</h2>

                    <p>
                        To play the demo game you'll need a flat area roughly 60cm&sup2.
                        Inside this area you should either place objects, or suitable
                        sized pieces of paper to represent the buildings and items as
                        shown on the map below.
                    </p>

                    <p>
                        Each player should take their chosen character, and place them on
                        opposite sides of the map. You may place you character anywhere
                        along your board edge, but no more than 5cm in from your edge.
                    </p>

                    <a name="turn" id="turn"></a>
                    <h2>The turn sequence</h2>

                    <p>
                        In Kh&ocirc;ra a turn (all characters using their actions)
                        represents a very small slice of time. Turns are taken in a
                        sequence that represents simultaneous action/reaction by the
                        characters - with faster/more experienced characters performing
                        more actions.
                    </p>

                    <p>
                        For each action round the characters with the highest number of
                        remaining actions is activated and they perform an action. Their
                        remaining actions is then reduced by 1. This sequence continues
                        until all characters have 0 actions left.
                    </p>

                    <p>
                        For the example characters this means that the Recon Soldier (4
                        actions) will activate first and perform an action. After this
                        first action round, both characters will activate simultaneously
                        until all of their actions are used up.
                    </p>

                    <aside class="${styles.callout}">
                        <b>Note:</b><br />
                        Whilst the actions take place simultaneously players are
                        recommended to take turns stating and performing their action to
                        reduce confusion.
                    </aside>

                    <p>
                        The player with the Recon Soldier should decide upon their first
                        action. For the purposes of the demo game they may either
                        <b>Move</b> or <b>Hold</b> or <b>Shoot</b>.
                    </p>

                    <h3>Actions</h3>

                    <p>
                        <b>Move</b> - The character may move up to the maximum distance
                        displayed on their stat sheet.
                    </p>

                    <p><b>Hold</b> - The character skips their action.</p>

                    <p>
                        <b>Shoot</b> - Perform a ranged attack against a character in view
                        up to the distance indicated on the attackers weapon.
                    </p>

                    <h3>Shooting</h3>

                    <p>
                        In order to perform a Shoot action first check if the character is
                        obscured, or in the open. Characters in the open will always be
                        hit. A character is considered as obscured if at least 50% of
                        their bulk cannot be seen. If the character is obscured, roll a
                        d12 and on a roll of 6+ the shot hits the target.
                    </p>

                    <p>
                        In order to determine the number of wounds check the
                        <i>attacks</i> and <i>damage</i> properties of the weapon being
                        fired. The <i>attacks</i> property represents how many dice should
                        be rolled, and the <i>damage</i> property is how many wounds each
                        successful roll will inflict.
                    </p>

                    <p>
                        Both demo characters have a weapon with 2 attacks, doing 1 wound
                        each if successful.
                    </p>

                    <p>
                        A successful attack is determined by comparing the roll against a
                        range of values determined by the strength of the weapon and the
                        targets armour. For the demo we have provided the ranges needed
                        for each character to make shooting attacks.
                    </p>

                    <p>Insert Recon attack</p>
                    <p>Insert Armoured attack</p>

                    <p>
                        If an attack is successful reduce the targets <i>Health</i> by 1.
                        If the targets <i>Health</i> is reduced to 0 then at the end of
                        the action round they are <i>Out of Action</i> and the game is
                        over. If the other player survived then they win, otherwise it is
                        a draw.
                    </p>

                    <h3>Following rounds</h3>

                    <p>
                        Both players now perform an action with their character and then
                        reduce the number of actions by 1. Once both characters reach 0
                        actions (by performing 3 rounds), the turn is over.
                    </p>

                    <h3>Cleanup</h3>
                    <p>
                        Reset the characters actions to their max values, and then begin
                        the <a href="#turn">turn sequence</a> again until one or both
                        characters are <i>Out of Action</i>.
                    </p>

                    <h2>Congratulations!</h2>

                    <p>
                        You've completed your first game of Kh&ocirc;ra. Feel free to
                        practice it a few times, or you head over to the rules section to
                        see what else awaits you.
                    </p>

                    <p>
                        The game has many features to add variety to your games that you
                        can add to your missions to increase the variety and complexity of
                        gameplay, such as:
                    </p>

                    <ul>
                        <li>Environmental Conditions</li>
                        <li>Skills and Traits</li>
                        <li>Stances and Statuses</li>
                        <li>Mission types</li>
                        <li>"AI" controlled NPCs</li>
                        <li>... and more</li>
                    </ul>
                </section>
            </main>
        `,
    };
}
