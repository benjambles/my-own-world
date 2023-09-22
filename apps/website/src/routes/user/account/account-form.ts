import { relativeTime, textInput } from '@benjambles/mow-ui/core.js';
import { buttonStyles, callOutStyles, inputStyles } from '@benjambles/mow-ui/styles.js';
import { composedEvent } from '@benjambles/mow-ui/utils/events.js';
import { consume } from '@lit-labs/context';
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { UserData, userContext } from '../../../layouts/components/with-user/user.js';
import { UserDetailsPayload } from '../../../layouts/components/with-user/with-user.js';
import { paths as userPaths } from '../config.js';

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

    @query('#firstName')
    private firstNameField: HTMLInputElement;

    @query('#lastName')
    private lastNameField: HTMLInputElement;

    @query('#screenName')
    private screenNameField: HTMLInputElement;

    private submitDetails(e: SubmitEvent) {
        e.preventDefault();

        const detailsEvent = composedEvent<UserDetailsPayload>('updatedetails', {
            firstName: this.firstNameField?.value,
            lastName: this.lastNameField?.value,
            screenName: this.screenNameField?.value,
        });

        this.dispatchEvent(detailsEvent);
    }

    protected render() {
        if (this.userData?.status !== 'logged-in') {
            return nothing;
        }

        return html`
            <p>
                You've been charting the universe for
                ${relativeTime(this.userData?.user?.createdOn)}
            </p>
            <form
                action="${userPaths.account}"
                method="post"
                @submit=${this.submitDetails}
            >
                <fieldset class="callout">
                    <legend>Your details</legend>
                    ${textInput({
                        id: 'screenName',
                        label: 'Code Name',
                        required: true,
                        type: 'text',
                        defaultText: this.userData?.user.screenName,
                    })}
                    ${textInput({
                        id: 'firstName',
                        label: 'First Name',
                        type: 'text',
                        defaultText: this.userData?.user.firstName ?? '',
                    })}
                    ${textInput({
                        id: 'lastName',
                        label: 'Last Name',
                        type: 'text',
                        defaultText: this.userData?.user.lastName ?? '',
                    })}
                    <button class="primary large">Identify</button>
                </fieldset>
            </form>

            <form action="${userPaths.account}" method="post">
                <fieldset class="callout">
                    <legend>Your credentials</legend>
                    <ul></ul>
                </fieldset>
            </form>

            <form action="${userPaths.account}" method="post">
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

                <button class="primary large">Identify</button>
            </form>

            <form action="${userPaths.account}" method="post">
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
