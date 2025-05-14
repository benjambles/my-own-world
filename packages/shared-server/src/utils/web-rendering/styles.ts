import CleanCSS from 'clean-css';
import { CSSResult } from 'lit';

export function toCssString(styles: CSSResult[]) {
    const input = styles.reduce((acc, cssResult) => acc + cssResult.toString(), '');
    return new CleanCSS({ level: 2 }).minify(input).styles;
}
