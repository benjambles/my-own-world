import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import '@benjambles/mow-ui/components/section-header/section-header.js';
import { html } from 'lit';
import { rulesHeader } from '../../components/rules-header.js';
import '../../components/rules-nav.js';
import { rulesPaths } from '../../config.js';
import { skirmishesStyles } from './skirmishes.styles.js';

export default function (): RenderProps {
    return {
        assets: {
            inlineStyles: skirmishesStyles,
        },
        template: html`
            ${rulesHeader({
                rootLinkText: 'Rules',
                rootUrl: rulesPaths.index,
                sectionName: 'Skirmishes',
            })}
            <main class="page--turnorder two-col-grid">
                <rules-nav></rules-nav>

                <section>
                    <h1>Skirmishes</h1>
                </section>
            </main>
        `,
    };
}
