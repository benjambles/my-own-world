import classNames from 'classnames';
import type { LitTpl } from '../../../utils/templates/lit-tpl';
import baseStyles from '../../global-css/base.css.json';

export type BarLinkProps = {
    href: string;
    text: string;
    active?: boolean;
};

export const barLink: LitTpl<BarLinkProps> = (
    context,
    { text, href, active = false }: BarLinkProps
) => {
    const {
        html,
        directives: { classMap },
    } = context;
    return html`<a
        href="${href}"
        role="menuitem"
        class="${classMap({
            [baseStyles.linkBar]: true,
            [baseStyles.active]: active,
        })}"
        >${text}</a
    >`;
};
