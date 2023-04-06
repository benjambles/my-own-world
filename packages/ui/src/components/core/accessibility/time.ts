import { html } from 'lit';

/**
 *
 * @param props - Display data
 */
export function time(dateTime: Date, options?: Intl.DateTimeFormatOptions) {
    return html`<time datetime="${dateTime.toISOString()}">
        ${dateTime.toLocaleDateString('en-GB', options)}
    </time>`;
}
