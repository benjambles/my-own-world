import { textInput } from '@benjambles/mow-ui/core.js';
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
import { UserData, userContext } from '../contexts/user.js';
import { UserLoginPayload } from '../with-user/with-user.js';

@customElement('login-form')
export class LoginForm extends LitElement {
    static styles = [
        inputStyles,
        buttonStyles,
        speechBubbleStyles,
        callOutStyles,
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
            }

            form button {
                margin: 30px 0 0;
            }
        `,
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

        const loginEvent = composedEvent<UserLoginPayload>('userlogin', {
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
                      <p class="speech callout">Please identify yourself to proceed.</p>
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
