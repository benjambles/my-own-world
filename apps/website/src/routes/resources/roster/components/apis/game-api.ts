import { ClientApiTypes } from '@benjambles/mow-api/dist/app.js';
import { GameResponse } from '@benjambles/mow-api/src/resources/games/data/games.js';
import { Handlers, MowApi } from '@benjambles/mow-ui/contexts/request.js';
import { createContext } from '@lit-labs/context';

export const gameSymbol = Symbol('games');
export const gameContext = createContext<GameResponse>(gameSymbol);

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

        this.actions.getGameById = this.requestManager.getRequestor<
            GameClientTypes['getGameById']
        >('/games/:gameId', 'get');

        this.actions.getItems = this.requestManager.getRequestor<
            GameClientTypes['getItems']
        >('/games/:gameId/items', 'get');

        this.actions.getArchetypes = this.requestManager.getRequestor<
            GameClientTypes['getArchetypes']
        >('/games/:gameId/archetypes', 'get');

        this.actions.getNpcs = this.requestManager.getRequestor<
            GameClientTypes['getNpcs']
        >('/games/:gameId/npcs', 'get');
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
