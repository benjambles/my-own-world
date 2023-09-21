import { ClientApiTypes } from '@benjambles/mow-api/dist/app.js';
import { Handlers, MowApi } from './request.js';

type GameClientTypes = ClientApiTypes['games'];

export type GameApiInstance = InstanceType<typeof GameApi>;

export class GameApi {
    private requestManager: InstanceType<typeof MowApi>;

    private actions: Handlers<GameClientTypes> = {};

    addManager(requestManager: InstanceType<typeof MowApi>) {
        if (this.requestManager) return;
        this.requestManager = requestManager;

        this.actions.getGames = this.requestManager.getRequestor<
            GameClientTypes['getGames']
        >('/games', 'get');

        this.actions.createGame = this.requestManager.getRequestor<
            GameClientTypes['createGame']
        >('/games', 'post');

        this.actions.deleteGameById = this.requestManager.getRequestor<
            GameClientTypes['deleteGameById']
        >('/games/:gameId', 'delete');

        this.actions.getGameById = this.requestManager.getRequestor<
            GameClientTypes['getGameById']
        >('/games/:gameId', 'get');

        this.actions.updateGameById = this.requestManager.getRequestor<
            GameClientTypes['updateGameById']
        >('/games/:gameId', 'put');
    }

    async call<T extends keyof GameClientTypes>(
        action: T,
        params: GameClientTypes[T][2],
        accessToken?: string,
    ): Promise<GameClientTypes[T][3]> {
        if (!this.requestManager) {
            throw new Error('No request manager to handle the request.');
        }

        if (!this.actions[action]) {
            throw new Error('No action for the given key.');
        }

        return this.actions[action](params, accessToken);
    }
}
