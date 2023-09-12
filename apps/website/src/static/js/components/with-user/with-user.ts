import { composedEvent } from '@benjambles/mow-ui/utils.js';
import { consume, provide } from '@lit-labs/context';
import Cookies from 'js-cookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MowApiInstance, requestContext } from '../contexts/request.js';
import { UserData, UserInstance, Users, userContext } from '../contexts/user.js';

const defaultUserData: UserData = {
    accessToken: '',
    fingerprint: '',
    refreshToken: '',
    status: 'logged-out',
    user: undefined,
};

export const userEvents = {
    loggedIn: 'loginsuccess',
    login: 'userlogin',
    logout: 'userlogout',
    openLoginModal: 'openlogin',
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

        this.addEventListener('userlogin', (e) => this._login(e));
        this.addEventListener('userlogout', () => this._logout());

        //setup User API
        this.userApi = new Users();
        this.userApi.addManager(this.requestManager);

        this._refreshTokens(); // try auto login
    }

    private async _login(e) {
        if (!e.detail.identifier || !e.detail.password) {
            return false;
        }

        try {
            const userData = await this.userApi.call('authenticateUser', {
                body: e.detail,
            });

            this.userData = {
                ...this.userData,
                status: 'logged-in',
                ...userData,
            };

            this.dispatchEvent(composedEvent('loginsuccess', undefined));

            this._setCookies();
        } catch (e) {
            this._logout();
        }
    }

    private async _logout() {
        const { fingerprint, refreshToken } = this.userData;
        let userId = this.userData.user?._id;

        if (!userId) {
            try {
                const parsedToken = jwtDecode.default<JwtPayload>(refreshToken);

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

        this.dispatchEvent(composedEvent('logoutsuccess', undefined));
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
            this._logout();
        }
    }

    private _deleteCookies() {
        Cookies.remove(this.fingerprintCookie);
        Cookies.remove(this.refreshCookie);
        Cookies.remove(this.accessCookie);
    }

    private _setCookies() {
        Cookies.set(this.refreshCookie, this.userData.refreshToken); // TODO secure and time
        Cookies.set(this.fingerprintCookie, this.userData.fingerprint);
        Cookies.set(this.accessCookie, this.userData.accessToken);
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
