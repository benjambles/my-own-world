import { createContext } from '@lit-labs/context';

export type UserData = {
    accessToken: string;
    fingerprint: string;
    refreshToken: string;
    status: 'logged-in' | 'logged-out' | 'error';
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

import { ClientApiTypes } from '@benjambles/mow-api/dist/app.js';
import { ApiMap, MowApi } from './request.js';

type UserClientTypes = ClientApiTypes['user'];

type Handlers<T extends ApiMap> = Partial<{
    [key in keyof T]: (args: T[key][2]) => Promise<T[key][3]>;
}>;

export type UserInstance = InstanceType<typeof Users>;

export class Users {
    private _requestManager: InstanceType<typeof MowApi>;

    public actions: Handlers<UserClientTypes> = {};

    public addManager(requestManager: InstanceType<typeof MowApi>) {
        if (this._requestManager) return;
        this._requestManager = requestManager;

        this.actions.authenticateUser = this._requestManager.getRequestor<
            UserClientTypes['authenticateUser']
        >('/authenticate', 'post');

        this.actions.deleteToken = this._requestManager.getRequestor<
            UserClientTypes['deleteToken']
        >('/users/:userId/tokens/:fingerprint', 'delete');

        this.actions.refreshToken = this._requestManager.getRequestor<
            UserClientTypes['refreshToken']
        >('/refreshToken', 'post');
    }

    public async call<T extends keyof UserClientTypes>(
        action: T,
        params: UserClientTypes[T][2],
    ): Promise<UserClientTypes[T][3]> {
        if (!this._requestManager) {
            throw new Error('No request manager to handle the request.');
        }

        if (!this.actions[action]) {
            throw new Error('No action for the given key.');
        }

        return this.actions[action](params);
    }
}
