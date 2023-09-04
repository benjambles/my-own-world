import { buttonStyles, inputStyles, link, textInput } from '@benjambles/mow-ui/core.js';
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('join-form')
export class JoinForm extends LitElement {
    static styles = [
        css`
            * {
                box-sizing: border-box;
            }

            form {
                background-image: linear-gradient(
                        45deg,
                        transparent 10px,
                        var(--shade-1) 10px
                    ),
                    linear-gradient(135deg, var(--shade-1) 0, var(--shade-1) 0),
                    linear-gradient(225deg, transparent 10px, var(--shade-1) 10px),
                    linear-gradient(315deg, var(--shade-1) 0, var(--shade-1) 0px);
                background-position:
                    bottom left,
                    bottom right,
                    top right,
                    top left;
                background-size: 51% 51%;
                background-repeat: no-repeat;
                padding: 20px;
                border-radius: 0;
                color: var(--shade-4);
                overflow: auto;
                display: flex;
                flex-direction: column;
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
    ];

    private _onSubmit(e: SubmitEvent) {
        e.preventDefault();
    }

    protected render(): unknown {
        return html`
            <form action="/join" method="post" @submit=${this._onSubmit}>
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

                <button class="primary large">Get Started</button>

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
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'join-form': JoinForm;
    }
}
