import {
    dateDiff,
    formatLargestPart,
} from '@benjambles/js-lib/dist/time/relative-time.js';
import { html } from 'lit';

/**
 *
 * @param props - Display data
 */
export function time(dateTime: Date, options?: Intl.DateTimeFormatOptions) {
    return html`
        <time datetime="${dateTime.toISOString()}">
            ${dateTime.toLocaleDateString('en-GB', options)}
        </time>
    `;
}

export function relativeTime(createdOn: string | number | Date) {
    const now = new Date();
    const createdDate = createdOn ? new Date(createdOn) : now;
    const timeBetween = dateDiff(createdDate, now);

    return html`
        <time datetime="${createdDate.toISOString()}">
            ${formatLargestPart(timeBetween)}
        </time>
    `;
}
