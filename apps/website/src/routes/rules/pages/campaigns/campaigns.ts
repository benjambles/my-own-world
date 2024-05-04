import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import '@benjambles/mow-ui/components/section-header/section-header.js';
import { html } from 'lit';
import { rulesHeader } from '../../components/rules-header.js';
import '../../components/rules-nav.js';
import { rulesPaths } from '../../config.js';
import { campaignsStyles } from './campaigns.styles.js';

export default function (): RenderProps {
    return {
        assets: {
            inlineStyles: campaignsStyles,
        },
        template: html`
            ${rulesHeader({
                rootLinkText: 'Campaigns',
                rootUrl: rulesPaths.index,
                sectionName: 'Turn Order',
            })}
            <main class="page--turnorder two-col-grid">
                <rules-nav></rules-nav>

                <section>
                    <h1>Campaigns</h1>
                </section>
            </main>
        `,
    };
}
