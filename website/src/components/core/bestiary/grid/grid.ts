import { clientContext, clientResult } from '../../../../utils/templates/client-context';
import { serverContext, serverResult } from '../../../../utils/templates/server-context';
import { lazyStylesheet } from '../../../utils/lazy-stylesheet';

export function actionGrid(context: clientContext): clientResult;
export function actionGrid(context: serverContext): serverResult;
export function actionGrid(context) {
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
}

export function arm(context: clientContext, count: number): clientResult;
export function arm(context: serverContext, count: number): serverResult;
export function arm(context, count) {
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
}
