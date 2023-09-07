import {
    buttonStyles,
    dateDiff,
    formatLargestPart,
    inputStyles,
    textInput,
} from '@benjambles/mow-ui/core.js';
import { consume } from '@lit-labs/context';
import Cookies from 'js-cookie';
import { LitElement, css, html, isServer, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { paths as userPaths } from '../../../../routes/account/config.js';
import { speechBubbleStyles } from '../../styles/text.js';
import { UserData, userContext } from '../contexts/user.js';

export interface User {
    accessTokens: {
        accessToken: string;
        fingerprint: string;
        refreshToken: string;
    }[];
    createdOn: Date;
    identities: {
        hash: string;
        identifier: string;
        isDeleted: boolean;
        type: string;
        verified: boolean;
    }[];

    firstName: string;
    lastName: string;
    password: string;
    screenName: string;
}

@customElement('account-form')
export class AccountForm extends LitElement {
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

            fieldset {
                --background: white;
                border: none;
                background-color: transparent;
                background-image: linear-gradient(
                        45deg,
                        transparent 10px,
                        var(--background) 10px
                    ),
                    linear-gradient(135deg, var(--background) 0px, var(--background) 0px),
                    linear-gradient(225deg, transparent 10px, var(--background) 10px),
                    linear-gradient(315deg, var(--background) 0px, var(--background) 0px);
                background-position:
                    left bottom,
                    right bottom,
                    right top,
                    left top;
                background-repeat: no-repeat;
                background-size: 51% 51%;
                padding: 35px 20px 30px;
                margin-bottom: 50px;
            }

            legend {
                top: 30px;
                position: relative;
                font-variant: small-caps;
                font-size: 1.8rem;
                color: #6b6b6b;
                font-family: 'Oxanium';
                width: 100%;
                border-bottom: 1px solid #ddd;
            }

            hr {
                margin: 30px 0 20px;
            }

            p {
                padding: var(--_form-padding);
                font-size: 2.2rem;
                margin: 50px 0 10px;
            }

            time {
                color: rgb(157 143 245);
            }
        `,
        buttonStyles,
        inputStyles,
        speechBubbleStyles,
    ];

    @consume({ context: userContext, subscribe: true })
    @property({ attribute: false })
    userData: UserData;

    @property({ type: String, reflect: false })
    redirectUrl = '/';

    @property({ type: String, reflect: false })
    refreshCookie = 'mow-refreshtoken';

    @property({ type: String, reflect: false })
    fingerprintCookie = 'mow-fingerprint';

    private _cookiesSet() {
        return Cookies.get(this.refreshCookie) && Cookies.get(this.fingerprintCookie);
    }

    protected render() {
        if (!this._cookiesSet() && !isServer) {
            window.location.replace(this.redirectUrl);
            return;
        }

        const now = new Date();
        const createdOn = this.userData?.user?.createdOn
            ? new Date(this.userData.user.createdOn)
            : now;

        const timeBetween = dateDiff(createdOn, now);

        return this.userData?.status !== 'logged-in'
            ? nothing
            : html`
                  <p>
                      You've been charting the universe for
                      <time datetime="${createdOn.toISOString()}"
                          >${formatLargestPart(timeBetween)}</time
                      >
                  </p>
                  <form action="${userPaths.account}" method="post">
                      <fieldset>
                          <legend>Your details</legend>

                          ${textInput({
                              id: 'firstname',
                              label: 'First Name',
                              required: true,
                              type: 'text',
                              defaultText: this.userData?.user.firstName,
                          })}
                          ${textInput({
                              id: 'lastName',
                              label: 'Last Name',
                              required: true,
                              type: 'text',
                              defaultText: this.userData?.user.lastName,
                          })}
                          ${textInput({
                              id: 'screenName',
                              label: 'Code Name',
                              required: true,
                              type: 'text',
                              defaultText: this.userData?.user.screenName,
                          })}
                      </fieldset>

                      <fieldset>
                          <legend>Your credentials</legend>
                          <ul></ul>
                      </fieldset>

                      <fieldset>
                          <legend>Passphrase</legend>
                          ${textInput({
                              id: 'newpassword1',
                              label: 'New Passphrase',
                              required: false,
                              type: 'password',
                          })}
                          ${textInput({
                              id: 'newpassword2',
                              label: 'Confirm',
                              required: false,
                              type: 'password',
                          })}
                          <hr />
                          ${textInput({
                              id: 'oldpassword',
                              label: 'Old Passphrase',
                              required: false,
                              type: 'password',
                          })}
                      </fieldset>

                      <fieldset>
                          <legend>Authorisations</legend>
                      </fieldset>
                  </form>
              `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'account-form': AccountForm;
    }
}
