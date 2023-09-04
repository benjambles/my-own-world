import { buttonStyles, inputStyles, textInput } from '@benjambles/mow-ui/core.js';
import { composedEvent } from '@benjambles/mow-ui/utils.js';
import { consume } from '@lit-labs/context';
import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { UserData, userContext } from '../contexts/user.js';

@customElement('login-form')
export class LoginForm extends LitElement {
    static styles = [
        css`
            * {
                box-sizing: border-box;
            }

            form {
                overflow: auto;
                display: flex;
                flex-direction: column;
            }

            form button {
                margin: 30px 0 0;
            }
        `,
        inputStyles,
        buttonStyles,
    ];

    @consume({ context: userContext, subscribe: true })
    @property({ attribute: false })
    userData: UserData;

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
        return this.userData?.status === 'logged-in'
            ? null
            : html`
                  <form action="/user/login" method="post" @submit=${this._onSubmit}>
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
                      <button class="primary large">Get Started</button>
                  </form>
              `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'login-form': LoginForm;
    }
}
