import { html } from 'lit';
import { RenderProps } from '../../../utils/render-template.js';
import styles from './home.css.js';

export default function (): RenderProps {
    return {
        assets: {
            styles: [{ href: '/static/styles/routes/public/home/home.css' }],
            scripts: [],
        },
        template: html`
            <main class="${styles.pageHome}">
                <section class="${styles.homeIntro}">
                    <div class="${styles.panel}">
                        <h1>Kh&ocirc;ra</h1>
                        <p>Rediscover the stars</p>
                        <p>Free to play science fiction wargame</p>
                    </div>
                </section>
                <section class="${styles.homeWelcome} ${styles.panel}">
                    <h2>Welcome to Kh&ocirc;ra</h2>
                    <div class="${styles.welcomeText}">
                        <h3>What is Kh&ocirc;ra?</h3>
                        <p>
                            Kh&ocirc;ra is a free to play Sci-fi skirmish game, with
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

                    <div class="${styles.buttonGroup}">
                        <a class="${styles.outlineButton}" href="/game/quick-start">
                            Learn to play
                        </a>
                        <a class="${styles.outlineButton}" href="/game/rules">
                            Read the rules
                        </a>
                        <a class="${styles.outlineButton}" href="/game/downloads">
                            Downloads
                        </a>
                    </div>
                </section>
                <section class="${styles.explorerPanel} ${styles.panel}">
                    <h2>The Universe</h2>
                    <ul class="${styles.explorerLinks}">
                        <li><a href="/explore/timeline">The timeline</a></li>
                        <li><a href="/explore/factions">The factions</a></li>
                        <li><a href="/explore/locations">The locations</a></li>
                    </ul>

                    <a href="/explore" class="${styles.outlineButton}"
                        >Explore the universe</a
                    >
                </section>
            </main>
        `,
    };
}
