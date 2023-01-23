import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { ok } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { DataModel } from '../../app.js';
import config from './config.js';

/**
 * Routes on /service and /service/*
 */
export default function service(dataModel: DataModel, prefix: string) {
    const system = dataModel.get('system');

    return createResource(config, prefix)
        .operation('getHealth', async () => {
            return ok('ok');
        })
        .operation('getVersion', async () => {
            const { key, value } = await system.find('api_version');

            return ok({
                [key]: value,
            });
        })
        .operation('getStatus', async () => {
            return ok('ok');
        })
        .operation('getMetrics', async () => {
            return ok('ok');
        })
        .operation('getDebugData', async () => {
            return ok('ok');
        })
        .get();
}
