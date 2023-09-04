import { createContext } from '@lit-labs/context';

export type UserData = {
    accessToken: string;
    fingerprint: string;
    refreshToken: string;
    status: 'logged-in' | 'logged-out' | 'pending' | 'error';
    user?: {
        _id: string;
        createdOn: string;
        firstName: string;
        lastLoggedIn: string;
        lastName: string;
        screenName: string;
    };
};

export const userSymbol = Symbol('user');
export const userContext = createContext<UserData>(userSymbol);

import { GetApiHelpers } from '@benjambles/mow-api/dist/app.js';
import { ApiMap, MowApi } from './request.js';

type UserApi = GetApiHelpers['users'];

type ParamsFromId<Path, Method, OpId extends keyof UserApi> = [
    Path,
    Method,
    Parameters<UserApi[OpId]>[0],
    Awaited<ReturnType<UserApi[OpId]>>,
];

type Handlers<T extends ApiMap> = {
    [key in keyof T]: (args: T[key][2]) => Promise<T[key][3]>;
};

export type AuthenticationHandlers = {
    authenticateUser: ParamsFromId<'/authenticate', 'post', 'authenticateUser'>;
    deleteToken: ParamsFromId<'/deleteToken', 'put', 'deleteToken'>;
    refreshToken: ParamsFromId<'/refreshToken', 'post', 'refreshToken'>;
};

export type UserInstance = InstanceType<typeof Users>;

export class Users {
    private _requestManager: InstanceType<typeof MowApi>;

    public actions: Partial<Handlers<AuthenticationHandlers>> = {};

    public addManager(requestManager: InstanceType<typeof MowApi>) {
        if (this._requestManager) return;
        this._requestManager = requestManager;

        this.actions.authenticateUser = this._requestManager.getRequestor<
            AuthenticationHandlers['authenticateUser']
        >('/authenticate', 'post');

        this.actions.deleteToken = this._requestManager.getRequestor<
            AuthenticationHandlers['deleteToken']
        >('/deleteToken', 'put');

        this.actions.refreshToken = this._requestManager.getRequestor<
            AuthenticationHandlers['refreshToken']
        >('/refreshToken', 'post');
    }

    public async call<T extends keyof AuthenticationHandlers>(
        action: T,
        params: AuthenticationHandlers[T][2],
    ): Promise<AuthenticationHandlers[T][3]> {
        if (!this._requestManager) {
            throw new Error('No request manager to handle the request.');
        }

        if (!this.actions[action]) {
            throw new Error('No action for the given key.');
        }

        return this.actions[action](params);
    }
}
