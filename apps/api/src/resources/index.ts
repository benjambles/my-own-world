import { DataModel } from '../app.js';
import service from './service/index.js';
import users from './users/index.js';

export default function (dataModel: DataModel, prefix: string) {
    return {
        service: service(dataModel, prefix),
        users: users(dataModel, prefix),
    };
}
