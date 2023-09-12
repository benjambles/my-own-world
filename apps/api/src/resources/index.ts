import { getClientHandlers } from '@benjambles/mow-server/dist/utils/routes/get-client-handlers.js';
import { DataModel } from '../app.js';
import service from './service/index.js';
import users, { UserClientTypes } from './users/index.js';

export default function (dataModel: DataModel) {
    const routeHandlers = {
        service: service(dataModel),
        users: users(dataModel),
    };

    return {
        routeHandlers,
        getApiHelpers: (hostUrl: string) => {
            return {
                users: getClientHandlers(routeHandlers['users'], hostUrl),
            };
        },
    };
}

export type ClientApiTypes = {
    user: UserClientTypes;
};
