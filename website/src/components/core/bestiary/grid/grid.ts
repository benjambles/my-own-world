import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import { lazyStylesheet } from '../../../utils/lazy-stylesheet';

export const actionGrid: LitTpl<undefined> = context => {
    const { html } = context;

    return html`
        <!-- ${lazyStylesheet(context, '/styles/components/bestiary/grid.css')} -->
        <ol class="grid">
            <li>
                <div class="hex centre">
                    <span><span class="label">Centre</span></span>
                </div>
                <ol>
                    ${[1, 2, 3, 4, 5, 6].map(count => arm(context, count))}
                </ol>
            </li>
        </ol>
    `;
};

const arm: LitTpl<number> = (context, count: number) => {
    const { html } = context;

    return html`
        <li class="arm arm-${count}">
            <ol class="rows">
                <li>
                    <ol class="row">
                        <li class="hex">
                            <span><span class="label">Item 1</span></span>
                        </li>
                    </ol>
                </li>
                <li>
                    <ol class="row">
                        <li class="hex">
                            <span><span class="label">Item 2</span></span>
                        </li>
                        <li class="hex">
                            <span><span class="label">Item 3</span></span>
                        </li>
                        <li class="hex">
                            <span><span class="label">Item 4</span></span>
                        </li>
                    </ol>
                </li>
                <li>
                    <ol class="row">
                        <li class="hex">
                            <span><span class="label">Item 5</span></span>
                        </li>
                        <li class="hex">
                            <span><span class="label">Item 6</span></span>
                        </li>
                        <li class="hex">
                            <span><span class="label">Item 7</span></span>
                        </li>
                        <li class="hex">
                            <span><span class="label">Item 8</span></span>
                        </li>
                        <li class="hex">
                            <span><span class="label">Item 9</span></span>
                        </li>
                    </ol>
                </li>
            </ol>
        </li>
    `;
};
