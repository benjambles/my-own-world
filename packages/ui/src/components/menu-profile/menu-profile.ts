import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MowDetails } from '../mow-details/mow-details.js';

@customElement('menu-profile')
export class MenuProfile extends MowDetails {
    static styles = css`
        * {
            box-sizing: 'border-box';
        }

        :host {
            --highlight: var(--profile-highlight, rgba(255, 0, 0, 0.8));
        }

        summary:focus img,
        summary:hover img {
            border-color: var(--highlight);
        }

        img {
            border: 2px solid white;
            border-radius: 5px;
            display: inline-block;
            height: 32px;
        }

        a {
            text-decoration: none;
            color: var(--shade-4);
            transition: color 0.1s;
        }

        a:hover,
        a:active,
        a:focus,
        a.active {
            outline: none;
            color: var(--highlight);
        }

        .bar-link {
            display: block;
            padding: 5px 15px;
            transition:
                background-color 0.1s,
                color 0.1s;
            flex-grow: 1;
        }

        .bar-link:hover,
        .bar-link:active,
        .bar-link:focus,
        .bar-link.active {
            background-color: var(--highlight);
            color: var(--shade-0);
        }

        details {
            display: block;
            position: relative;
        }

        details > summary {
            display: flex;
            cursor: pointer;
        }

        details > summary:focus {
            outline: none;
        }

        details > summary::-webkit-details-marker {
            width: 0.5em;
            height: 0.5em;
            margin-inline-end: 0.1em;
            position: relative;
            top: -6px;
            color: white;
        }

        details > summary:hover::-webkit-details-marker,
        details > summary:focus::-webkit-details-marker {
            color: var(--highlight);
        }

        details > summary:hover .profile-image,
        details > summary:focus .profile-image {
            border-color: var(--highlight);
        }

        .dropdown-menu {
            background: white;
            display: block;
            position: absolute;
            right: 0;
            padding: 5px 0;
            border-radius: 5px;
            background-clip: padding-box;
            border: 1px solid rgba(27, 31, 35, 0.15);
            box-shadow:
                0 12px 28px 0 rgba(0, 0, 0, 0.2),
                0 2px 4px 0 rgba(0, 0, 0, 0.1),
                inset 0 0 0 1px rgba(255, 255, 255, 0.5);
            width: 180px;
            font-size: 1.4rem;
            display: flex;
            flex-direction: column;
        }

        .user-label {
            padding: 0 15px;
            display: block;
        }

        hr {
            margin: 5px 0;
            height: 1px;
            border: none;
            color: #ccc;
            background-color: #ccc;
        }
    `;

    public toggleEventName = 'usermenutoggle';

    @property()
    name;

    @property()
    username;

    @property()
    imageSrc = 'https://via.placeholder.com/32.webp/ddd/1a1a1a?text=U';

    render() {
        return html`
            <details @toggle=${this.handleToggle}>
                <summary aria-haspopup="true" role="button">
                    <img src="${this.imageSrc}" title="Click to open" />
                </summary>
                <div class="dropdown-menu" role="menu">
                    <span class="user-label">
                        Signed in as <br />
                        <a href="/profile/${this.username}">${this.name}</a>
                    </span>
                    <hr />
                    <a href="/profile/${this.username}" class="bar-link">
                        Your profile
                    </a>
                    <hr />
                    <a href="/preferences" class="bar-link"> Preferences </a>
                    <a href="/help" class="bar-link"> Help </a>
                    <a href="/logout" class="bar-link"> Logout </a>
                </div>
            </details>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'menu-profile': MenuProfile;
    }
}