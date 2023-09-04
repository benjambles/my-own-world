import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { storyRenderer } from '../../utils/storybook/story-renderer.js';
import '../mega-menu/labelled-list.js';
import '../mega-menu/mega-menu.js';
import './fixed-header.js';

export default {
    title: 'Furniture/Fixed Header',
    parameters: {
        componentSubtitle: 'Fixed header',
    },
    decorators: [storyRenderer],
} as Meta;

export const base = () => {
    return html`
        <fixed-header>
            <a href="/" slot="logo">Logo</a>
            <div slot="account-menu">
                <a href="/join">Login</a> | <a href="/sign-in">Sign in</a>
            </div>
            <mega-menu slot="nav-menu">
                <labelled-list type="primary">
                    <labelled-list-item href="/explore">Link 1</labelled-list-item>
                    <labelled-list-item href="/explore">Link 2</labelled-list-item>
                    <labelled-list-item href="/explore">Link 3</labelled-list-item>
                    <labelled-list-item href="/explore">Link 4</labelled-list-item>
                </labelled-list>

                <labelled-list type="secondary" header="Sub Section">
                    <labelled-list-item href="/explore">Link 1</labelled-list-item>
                    <labelled-list-item href="/explore">Link 2</labelled-list-item>
                    <labelled-list-item href="/explore">Link 3</labelled-list-item>
                    <labelled-list-item href="/explore">Link 4</labelled-list-item>
                </labelled-list>

                <labelled-list type="secondary" header="Sub Section">
                    <labelled-list-item href="/explore">Link 1</labelled-list-item>
                    <labelled-list-item href="/explore">Link 2</labelled-list-item>
                    <labelled-list-item href="/explore">Link 3</labelled-list-item>
                    <labelled-list-item href="/explore">Link 4</labelled-list-item>
                </labelled-list>
            </mega-menu>
        </fixed-header>
    `;
};
base.storyName = 'default';
