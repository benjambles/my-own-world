import { buttonStyles, inputStyles, textInput } from '@benjambles/mow-ui/core.js';
import { composedEvent } from '@benjambles/mow-ui/utils.js';
import { consume } from '@lit-labs/context';
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { speechBubbleStyles } from '../../styles/text.js';
import { UserData, userContext } from '../contexts/user.js';

@customElement('login-form')
export class LoginForm extends LitElement {
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
                overflow: auto;
                display: flex;
                flex-direction: column;
                padding: var(--_form-padding);
            }

            form button {
                margin: 30px 0 0;
            }
        `,
        inputStyles,
        buttonStyles,
        speechBubbleStyles,
    ];

    @consume({ context: userContext, subscribe: true })
    @property({ attribute: false })
    userData: UserData;

    @property({ attribute: true, type: Boolean })
    isModal = false;

    @property({ attribute: true })
    redirectUrl = '/';

    @query('#email')
    private _emailField: HTMLInputElement;

    @query('#password')
    private _passwordField: HTMLInputElement;

    private _onSubmit(e: SubmitEvent) {
        e.preventDefault();

        const loginEvent = composedEvent('userlogin', {
            identifier: this._emailField.value,
            password: this._passwordField.value,
        });

        this.dispatchEvent(loginEvent);
    }

    protected render(): unknown {
        const isLoggedIn = this.userData?.status === 'logged-in';

        if (isLoggedIn && !this.isModal) {
            window.location.replace(this.redirectUrl);
            return;
        }

        return isLoggedIn
            ? nothing
            : html`
                  <form action="/user/login" method="post" @submit=${this._onSubmit}>
                      <p class="speech">Please identify yourself to proceed.</p>
                      ${textInput({
                          id: 'email',
                          label: 'Email',
                          required: true,
                          type: 'email',
                      })}
                      ${textInput({
                          id: 'password',
                          label: 'Password',
                          required: true,
                          type: 'password',
                      })}
                      <button class="primary large">Identify</button>
                  </form>
              `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'login-form': LoginForm;
    }
}
