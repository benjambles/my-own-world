import { html } from 'lit';
import '../../../static/js/components/forms/join.js';
import '../../../static/js/components/forms/login.js';
import { RenderProps } from '../../../utils/render-template.js';
import { paths as userPaths } from '../config.js';
import styles from './join.css.js';

export default function (): RenderProps {
    return {
        assets: {
            styles: [{ href: '/static/styles/routes/account/join/join.css' }],
            scripts: [],
        },
        template: html`
            <main class="page--join">
                <section class="${styles.joinIntro}">
                    <h1>Welcome Explorer</h1>

                    <login-form redirectUrl="${userPaths.account}"></login-form>
                    <p class="${styles.barred}">Not Registered?</p>
                    <join-form></join-form>
                </section>
            </main>
        `,
    };
}
