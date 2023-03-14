import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import {
    created,
    noResponse,
    ok,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { DataModel } from '../../../app.js';
import config from './config.js';

/**
 * Routes on /weapons and /weapons/*
 */
export default function weapons(dataModel: DataModel) {
    const weapons = dataModel.getKey('weapons');

    return createResource(config)
        .operation('getWeapons', async (ctx) => {
            const { limit, offset } = ctx.request.query;
            const data = await weapons.get(limit, offset);

            return ok(data);
        })
        .operation('getWeaponById', async (ctx) => {
            const data = await weapons.find(ctx.request.params.weaponId);

            return ok(data);
        })
        .operation('deleteWeaponById', async (ctx) => {
            await weapons.delete(ctx.request.params.weaponId);

            return noResponse();
        })
        .operation('createWeapon', async (ctx) => {
            const userData = await weapons.create(ctx.request.body);

            return created(userData);
        })
        .operation('updateWeaponById', async (ctx) => {
            const data = await weapons.update(
                ctx.request.params.weaponId,
                ctx.request.body,
            );

            return ok(data);
        })
        .get();
}
