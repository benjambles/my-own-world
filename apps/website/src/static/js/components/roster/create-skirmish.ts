import { MowApiInstance, requestContext } from '@benjambles/mow-ui/contexts/request.js';
import { textInput } from '@benjambles/mow-ui/core.js';
import { buttonStyles, callOutStyles, inputStyles } from '@benjambles/mow-ui/styles.js';
import { consume } from '@lit-labs/context';
import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { GameApi, GameApiInstance } from '../contexts/game.js';

@customElement('create-skirmish')
export class CreateSkirmish extends LitElement {
    private gameApi: GameApiInstance;

    static styles = [
        inputStyles,
        buttonStyles,
        callOutStyles,
        css`
            * {
                box-sizing: border-box;
            }

            :host {
                --_form-padding: var(--form-padding, 35px 20px 30px);
                --_width: var(--cs-width, 100%);
                width: var(--_width);
                display: block;
            }

            form {
                display: flex;
                flex-direction: column;

                overflow: auto;
                color: var(--shade-4);
            }

            form button {
                margin: 30px 0 0;
            }

            fieldset {
                border: none;
                padding: var(--_form-padding);
            }

            legend {
                width: 100%;
                border-bottom: 1px solid #333;
                position: relative;
                top: 30px;
                color: #6b6b6b;
                font-family: 'Oxanium';
                font-size: 1.8rem;
                font-variant: small-caps;
            }
        `,
    ];

    @consume({ context: requestContext })
    @property({ attribute: false })
    requestManager: MowApiInstance;

    @property()
    rosterUrl: string = '';

    @property({ type: Boolean })
    isModal = false;

    @query('form')
    formElem: HTMLFormElement;

    connectedCallback(): void {
        super.connectedCallback();

        if (this.requestManager) {
            this.gameApi = new GameApi();
            this.gameApi.addManager(this.requestManager);
        }
    }

    private async onSubmit(e: SubmitEvent) {
        e.preventDefault();

        const formData = new FormData(this.formElem);

        if (!this.gameApi) {
            throw new Error('No request manager registered');
        }

        try {
            const result = await this.gameApi.call('createGame', {
                body: {
                    description: formData.get('description') as string,
                    game: 'khora',
                    name: formData.get('name') as string,
                    points: 0,
                    type: 'skirmish',
                },
            });

            window.location.replace(this.rosterUrl.replace(':rosterId', result._id));
        } catch (e) {
            // Render errors
        }
    }

    protected render() {
        return html`
            <form action="/game/create-skirmish" method="post" @submit=${this.onSubmit}>
                <fieldset>
                    <legend>Mission Information</legend>

                    ${textInput({
                        id: 'name',
                        label: 'Squad Name',
                        required: true,
                        type: 'text',
                    })}

                    <label for="description">Notes</label>
                    <div class="input-wrapper">
                        <div class="text-input">
                            <textarea id="description" name="description"></textarea>
                        </div>
                    </div>

                    <button class="primary large">Submit</button>
                </fieldset>
            </form>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'create-skirmish': CreateSkirmish;
    }
}
