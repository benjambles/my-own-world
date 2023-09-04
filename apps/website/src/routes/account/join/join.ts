import { html } from 'lit';
import '../../../static/js/components/forms/join.js';
import { RenderProps } from '../../../utils/render-template.js';
import styles from './join.css.js';

export default function (): RenderProps {
    return {
        assets: {
            styles: [{ href: '/static/styles/routes/account/join/join.css' }],
            scripts: [],
        },
        template: html`<main class="page--join">
            <section class="${styles.joinIntro}">
                <div class="${styles.joinIntroGrid}">
                    <div class="${styles.joinIntro__text}">
                        <h1>Kh&ocirc;ra</h1>

                        <p>
                            Kh&ocirc;ra is a narrative tactical sci-fi wargame played out
                            on your tabletop, or a virtual one, designed for both
                            <abbr title="player vs environment">pve</abbr> and
                            <abbr title="player vs player">pvp</abbr> play.
                        </p>

                        <p>
                            The game is designed for either one off skirmish play, or
                            narative campaigns where your crew grows over time.
                        </p>

                        <p>
                            By registering you gain access to a suite of tools to help
                            manage your crews and campaigns.
                        </p>
                    </div>

                    <join-form></join-form>
                </div>
            </section>
        </main>`,
    };
}
