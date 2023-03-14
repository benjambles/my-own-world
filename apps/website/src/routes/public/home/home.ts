import { link, primaryButton, textInput } from '@benjambles/mow-ui/core.js';
import baseStyles from '@benjambles/mow-ui/styles/base.css.js';
import { html } from 'lit';
import { layout } from '../../../layouts/core/static-layout.js';
import styles from './home.css.js';

export default {
    assets: {
        styles: [{ href: '/static/styles/routes/public/home/home.css' }],
        scripts: [],
    },
    render: function (data) {
        const page = html`<main class="page--home">
            <section class="${styles.homeIntro}">
                <div class="${baseStyles.containerSlim} ${styles.homeIntroGrid}">
                    <div class="${styles.homeIntro__text}">
                        <h1>Create, Discover, Learn</h1>

                        <p>
                            My own world was built for people who love world building,
                            story telling, exploring new worlds, and sharing experiences
                            with friends.
                        </p>

                        <p>
                            Best of all, it's open source! Add new features, or run your
                            own copy, with a little coding knowledge there's no limits.
                        </p>
                    </div>

                    <form action="/signup">
                        ${textInput({ label: 'Username', id: 'username' })}
                        ${textInput({
                            label: 'Email',
                            id: 'email',
                            type: 'email',
                        })}
                        ${textInput({
                            label: 'Password',
                            id: 'password',
                            type: 'password',
                        })}
                        <small>
                            Passwords should be secure, don't use one from another site.
                            ${link({
                                href: '/password-security',
                                text: 'Learn more',
                                display: { underlined: true },
                            })}.
                        </small>

                        ${primaryButton({
                            text: 'Get Started',
                            type: 'submit',
                            size: 'large',
                        })}

                        <small>
                            By clicking “Get started”, you agree to our
                            ${link({
                                href: '/terms',
                                text: 'Terms of Service and Privacy Statement',
                                display: { underlined: true },
                            })}.
                            We’ll occasionally send you account related emails.
                        </small>
                    </form>
                </div>
            </section>
        </main>`;

        return html`${layout(data, page)}`;
    },
};
