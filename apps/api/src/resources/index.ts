import { getClientHandlers } from '@benjambles/mow-server/dist/utils/routes/get-client-handlers.js';
import { DataModel, prefix } from '../app.js';
import games, { GameClientTypes } from './games/index.js';
import service from './service/index.js';
import users, { UserClientTypes } from './users/index.js';

export default function (dataModel: DataModel) {
    const routeHandlers = {
        service: service(dataModel),
        users: users(dataModel),
        games: games(dataModel),
    };

    return {
        routeHandlers,
        getApiHelpers: (hostUrl: string) => {
            return {
                games: getClientHandlers(routeHandlers['games'], hostUrl, prefix),
                users: getClientHandlers(routeHandlers['users'], hostUrl, prefix),
            };
        },
    };
}

export type ClientApiTypes = {
    user: UserClientTypes;
    games: GameClientTypes;
};
