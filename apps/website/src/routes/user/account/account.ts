import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { html } from 'lit';
import { paths as userPaths } from '../../../routes/user/config.js';
import './account-form.js';
import { accountStyles } from './account.styles.js';

export default function (): RenderProps {
    return {
        assets: {
            inlineStyles: accountStyles,
        },
        template: html`
            <main class="page--account">
                <section class="cont-m">
                    <h1 class="gradient-text">Welcome back Explorer</h1>

                    <account-form redirecturl="${userPaths.login}"></account-form>
                </section>
            </main>
        `,
    };
}
