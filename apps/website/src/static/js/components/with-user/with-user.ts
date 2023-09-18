import { composedEvent } from '@benjambles/mow-ui/utils.js';
import { consume, provide } from '@lit-labs/context';
import Cookies from 'js-cookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MowApiInstance, requestContext } from '../contexts/request.js';
import { UserData, UserInstance, Users, userContext } from '../contexts/user.js';

export type UserLoginPayload = {
    identifier: string;
    password: string;
};

export type UserRegistrationPayload = {
    identifier: string;
    password: string;
    screenName: string;
};

const defaultUserData: UserData = {
    errors: {},
    status: 'logged-out',
    tokens: {
        access: '',
        fingerprint: '',
        refresh: '',
    },
    user: undefined,
};

export const userEvents = {
    loggedIn: 'loginsuccess',
    login: 'userlogin',
    logout: 'userlogout',
    loggedOut: 'logoutsuccess',
    openLoginModal: 'openlogin',
    register: 'userjoin',
    registered: 'joinsuccess',
};

@customElement('with-user')
export class WithUser extends LitElement {
    userApi: UserInstance;

    @property({ type: String, reflect: false })
    accessCookie = 'mow-auth';

    @property({ type: String, reflect: false })
    fingerprintCookie = 'mow-fingerprint';

    @property({ type: String, reflect: false })
    refreshCookie = 'mow-refreshtoken';

    @consume({ context: requestContext, subscribe: true })
    @property({ attribute: false })
    requestManager?: MowApiInstance;

    @provide({ context: userContext })
    @property({ attribute: false })
    userData: UserData = defaultUserData;

    connectedCallback() {
        super.connectedCallback();

        this.addEventListener(userEvents.login, (e: CustomEvent<UserLoginPayload>) =>
            this._login(e.detail),
        );
        this.addEventListener(userEvents.logout, () => this._logout());

        this.addEventListener(
            userEvents.register,
            (e: CustomEvent<UserRegistrationPayload>) => {
                this._register(e.detail);
            },
        );

        //setup User API
        this.userApi = new Users();
        this.userApi.addManager(this.requestManager);

        this._refreshTokens(); // try auto login
    }

    private async _login(data: UserLoginPayload) {
        try {
            const userData = await this.userApi.call('authenticateUser', {
                body: data,
            });

            this.userData = {
                ...this.userData,
                status: 'logged-in',
                ...userData,
            };

            this.dispatchEvent(composedEvent(userEvents.loggedIn, undefined));

            this._setCookies();
        } catch (e) {
            this._deleteCookies();
            this.userData = {
                ...defaultUserData,
                errors: { login: 'We were unable to confirm your identification.' },
            };
        }
    }

    private async _logout() {
        const { fingerprint, refresh } = this.userData.tokens;
        let userId = this.userData.user?._id;

        if (!userId) {
            try {
                const parsedToken = jwtDecode.default<JwtPayload>(refresh);

                userId = parsedToken.sub;

                await this.userApi.call('deleteToken', {
                    params: { fingerprint, userId },
                });
            } catch (e) {
                console.log('Could not get a user ID');
            }
        }

        this._deleteCookies();

        this.userData = { ...defaultUserData };

        this.dispatchEvent(composedEvent(userEvents.loggedOut, undefined));
    }

    private async _refreshTokens() {
        const refreshToken = Cookies.get(this.refreshCookie);
        const fingerprint = Cookies.get(this.fingerprintCookie);

        if (!refreshToken || !fingerprint) {
            return;
        }

        try {
            const userData = await this.userApi.call('refreshToken', {
                body: { refreshToken, fingerprint },
            });

            this.userData = {
                ...this.userData,
                status: 'logged-in',
                ...userData,
            };

            this._setCookies();
        } catch (e) {
            this._deleteCookies();
            this.userData = {
                ...defaultUserData,
                errors: { login: 'We were unable to confirm your identification.' },
            };
        }
    }

    private async _register(data: UserRegistrationPayload) {
        try {
            const userData = await this.userApi.call('createUser', {
                body: {
                    identifier: { identifier: data.identifier, type: 'email' },
                    user: { screenName: data.screenName, password: data.password },
                },
            });

            this.userData = {
                ...this.userData,
                status: 'logged-in',
                ...userData,
            };

            this.dispatchEvent(composedEvent(userEvents.loggedIn, undefined));

            this._setCookies();
        } catch (e) {
            this._deleteCookies();
            this.userData = {
                ...defaultUserData,
                errors: { join: 'We were unable to create your account.' },
            };
        }
    }

    private _deleteCookies() {
        Cookies.remove(this.fingerprintCookie);
        Cookies.remove(this.refreshCookie);
        Cookies.remove(this.accessCookie);
    }

    private _setCookies() {
        const { access, fingerprint, refresh } = this.userData.tokens;
        // TODO make secure and expiry
        Cookies.set(this.refreshCookie, refresh);
        Cookies.set(this.fingerprintCookie, fingerprint);
        Cookies.set(this.accessCookie, access);
    }

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'with-user': WithUser;
    }
}
