import { MowApiInstance, requestContext } from '@benjambles/mow-ui/contexts/request.js';
import { consume, provide } from '@lit/context';
import Cookies from 'js-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { UserData, UserInstance, Users, userContext } from './user.js';

//#region Types
export type UserLoginPayload = {
    identifier: string;
    password: string;
};

export type UserRegistrationPayload = {
    identifier: string;
    password: string;
    screenName: string;
};

export type UserDetailsPayload = Pick<
    UserData['user'],
    'firstName' | 'lastName' | 'screenName'
>;
//#region Types

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
    login: 'mow:user.login',
    logout: 'mow:user.logout',
    register: 'mow:user.join',
    updateDetails: 'mow:user.updatedetails',
};

@customElement('with-user')
export class WithUser extends LitElement {
    private userApi: UserInstance;

    @consume({ context: requestContext, subscribe: true })
    @property({ attribute: false })
    accessor requestManager: MowApiInstance;

    @provide({ context: userContext })
    @property({ attribute: false })
    accessor userData: UserData = defaultUserData;

    @property()
    accessor accessCookie = 'mow-auth';

    @property()
    accessor fingerprintCookie = 'mow-fingerprint';

    @property()
    accessor refreshCookie = 'mow-refreshtoken';

    @property({ type: Boolean })
    accessor protectedPage = false;

    @property()
    accessor redirectUrl = '/';

    connectedCallback() {
        super.connectedCallback();

        //#region EventListeners
        this.addEventListener(userEvents.login, (e: CustomEvent<UserLoginPayload>) =>
            this.login(e.detail),
        );

        this.addEventListener(userEvents.logout, () => this.logout());

        this.addEventListener(
            userEvents.register,
            (e: CustomEvent<UserRegistrationPayload>) => {
                this.register(e.detail);
            },
        );

        this.addEventListener(
            userEvents.updateDetails,
            (e: CustomEvent<UserDetailsPayload>) => this.updateDetails(e.detail),
        );
        //#endregion EventListeners

        if (this.requestManager) {
            this.userApi = new Users();
            this.userApi.addManager(this.requestManager);

            this.refreshTokens();
        }
    }

    private isMaybeLoggedIn() {
        return !!Cookies.get(this.refreshCookie);
    }

    private async login(data: UserLoginPayload) {
        if (!this.userApi) {
            throw new Error('No request manager registered');
        }

        try {
            const response = await this.userApi.call('authenticateUser', {
                body: data,
            });

            this.setUserData({
                status: 'logged-in',
                user: response.user,
                tokens: {
                    access: response.accessToken,
                    fingerprint: response.fingerprint,
                    refresh: response.refreshToken,
                },
            });

            this.setCookies();
        } catch {
            this.deleteCookies();
            this.setUserData({
                ...defaultUserData,
                errors: { login: 'We were unable to confirm your identification.' },
            });
        }
    }

    private async logout() {
        if (!this.userApi) {
            throw new Error('No request manager registered');
        }

        const { fingerprint, refresh } = this.userData.tokens;
        let userId = this.userData.user?._id;

        if (!userId) {
            try {
                const parsedToken = jwtDecode<JwtPayload>(refresh);

                userId = parsedToken.sub;

                await this.userApi.call('deleteToken', {
                    params: { fingerprint, userId },
                });
            } catch {
                console.log('Could not get a user ID');
            }
        }

        this.deleteCookies();

        this.setUserData(defaultUserData);
    }

    private async refreshTokens() {
        if (!this.userApi) {
            throw new Error('No request manager registered');
        }

        const refreshToken = Cookies.get(this.refreshCookie);
        const fingerprint = Cookies.get(this.fingerprintCookie);

        if (!refreshToken || !fingerprint) {
            return;
        }

        try {
            const response = await this.userApi.call('refreshToken', {
                body: { refreshToken, fingerprint },
            });

            this.setUserData({
                status: 'logged-in',
                user: response.user,
                tokens: {
                    access: response.accessToken,
                    fingerprint: response.fingerprint,
                    refresh: response.refreshToken,
                },
            });

            this.setCookies();
        } catch {
            this.deleteCookies();
            this.setUserData({
                ...defaultUserData,
                errors: { login: 'We were unable to confirm your identification.' },
            });
        }
    }

    private async register(data: UserRegistrationPayload) {
        if (!this.userApi) {
            throw new Error('No request manager registered');
        }

        try {
            const userData = await this.userApi.call('createUser', {
                body: {
                    identifier: { identifier: data.identifier, type: 'email' },
                    user: { screenName: data.screenName, password: data.password },
                },
            });

            this.setUserData({
                status: 'logged-in',
                user: userData,
            });
            this.setCookies();
        } catch {
            this.deleteCookies();
            this.setUserData({
                ...defaultUserData,
                errors: { join: 'We were unable to create your account.' },
            });
        }
    }

    private async updateDetails(data: UserDetailsPayload) {
        if (!this.userApi) {
            throw new Error('No request manager registered');
        }

        try {
            const userData = await this.userApi.call(
                'updateUserById',
                {
                    params: { userId: this.userData.user._id },
                    body: data,
                },
                this.userData.tokens.access,
            );

            this.setUserData({ user: userData });
            this.setCookies();
        } catch {
            this.deleteCookies();
            this.setUserData({
                errors: { details: 'There was an error whilst saving' },
            });
        }
    }

    private deleteCookies() {
        Cookies.remove(this.fingerprintCookie);
        Cookies.remove(this.refreshCookie);
        Cookies.remove(this.accessCookie);
    }

    private setCookies() {
        const { access, fingerprint, refresh } = this.userData.tokens;
        // TODO make secure and expiry
        Cookies.set(this.refreshCookie, refresh);
        Cookies.set(this.fingerprintCookie, fingerprint);
        Cookies.set(this.accessCookie, access);
    }

    private setUserData(newData: Partial<UserData>) {
        this.userData = {
            ...this.userData,
            ...newData,
        };
    }

    protected render() {
        if (!this.isMaybeLoggedIn() && this.protectedPage) {
            window.location.replace(this.redirectUrl);
            return nothing;
        }

        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'with-user': WithUser;
    }
}
