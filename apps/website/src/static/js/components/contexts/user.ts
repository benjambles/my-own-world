import { ClientApiTypes } from '@benjambles/mow-api/dist/app.js';
import { createContext } from '@lit-labs/context';
import { Handlers, MowApi } from './request.js';

export type UserData = {
    errors?: {
        [field: string]: string;
    };
    status: 'logged-in' | 'logged-out' | 'error';
    tokens: {
        access: string;
        fingerprint: string;
        refresh: string;
    };
    user?: {
        _id: string;
        createdOn: string;
        firstName?: string;
        lastLoggedIn: string;
        lastName?: string;
        screenName: string;
    };
};

export const userSymbol = Symbol('user');
export const userContext = createContext<UserData>(userSymbol);

type UserClientTypes = ClientApiTypes['user'];

export type UserInstance = InstanceType<typeof Users>;

export class Users {
    private requestManager: InstanceType<typeof MowApi>;

    private actions: Handlers<UserClientTypes> = {};

    addManager(requestManager: InstanceType<typeof MowApi>) {
        if (this.requestManager) return;
        this.requestManager = requestManager;

        this.actions.authenticateUser = this.requestManager.getRequestor<
            UserClientTypes['authenticateUser']
        >('/authenticate', 'post');

        this.actions.deleteToken = this.requestManager.getRequestor<
            UserClientTypes['deleteToken']
        >('/users/:userId/tokens/:fingerprint', 'delete');

        this.actions.refreshToken = this.requestManager.getRequestor<
            UserClientTypes['refreshToken']
        >('/refreshToken', 'post');

        this.actions.createUser = this.requestManager.getRequestor<
            UserClientTypes['createUser']
        >('/users', 'post');

        this.actions.updateUserById = this.requestManager.getRequestor<
            UserClientTypes['updateUserById']
        >('/users/:userId', 'put');
    }

    async call<T extends keyof UserClientTypes>(
        action: T,
        params: UserClientTypes[T][2],
        accessToken?: string,
    ): Promise<UserClientTypes[T][3]> {
        if (!this.requestManager) {
            throw new Error('No request manager to handle the request.');
        }

        if (!this.actions[action]) {
            throw new Error('No action for the given key.');
        }

        return this.actions[action](params, accessToken);
    }
}
