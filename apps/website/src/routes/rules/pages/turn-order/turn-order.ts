import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import '@benjambles/mow-ui/components/section-header/section-header.js';
import { html } from 'lit';
import { rulesHeader } from '../../components/rules-header.js';
import '../../components/rules-nav.js';
import { rulesPaths } from '../../config.js';
import { turnOrderStyles } from './turn-order.styles.js';

export default function (): RenderProps {
    return {
        assets: {
            inlineStyles: turnOrderStyles,
        },
        template: html`
            ${rulesHeader({
                rootLinkText: 'Rules',
                rootUrl: rulesPaths.index,
                sectionName: 'Turn Order',
            })}
            <main class="page--turnorder two-col-grid">
                <rules-nav></rules-nav>

                <section>
                    <h1>The Turn Sequence</h1>

                    <p>
                        The turn sequence for Kh&ocirc;ra consists of two phases. The
                        first phase involves characters playing through their actions,
                        which take place 'simultaneously'. The second phase is for
                        resolving status effects (if necessary).
                    </p>

                    <h2>The action phase</h2>

                    <h2>The status phase</h2>
                </section>
            </main>
        `,
    };
}
