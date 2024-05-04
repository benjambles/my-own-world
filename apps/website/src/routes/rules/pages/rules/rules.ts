import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import '@benjambles/mow-ui/components/section-header/section-header.js';
import { html } from 'lit';
import { rulesHeader } from '../../components/rules-header.js';
import '../../components/rules-nav.js';
import { rulesStyles } from './rules.styles.js';

export default function (): RenderProps {
    return {
        assets: {
            inlineStyles: rulesStyles,
        },
        template: html`
            ${rulesHeader({ rootLinkText: 'Home', rootUrl: '/', sectionName: 'Rules' })}
            <main class="page--turnorder two-col-grid">
                <h1>Rules</h1>
            </main>
        `,
    };
}
