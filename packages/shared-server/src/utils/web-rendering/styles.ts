import CleanCSS from 'clean-css';
import { CSSResult } from 'lit';

export function toCssString(styles: CSSResult[], nodeEnv: string) {
    const isDev = nodeEnv === 'development';
    const input = styles.reduce((acc, cssResult) => acc + cssResult.toString(), '');
    return new CleanCSS({ level: 2, format: isDev ? 'beautify' : undefined }).minify(
        input,
    ).styles;
}
