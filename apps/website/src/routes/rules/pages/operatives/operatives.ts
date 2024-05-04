import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import '@benjambles/mow-ui/components/section-header/section-header.js';
import { html } from 'lit';
import { rulesHeader } from '../../components/rules-header.js';
import '../../components/rules-nav.js';
import { rulesPaths } from '../../config.js';
import { operativesStyles } from './operatives.styles.js';

export default function (): RenderProps {
    return {
        assets: {
            inlineStyles: operativesStyles,
        },
        template: html`
            ${rulesHeader({
                rootLinkText: 'Rules',
                rootUrl: rulesPaths.index,
                sectionName: 'Operatives',
            })}
            <main class="page--turnorder two-col-grid">
                <rules-nav></rules-nav>

                <section>
                    <h1>Operatives</h1>
                </section>
            </main>
        `,
    };
}
