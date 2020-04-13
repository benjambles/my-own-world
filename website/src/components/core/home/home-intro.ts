import { clientContext, clientResult } from '../../../utils/client-context';
import { LazyStylesheet } from '../../utils/lazy-stylesheet';
import { serverContext, serverResult } from '../../../utils/server-context';
import { PrimaryButton } from '../buttons/primary-button';
import { InputBox } from '../form-elements/input-box';
import { Link } from '../links/link';

export function HomeIntro(context: clientContext): clientResult;
export function HomeIntro(context: serverContext): serverResult;
export function HomeIntro(context) {
    const { html } = context;

    return html`
        ${LazyStylesheet(context, '/styles/components/home/home-intro.css')}
        <section class="home-intro">
            <div class="container--slim">
                <div class="home-intro__text">
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
                    ${InputBox(context, { label: 'Username', id: 'username' })}
                    ${InputBox(context, { label: 'Email', id: 'email', type: 'email' })}
                    ${InputBox(context, { label: 'Password', id: 'password', type: 'password' })}
                    <small>
                        Passwords should be secure, don't use one from another site.
                        ${Link(context, {
                            href: '/password-security',
                            text: 'Learn more',
                            display: { underlined: true },
                        })}.
                    </small>

                    ${PrimaryButton(context, { text: 'Get Started', type: 'submit' })}

                    <small>
                        By clicking “Get started”, you agree to our
                        ${Link(context, {
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
