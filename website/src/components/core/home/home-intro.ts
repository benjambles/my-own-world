import type { LitTpl } from '../../../utils/templates/lit-tpl';
import baseStyles from '../../global-css/base.css.json';
import { lazyStylesheet } from '../../utils/lazy-stylesheet';
import { primaryButton } from '../buttons/primary-button';
import { inputBox } from '../form-elements/input-box';
import { link } from '../links/link';
import styles from './home-intro.css.json';

export const homeIntro: LitTpl<undefined> = context => {
    const { html } = context;

    return html`
        ${lazyStylesheet(context, '/styles/core/home/home-intro.css')}
        <section class="${styles.homeIntro}">
            <div class="${baseStyles.containerSlim} ${styles.homeIntroGrid}">
                <div class="${styles.homeIntro__text}">
                    <h1>Create, Discover, Learn</h1>

                    <p>
                        My own world was build for people who love world build, story telling,
                        exploring new worlds, and sharing experiences with friends.
                    </p>

                    <p>
                        Best of all, it's open source! Add new features, or run your own copy, with
                        a little coding knowledge there's no limits.
                    </p>
                </div>

                <form action="/signup">
                    ${inputBox(context, { label: 'Username', id: 'username' })}
                    ${inputBox(context, { label: 'Email', id: 'email', type: 'email' })}
                    ${inputBox(context, { label: 'Password', id: 'password', type: 'password' })}
                    <small>
                        Passwords should be secure, don't use one from another site.
                        ${link(context, {
                            href: '/password-security',
                            text: 'Learn more',
                            display: { underlined: true },
                        })}.
                    </small>

                    ${primaryButton(context, {
                        text: 'Get Started',
                        type: 'submit',
                        size: 'large',
                    })}

                    <small>
                        By clicking “Get started”, you agree to our
                        ${link(context, {
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
};
