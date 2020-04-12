import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { html, render } from 'lit-html';
import '../../../static/styles/utils/tests.css';
import { CLIENT_CONTEXT } from '../../../utils/client-context';
import { Link } from './link';

export default {
    title: 'Links',
    decorators: [withKnobs, storyWrapper],
};

export function LightMode() {
    return html`
        <div class="story-variant">
            <h3>Inactive</h3>
            ${sampleBox(Link(CLIENT_CONTEXT, { text: 'Go home', href: '/' }), 'sample')}
            ${codeBox("Link(context, { text: 'Go home', href: '/' })")}
        </div>

        <div class="story-variant">
            <h3>Active</h3>
            ${sampleBox(
                Link(CLIENT_CONTEXT, { text: 'Go home', href: '/', display: { active: true } }),
                'sample'
            )}
            ${codeBox("Link(context, { text: 'Go home', href: '/', display: { active: true } })")}
        </div>

        <div class="story-variant">
            <h3>Underlined</h3>
            ${sampleBox(
                Link(CLIENT_CONTEXT, { text: 'Go home', href: '/', display: { underlined: true } }),
                'sample'
            )}
            ${codeBox(
                "Link(context, { text: 'Go home', href: '/', display: { underlined: true } })"
            )}
        </div>

        <div class="story-variant">
            <h3>Bold</h3>
            ${sampleBox(
                Link(CLIENT_CONTEXT, { text: 'Go home', href: '/', display: { bold: true } }),
                'sample'
            )}
            ${codeBox("Link(context, { text: 'Go home', href: '/', display: { bold: true } })")}
        </div>

        <div class="story-variant">
            <h3>Bar</h3>
            ${sampleBox(
                Link(CLIENT_CONTEXT, { text: 'Go home', href: '/', display: { bar: true } }),
                'sample'
            )}
            ${codeBox("Link(context, { text: 'Go home', href: '/', display: { bar: true } })")}
        </div>

        <div class="story-variant">
            <h3>Bar active</h3>
            ${sampleBox(
                Link(CLIENT_CONTEXT, {
                    text: 'Go home',
                    href: '/',
                    display: { bar: true, active: true },
                }),
                'sample'
            )}
            ${codeBox(
                "Link(context, { text: 'Go home', href: '/', display: { bar: true, active:true } })"
            )}
        </div>
    `;
}

export function DarkMode() {
    return html`
        <div class="story-variant">
            <h3>Inactive</h3>
            ${sampleBox(
                Link(CLIENT_CONTEXT, { text: 'Go home', href: '/', display: { light: true } }),
                'sample',
                'box--dark'
            )}
            ${codeBox("Link(context, { text: 'Go home', href: '/', display: { light: true } })")}
        </div>

        <div class="story-variant">
            <h3>Active</h3>
            ${sampleBox(
                Link(CLIENT_CONTEXT, {
                    text: 'Go home',
                    href: '/',
                    display: { active: true, light: true },
                }),
                'sample',
                'box--dark'
            )}
            ${codeBox(
                "Link(context, { text: 'Go home', href: '/', display: { active: true, light:true } })"
            )}
        </div>

        <div class="story-variant">
            <h3>Underlined</h3>
            ${sampleBox(
                Link(CLIENT_CONTEXT, {
                    text: 'Go home',
                    href: '/',
                    display: { underlined: true, light: true },
                }),
                'sample',
                'box--dark'
            )}
            ${codeBox(
                "Link(context, { text: 'Go home', href: '/', display: { light: true, underlined: true } })"
            )}
        </div>

        <div class="story-variant">
            <h3>Bold</h3>
            ${sampleBox(
                Link(CLIENT_CONTEXT, {
                    text: 'Go home',
                    href: '/',
                    display: { bold: true, light: true },
                }),
                'sample',
                'box--dark'
            )}
            ${codeBox(
                "Link(context, { text: 'Go home', href: '/', display: { bold: true, light: true } })"
            )}
        </div>

        <div class="story-variant">
            <h3>Bar</h3>
            ${sampleBox(
                Link(CLIENT_CONTEXT, {
                    text: 'Go home',
                    href: '/',
                    display: { bar: true, light: true },
                }),
                'sample',
                'box--dark'
            )}
            ${codeBox(
                "Link(context, { text: 'Go home', href: '/', display: { bar: true, light: true } })"
            )}
        </div>

        <div class="story-variant">
            <h3>Bar active</h3>
            ${sampleBox(
                Link(CLIENT_CONTEXT, {
                    text: 'Go home',
                    href: '/',
                    display: { bar: true, active: true, light: true },
                }),
                'sample',
                'box--dark'
            )}
            ${codeBox(
                "Link(context, { text: 'Go home', href: '/', display: { bar: true, active:true, light:true } });"
            )}
        </div>
    `;
}

export function Playground() {
    return html`
        <div class="story-variant">
            <h3>Light mode Link</h3>
            ${sampleBox(
                Link(CLIENT_CONTEXT, {
                    text: text('text', 'Click here', 'Attributes'),
                    href: text('href', '/', 'Attributes'),
                    display: {
                        active: boolean('display.active', false, 'Display Props'),
                        bar: boolean('display.bar', false, 'Display Props'),
                        bold: boolean('display.bold', false, 'Display Props'),
                        underlined: boolean('display.underlined', false, 'Display Props'),
                    },
                }),
                'sample',
                ''
            )}
        </div>
        <div class="story-variant">
            <h3>Dark mode link</h3>
            ${sampleBox(
                Link(CLIENT_CONTEXT, {
                    text: text('text', 'Click here', 'Attributes'),
                    href: text('href', '/', 'Attributes'),
                    display: {
                        active: boolean('display.active', false, 'Display Props'),
                        bar: boolean('display.bar', false, 'Display Props'),
                        bold: boolean('display.bold', false, 'Display Props'),
                        underlined: boolean('display.underlined', false, 'Display Props'),
                        light: true,
                    },
                }),
                'sample',
                'box--dark'
            )}
        </div>
    `;
}

function storyWrapper(storyFn) {
    const container = document.createElement('div');
    container.classList.add('test-wrapper');
    render(
        html`
            <article>
                <header>
                    <h1>Links</h1>
                    <p>
                        The link component is a wrapper around all &lt;a&gt; tags used on the My Own
                        World platform. This allows us to get consistent behaviour across all
                        navigation on the site.
                    </p>
                    <p>
                        Use the Knobs panel in the playground to play around with the settings for
                        the Link component.
                    </p>
                </header>
                <section>
                    <h2>Display Variants</h2>
                    ${storyFn()}
                </section>
            </article>
        `,
        container
    );
    return container;
}

function sampleBox(component, caption, cssClass = 'box--light') {
    return html`
        <figure class="box ${cssClass}">
            ${component} ${caption ? html`<figcaption>${caption}</figcaption>` : ''}
        </figure>
    `;
}

function codeBox(snippet) {
    return html`
        <details class="view-code">
            <summary>View the code</summary>
            <figure class="box box--code">
                <code>${snippet}</code>
                <figcaption>code</figcaption>
            </figure>
        </details>
    `;
}
