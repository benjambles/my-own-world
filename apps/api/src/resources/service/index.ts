import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { DataModel } from '../../app.js';
import config from './config.js';

/**
 * Routes on /service and /service/*
 */
export default function service(dataModel: DataModel) {
    const system = dataModel.get('system');

    return createResource(config)
        .operation('getHealth', async () => 'ok')
        .operation('getVersion', async () => {
            const { key, value } = await system.find('api_version');
            return {
                [key]: value,
            };
        })
        .operation('getStatus', async () => 'ok')
        .operation('getMetrics', async () => 'ok')
        .operation('getDebugData', async () => 'ok').middleware;
}
