import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { html } from 'lit';
import '../../../static/js/components/forms/join.js';
import '../../../static/js/components/forms/login.js';
import { paths as userPaths } from '../config.js';
import { joinStyles } from './join.styles.js';

export default function (): RenderProps {
    return {
        assets: {
            inlineStyles: joinStyles,
        },
        template: html`
            <main class="page--join">
                <section class="cont-m">
                    <h1 class="gradient-text">Welcome Explorer</h1>

                    <login-form redirectUrl="${userPaths.account}"></login-form>
                    <p class="barred">Not Registered?</p>
                    <join-form></join-form>
                </section>
            </main>
        `,
    };
}
