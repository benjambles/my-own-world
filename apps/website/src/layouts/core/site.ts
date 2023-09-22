import {
    RenderProps,
    mergeRenderAssets,
} from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import '@benjambles/mow-ui/components/fixed-header/fixed-header.js';
import '@benjambles/mow-ui/components/mega-menu/labelled-list.js';
import '@benjambles/mow-ui/components/mega-menu/mega-menu.js';
import '@benjambles/mow-ui/components/mow-dialog/mow-dialog.js';
import '@benjambles/mow-ui/components/site-footer/site-footer.js';
import '@benjambles/mow-ui/components/skip-links/skip-links.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { paths as userPaths } from '../../routes/user/config.js';
import '../components/auth-button/auth-button.js';
import styles from './site.styles.js';

type Link = { href: string; text: string };
type LinkList = { links: Link[]; title?: string };

export default function site(
    page: RenderProps,
    isProtected: Boolean = false,
): RenderProps {
    const footerLinks: Link[] = [
        { text: 'Terms', href: '/terms' },
        { text: 'Privacy', href: '/privacy' },
        { text: 'Accessibility', href: '/accessibility' },
    ];

    const menuLinks: LinkList[] = [
        {
            links: [
                { href: '/', text: 'Home' },
                { href: '/setting', text: 'The Setting' },
                { href: '/rules', text: 'The Rules' },
                { href: '/downloads', text: 'Downloads' },
                { href: '/tools', text: 'Tools' },
                { href: '/faq', text: 'FAQ' },
                { href: '/contact', text: 'Contact Us' },
            ],
        },
        {
            title: 'The rules',
            links: [
                { href: '/rules/quick-start', text: 'Quick Start' },
                { href: '/rules/turn-sequence', text: 'Turn sequence' },
                { href: '/rules/operatives', text: 'Operatives' },
                { href: '/rules/skirmishes', text: 'Skirmishes' },
                { href: '/rules/campaigns', text: 'Campaigns' },
            ],
        },
        {
            title: 'The Setting',
            links: [
                { href: '/explore', text: 'The Universe' },
                { href: '/explore/timeline', text: 'The timeline' },
                { href: '/explore/factions', text: 'The factions' },
                { href: '/explore/locations', text: 'The locations' },
            ],
        },
    ];

    return {
        assets: mergeRenderAssets(
            {
                inlineStyles: [styles],
                scripts: [
                    {
                        src: '/static/js/lit.js',
                        lazy: 'defer',
                        module: true,
                    },
                    {
                        src: '/static/js/core.bundle.js',
                        lazy: 'defer',
                        module: true,
                    },
                    {
                        src: '/static/js/text.styles.js',
                        lazy: 'defer',
                        module: true,
                    },
                ],
            },
            page.assets,
        ),
        template: html`
            <skip-links>
                <a href="#content">Skip to the content</a>
                <a href="#footer">Skip to the footer</a>
            </skip-links>
            <view-lock watchedevents="menutoggle modaltoggle">
                <with-api apihost="http://localhost:3000" apipathprefix="/api/v1">
                    <with-user
                        ?protectedpage=${isProtected}
                        redirectUrl=${userPaths.login}
                    >
                        <fixed-header>
                            <mega-menu slot="nav-menu">
                                ${renderMenuContents(menuLinks)}
                            </mega-menu>
                            <a href="/" slot="logo">Logo</a>
                            <auth-button slot="account-button"></auth-button>
                        </fixed-header>
                        <div class="content-wrapper">
                            <div id="content">${page.template}</div>
                            <site-footer>
                                <span slot="site-name">Kh&ocirc;ra</span>
                                ${footerLinks.map(
                                    ({ href, text }) => html`
                                        <a href="${href}" role="listitem">${text}</a>
                                    `,
                                )}
                            </site-footer>
                        </div>
                        <mow-dialog
                            triggeropeneventname="openlogin"
                            triggercloseeventname="closelogin"
                        >
                            <login-form ismodal></login-form>
                        </mow-dialog>
                        <mow-dialog
                            triggeropeneventname="openusermenu"
                            triggercloseeventname="closeusermenu"
                        >
                            <user-menu></user-menu>
                        </mow-dialog>
                    </with-user>
                </with-api>
            </view-lock>
        `,
    };
}

function renderMenuContents(linkLists: LinkList[]) {
    return html`${linkLists.map(
        ({ links, title }, index) => html`
            <labelled-list
                header=${ifDefined(title)}
                type="${index === 0 ? 'primary' : 'secondary'}"
            >
                ${links.map(
                    ({ href, text }) => html`
                        <labelled-list-item href="${href}"> ${text} </labelled-list-item>
                    `,
                )}
            </labelled-list>
        `,
    )}`;
}
