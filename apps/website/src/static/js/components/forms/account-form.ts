import {
    dateDiff,
    formatLargestPart,
} from '@benjambes/js-lib/dist/time/relative-time.js';
import { textInput } from '@benjambles/mow-ui/core.js';
import { buttonStyles, callOutStyles, inputStyles } from '@benjambles/mow-ui/styles.js';
import { consume } from '@lit-labs/context';
import Cookies from 'js-cookie';
import { LitElement, css, html, isServer, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { paths as userPaths } from '../../../../routes/account/config.js';
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

            fieldset {
                --co-bg-color: white;
                border: none;
                padding: 35px 20px 30px;
                margin-bottom: 50px;
            }

            legend {
                width: 100%;
                border-bottom: 1px solid #ddd;
                position: relative;
                top: 30px;
                color: #6b6b6b;
                font-family: 'Oxanium';
                font-size: 1.8rem;
                font-variant: small-caps;
            }

            hr {
                margin: 30px 0 20px;
            }

            p {
                padding: var(--_form-padding);
                margin: 50px 0 10px;
                font-size: 2.2rem;
            }

            time {
                color: rgb(157 143 245);
            }
        `,
        buttonStyles,
        inputStyles,
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
                      <fieldset class="callout">
                          <legend>Your details</legend>
                          ${textInput({
                              id: 'screenName',
                              label: 'Code Name',
                              required: true,
                              type: 'text',
                              defaultText: this.userData?.user.screenName,
                          })}
                      </fieldset>

                      <fieldset class="callout">
                          <legend>Your credentials</legend>
                          <ul></ul>
                      </fieldset>

                      <fieldset class="callout">
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

                      <fieldset class="callout">
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
