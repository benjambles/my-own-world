import { html } from 'lit';
import { primaryButton } from '../../../../core/buttons/primary-button.js';
import { textInput } from '../../../../core/form-elements/text-input.js';
import { link } from '../../../../core/links/link.js';
import baseStyles from '../../../../global-css/base.css.js';
import { lazyStylesheet } from '../../../../utils/lazy-stylesheet.js';
import styles from './home-intro.css.js';

export function homeIntro() {
    return html`
        ${lazyStylesheet('/styles/pages/public/home/home-intro/home-intro.css')}
        <section class="${styles.homeIntro}">
            <div class="${baseStyles.containerSlim} ${styles.homeIntroGrid}">
                <div class="${styles.homeIntro__text}">
                    <h1>Create, Discover, Learn</h1>

                    <p>
                        My own world was built for people who love world building, story
                        telling, exploring new worlds, and sharing experiences with
                        friends.
                    </p>

                    <p>
                        Best of all, it's open source! Add new features, or run your own
                        copy, with a little coding knowledge there's no limits.
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
    `;
}
