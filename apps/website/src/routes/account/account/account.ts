import { html } from 'lit';
import { paths as userPaths } from '../../../routes/account/config.js';
import '../../../static/js/components/forms/account-form.js';
import { RenderProps } from '../../../utils/render-template.js';
import styles from './account.css.js';

export default function (): RenderProps {
    return {
        assets: {
            styles: [{ href: '/static/styles/routes/account/account/account.css' }],
            scripts: [],
        },
        template: html`
            <main class="page--account">
                <section class="${styles.accountIntro}">
                    <h1>Welcome back Explorer</h1>

                    <account-form redirecturl="${userPaths.login}"></account-form>
                </section>
            </main>
        `,
    };
}
