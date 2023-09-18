import { link, textInput } from '@benjambles/mow-ui/core.js';
import {
    buttonStyles,
    callOutStyles,
    inputStyles,
    speechBubbleStyles,
} from '@benjambles/mow-ui/styles.js';
import { composedEvent } from '@benjambles/mow-ui/utils.js';
import { consume } from '@lit-labs/context';
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { paths as userPaths } from '../../../../routes/account/config.js';
import { UserData, userContext } from '../contexts/user.js';
import { UserRegistrationPayload } from '../with-user/with-user.js';

@customElement('join-form')
export class JoinForm extends LitElement {
    static styles = [
        buttonStyles,
        inputStyles,
        callOutStyles,
        speechBubbleStyles,
        css`
            * {
                box-sizing: border-box;
            }

            :host {
                --_form-padding: var(--form-padding);
                display: block;
            }

            form {
                display: flex;
                flex-direction: column;
                padding: var(--_form-padding);
                overflow: auto;
                color: var(--shade-4);
            }

            form small {
                display: block;
                margin-top: 5px;
                font-size: 1.2rem;
            }

            form button {
                margin: 30px 0 25px;
            }
        `,
    ];

    @consume({ context: userContext, subscribe: true })
    @property({ attribute: false })
    userData: UserData;

    private onSubmit(e: SubmitEvent) {
        e.preventDefault();

        const registerEvent = composedEvent<UserRegistrationPayload>('userjoin', {
            identifier: this.emailField.value,
            password: this.passwordField.value,
            screenName: this.screenNameField.value,
        });

        this.dispatchEvent(registerEvent);
    }

    @query('#join-email')
    private emailField: HTMLInputElement;

    @query('#join-password')
    private passwordField: HTMLInputElement;

    @query('#join-screename')
    private screenNameField: HTMLInputElement;

    @property()
    redirectUrl = '/';

    protected render() {
        const isLoggedIn = this.userData?.status === 'logged-in';

        if (isLoggedIn) {
            window.location.replace(this.redirectUrl);
            return nothing;
        }

        return html`
            <form action="${userPaths.signup}" method="post" @submit=${this.onSubmit}>
                <div class="speech callout">
                    <p>
                        Oh, a new hire? Before you start on your adventures with us the
                        agency needs a few details from you. In return you'll get access
                        to our tools that help you manage your crews and plan your
                        adventures.
                    </p>

                    <p>Now, what should we call you Explorer?</p>
                </div>

                ${textInput({
                    label: 'Code name',
                    id: 'join-screenname',
                    name: 'screenname',
                    required: true,
                })}

                <p class="speech callout">
                    Perfect, thanks ${this.screenNameField?.value || 'Explorer'}. Now,
                    where should we contact you?
                </p>

                ${textInput({
                    label: 'Email',
                    id: 'join-email',
                    name: 'email',
                    type: 'email',
                    required: true,
                })}

                <p class="speech callout">
                    Got it, thanks. Finally, you're probably already familiar with this
                    process, but we'll need a password from you so that we can prove you
                    are who you say you are.
                </p>

                ${textInput({
                    label: 'Pass code',
                    id: 'join-password',
                    name: 'password',
                    type: 'password',
                    required: true,
                })}

                <div class="speech callout">
                    <p>
                        Great. Infiltrators are everywhere - so keep that secure and try
                        not to use it anywhere else.
                    </p>

                    <p>
                        I think that's us all done - if you're happy with your answers use
                        the confirm button below.
                    </p>
                </div>

                <button class="primary large">Confirm</button>

                <small>
                    By clicking “Confirm”, you agree to our
                    ${link({
                        href: '/terms',
                        text: 'Terms of Service and Privacy Statement',
                        display: { underlined: true },
                    })}.
                    We’ll occasionally send you account related emails.
                </small>
            </form>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'join-form': JoinForm;
    }
}
