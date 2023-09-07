import { buttonStyles, inputStyles, link, textInput } from '@benjambles/mow-ui/core.js';
import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { paths as userPaths } from '../../../../routes/account/config.js';
import { speechBubbleStyles } from '../../styles/text.js';

@customElement('join-form')
export class JoinForm extends LitElement {
    static styles = [
        css`
            * {
                box-sizing: border-box;
            }

            :host {
                --_form-padding: var(--form-padding);
                display: block;
            }

            form {
                color: var(--shade-4);
                overflow: auto;
                display: flex;
                flex-direction: column;
                padding: var(--_form-padding);
            }

            form small {
                display: block;
                font-size: 1.2rem;
                margin-top: 5px;
            }

            form button {
                margin: 30px 0 25px;
            }
        `,
        buttonStyles,
        inputStyles,
        speechBubbleStyles,
    ];

    private _onSubmitSignup(e: SubmitEvent) {
        e.preventDefault();
    }

    private _onSubmitLogin(e: SubmitEvent) {
        e.preventDefault();
    }

    @query('#join-screename')
    @property({ attribute: false })
    private _screename: HTMLInputElement;

    @query('#join-email')
    @property({ attribute: false })
    private _email: HTMLInputElement;

    @query('#join-password')
    @property({ attribute: false })
    private _password: HTMLInputElement;

    protected render(): unknown {
        return html`
            <form
                action="${userPaths.signup}"
                method="post"
                @submit=${this._onSubmitSignup}
            >
                <div class="speech">
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

                <p class="speech">
                    Perfect, thanks ${this._screename?.value || 'Explorer'}. Now, where
                    should we contact you?
                </p>

                ${textInput({
                    label: 'Email',
                    id: 'join-email',
                    name: 'email',
                    type: 'email',
                    required: true,
                })}

                <p class="speech">
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

                <div class="speech">
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
