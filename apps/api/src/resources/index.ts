import { getClientHandlers } from '@benjambles/mow-server/dist/utils/routes/get-client-handlers.js';
import { DataModel, prefix } from '../app.js';
import games, { GameClientTypes } from './games/index.js';
import service from './service/index.js';
import skirmishes, { SkirmishClientTypes } from './skirmishes/index.js';
import users, { UserClientTypes } from './users/index.js';

export default function (dataModel: DataModel) {
    const routeHandlers = {
        games: games(dataModel),
        service: service(dataModel),
        skirmishes: skirmishes(dataModel),
        users: users(dataModel),
    };

    return {
        routeHandlers,
        getApiHelpers: (hostUrl: string) => {
            return {
                games: getClientHandlers(routeHandlers['games'], hostUrl, prefix),
                skirmishes: getClientHandlers(
                    routeHandlers['skirmishes'],
                    hostUrl,
                    prefix,
                ),
                users: getClientHandlers(routeHandlers['users'], hostUrl, prefix),
            };
        },
    };
}

export type ClientApiTypes = {
    games: GameClientTypes;
    skirmishes: SkirmishClientTypes;
    user: UserClientTypes;
};
