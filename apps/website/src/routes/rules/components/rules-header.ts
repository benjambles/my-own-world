import { html } from 'lit';
import { rosterPaths } from '../../resources/roster/config.js';
import { resourcePaths } from '../../resources/config.js';
import '@benjambles/mow-ui/components/section-header/section-header.js';

interface RulesHeader {
    rootLinkText: string;
    rootUrl: string;
    sectionName: string;
}

/**
 *
 * @param props - Display data
 */
export function rulesHeader(props: RulesHeader) {
    return html`
        <section-header sectionname="${props.sectionName}">
            <a slot="root-link" href="${props.rootUrl}">${props.rootLinkText}</a>
            <a href="${rosterPaths.index}">Squad Creator</a>
            <a href="/game/missions">Missions</a>
            <a href="${resourcePaths.downloads}">Downloads</a>
        </section-header>
    `;
}
