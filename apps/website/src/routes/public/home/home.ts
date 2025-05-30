import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { html } from 'lit';
import { resourcePaths } from '../../resources/config.js';
import { rulesPaths } from '../../rules/config.js';
import { homeStyles } from './home.styles.js';
import { gameNameHtml } from '../../../helpers.js';

export default function (): RenderProps {
    return {
        assets: {
            inlineStyles: homeStyles,
        },
        template: html`
            <main class="page--home">
                <section class="home-intro">
                    <div class="panel">
                        <h1 class="gradient-text">${gameNameHtml}</h1>
                        <p>Rediscover the stars</p>
                        <p>Free to play science fiction wargame</p>
                    </div>
                </section>
                <section class="home-welcome panel">
                    <h2>Welcome to ${gameNameHtml}</h2>
                    <div class="welcome-text">
                        <h3>What is ${gameNameHtml}?</h3>
                        <p>
                            ${gameNameHtml} is a free to play Sci-fi skirmish game, with
                            modular rules that simulate well trained operatives acting in
                            real time against each other.
                        </p>

                        <p>
                            The game can be played both narratively,
                            <abbr title="Player vs Environment">PvE</abbr> and in one off
                            skirmishes - in
                            <abbr title="Player vs Environment">PvE</abbr>,
                            <abbr title="Player vs Player">PvP</abbr> and
                            <abbr title="Player vs Player vs Environment">PvPvE</abbr>
                            modes.
                        </p>
                    </div>

                    <div class="button-group col-to-row">
                        <a class="outline-button" href="${rulesPaths.quickstart.href}">
                            Learn to play
                        </a>
                        <a class="outline-button" href="/game/rules"> Read the rules </a>
                        <a class="outline-button" href="${resourcePaths.downloads}">
                            Downloads
                        </a>
                    </div>
                </section>
                <section class="explorer-panel panel">
                    <h2>The Universe</h2>
                    <ul class="explorer-links col-to-row">
                        <li>
                            <a class="callout" href="/explore/timeline">The timeline</a>
                        </li>
                        <li>
                            <a class="callout" href="/explore/factions">The factions</a>
                        </li>
                        <li>
                            <a class="callout" href="/explore/locations">The locations</a>
                        </li>
                    </ul>

                    <a href="/explore" class="outline-button">Explore the universe</a>
                </section>
            </main>
        `,
    };
}
