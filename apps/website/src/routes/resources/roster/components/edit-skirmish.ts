import { SkirmishResponse } from '@benjambles/mow-api/src/resources/skirmishes/skirmishes.js';
import '@benjambles/mow-ui/components/form-elements/glow-button/glow-button.js';
import { MowApiInstance, requestContext } from '@benjambles/mow-ui/contexts/request.js';
import { textInput } from '@benjambles/mow-ui/core.js';
import { callOutStyles, flexColToRow, inputStyles } from '@benjambles/mow-ui/styles.js';
import { consume } from '@lit/context';
import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { UserData, userContext } from '../../../../layouts/components/with-user/user.js';
import { SkirmishApi, SkirmishApiInstance } from './apis/skirmish-api.js';

@customElement('edit-skirmish')
export class EditSkirmish extends LitElement {
    private skirmishApi: SkirmishApiInstance;

    static styles = [
        inputStyles,
        callOutStyles,
        flexColToRow,
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

            glow-button {
                margin: 40px 0 0;
                --gb-btn-bg: linear-gradient(
                    90deg,
                    rgb(230 230 230),
                    rgb(255 255 255),
                    rgb(230 230 230)
                );
                --gb-btn-hover: linear-gradient(
                    90deg,
                    rgb(230 230 230 / 70%),
                    rgb(255 255 255 / 70%),
                    rgb(230 230 230 / 70%)
                );
            }

            fieldset {
                --co-bg-color: white;
                --col-to-row-gap: 20px;
                border: none;
                padding: var(--_form-padding);
                margin-bottom: 6rem;
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

            .flex-container {
                flex: 1 1 50%;
            }

            .flex-container:last-of-type {
                text-transform: capitalize;
            }

            .label {
                display: inline-block;
                width: 130px;
            }

            .detail-item {
                border-bottom: 1px dashed #999;
            }

            @media screen and (min-width: 992px) {
                fieldset {
                    --col-to-row-gap: 50px;
                }

                .flex-container:last-of-type {
                    padding-block: 25px;
                }
            }
        `,
    ];

    @consume({ context: requestContext, subscribe: true })
    @property({ attribute: false })
    accessor requestManager: MowApiInstance;

    @consume({ context: userContext, subscribe: true })
    @property({ attribute: false })
    accessor userData: UserData;

    @state()
    accessor skirmishData: SkirmishResponse;

    @property()
    accessor skirmishId: string;

    @property()
    accessor skirmishCreatedOn: string;

    @property()
    accessor skirmishDescription: string;

    @property()
    accessor skirmishName: string;

    @property()
    accessor skirmishPoints: string;

    @query('form')
    accessor formElem: HTMLFormElement;

    connectedCallback(): void {
        super.connectedCallback();

        if (this.requestManager) {
            this.skirmishApi = new SkirmishApi();
            this.skirmishApi.addManager(this.requestManager);
        }
    }

    fetchSkirmishData = async () => {
        if (!this.requestManager && !this.userData?.tokens.access) {
            return;
        }

        this.skirmishData = await this.skirmishApi.call(
            'getSkirmishById',
            {
                params: { skirmishId: this.skirmishId },
            },
            this.userData.tokens.access,
        );
    };

    updated(changedProperties: PropertyValues<this>): void {
        if (
            changedProperties.has('userData') &&
            this.userData.status === 'logged-in' &&
            this.skirmishId
        ) {
            this.fetchSkirmishData();
        }
    }

    private async onSubmit(e: SubmitEvent) {
        e.preventDefault();

        const formData = new FormData(this.formElem);

        if (!this.skirmishApi) {
            throw new Error('No request manager registered');
        }

        if (!this.userData) {
            throw new Error('You must be logged in');
        }

        try {
            const result = await this.skirmishApi.call(
                'updateSkirmishById',
                {
                    params: {
                        skirmishId: this.skirmishData._id,
                    },
                    body: {
                        description: formData.get('description') as string,
                        name: formData.get('name') as string,
                    },
                },
                this.userData.tokens.access,
            );

            this.skirmishData = result;
        } catch (e) {
            // Render errors
        }
    }

    protected render() {
        const id = this.skirmishData?._id ?? this.skirmishId;
        const name = this.skirmishData?.name ?? this.skirmishName;
        const description = this.skirmishData?.description ?? this.skirmishDescription;
        const createdOn = new Date(
            this.skirmishData?.createdOn ?? this.skirmishCreatedOn,
        );
        const points = this.skirmishData?.points ?? this.skirmishPoints;
        const game = this.skirmishData?.game ?? { name: '', version: '' };

        return html`
            <form action="/roster/edit/${id}" method="post" @submit=${this.onSubmit}>
                <fieldset class="callout">
                    <legend>Squad Information</legend>

                    <div class="col-to-row">
                        <div class="flex-container">
                            ${textInput({
                                id: 'name',
                                label: 'Squad Name',
                                required: true,
                                type: 'text',
                                defaultText: name,
                            })}

                            <label for="description">Notes</label>
                            <div class="input-wrapper">
                                <div class="text-input">
                                    <textarea id="description" name="description">
${description}</textarea
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="flex-container">
                            ${detailItems([
                                ['Created On', createdOn.toLocaleString()],
                                ['Points', points],
                                ['Game', `${game.name} v${game.version}`],
                                ['Type', this.skirmishData?.type],
                            ])}
                        </div>
                    </div>

                    <!-- TODO: Render Characters/Drones etc and add panel for drag/drop - Ben Allen -->
                    <slot></slot>

                    <glow-button class="large">Submit</glow-button>
                </fieldset>
            </form>
        `;
    }
}

function detailItems(items: [string, string | number][]) {
    return items.map(
        ([label, value]) => html`
            <div class="detail-item"><span class="label">${label}</span> ${value}</div>
        `,
    );
}

declare global {
    interface HTMLElementTagNameMap {
        'edit-skirmish': EditSkirmish;
    }
}
