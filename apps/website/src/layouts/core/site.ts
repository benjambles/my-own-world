import '@benjambles/mow-ui/components/fixed-header/fixed-header.js';
import '@benjambles/mow-ui/components/mega-menu/labelled-list.js';
import '@benjambles/mow-ui/components/mega-menu/mega-menu.js';
import '@benjambles/mow-ui/components/mow-action/mow-action.js';
import '@benjambles/mow-ui/components/mow-dialog/mow-dialog.js';
import '@benjambles/mow-ui/components/site-footer/site-footer.js';
import '@benjambles/mow-ui/components/skip-links/skip-links.js';
import '@benjambles/mow-ui/components/view-lock/view-lock.js';
import '../../static/js/components/forms/login.js';
import '../../static/js/components/forms/user.js';
import '../../static/js/components/user-menu/user-menu.js';

import { mockData } from '@benjambles/mow-ui/utils.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { RenderProps } from '../../utils/render-template.js';
import styles from './site.css.js';

interface Data {
    meta: {
        title: string;
    };
    header: typeof mockData.header;
    footer: typeof mockData.footer;
}

export default function site(data: Data, page: RenderProps): RenderProps {
    return {
        assets: {
            styles: [
                { href: '/static/styles/layouts/core/site.css' },
                ...page.assets.styles,
            ],
            scripts: [
                {
                    src: '/static/js/core.js',
                    lazy: 'defer',
                    module: true,
                },
                ...page.assets.scripts,
            ],
        },
        template: html`
            <skip-links>
                <a href="#content">Skip to the content</a>
                <a href="#footer">Skip to the footer</a>
            </skip-links>
            <view-lock watchedevents="menutoggle modaltoggle">
                <with-api>
                    <with-user>
                        <fixed-header>
                            <mega-menu slot="nav-menu">
                                ${data.header.menuData.map(
                                    ({ links, title }, index) => html`
                                        <labelled-list
                                            header=${ifDefined(title)}
                                            type="${index === 0
                                                ? 'primary'
                                                : 'secondary'}"
                                        >
                                            ${links.map(
                                                ({ href, title }) => html`
                                                    <labelled-list-item href="${href}">
                                                        ${title}
                                                    </labelled-list-item>
                                                `,
                                            )}
                                        </labelled-list>
                                    `,
                                )}
                            </mega-menu>
                            <a href="/" slot="logo">Logo</a>
                            <user-menu slot="account-button"></user-menu>
                        </fixed-header>
                        <div class="${styles.contentWrapper}">
                            <div id="content">${page.template}</div>
                            <site-footer>
                                <span slot="site-name">Kh&ocirc;ra</span>
                                ${data.footer.links.map(
                                    ({ href, text }) => html`
                                        <a href="${href}" role="listitem">${text}</a>
                                    `,
                                )}
                            </site-footer>
                        </div>
                        <mow-dialog
                            triggeropeneventname="openlogin"
                            triggercloseeventname="loginsuccess"
                        >
                            <login-form ismodal></login-form>
                        </mow-dialog>
                        <mow-dialog
                            triggeropeneventname="openusermenu"
                            triggercloseeventname="logoutsuccess"
                        >
                            <user-form></user-form>
                        </mow-dialog>
                    </with-user>
                </with-api>
            </view-lock>
        `,
    };
}
