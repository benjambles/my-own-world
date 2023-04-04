import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import {
    created,
    noResponse,
    ok,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import createError from 'http-errors';
import { DataModel } from '../../../app.js';
import config from './config.js';
import { cleanResponse } from './weapons.js';

/**
 * Routes on /weapons and /weapons/*
 */
export default function weapons(dataModel: DataModel) {
    const weapons = dataModel.getKey('weapons');

    return createResource(config)
        .operation('getWeapons', async (ctx) => {
            const { limit, offset } = ctx.request.query;
            const weaponsResult = await weapons.get(limit, offset);

            return ok(weaponsResult.value.map(cleanResponse));
        })
        .operation('getWeaponById', async (ctx) => {
            const weaponResult = await weapons.find(ctx.request.params.weaponId);

            if (!weaponResult.ok) {
                throw createError(404, 'The requested weapon could not be found');
            }

            return ok(cleanResponse(weaponResult.value));
        })
        .operation('deleteWeaponById', async (ctx) => {
            const weaponResult = await weapons.delete(ctx.request.params.weaponId);

            if (!weaponResult.ok) {
                throw createError(400, 'There was an error whilst deleting the weapon');
            }

            return noResponse();
        })
        .operation('createWeapon', async (ctx) => {
            const weaponResult = await weapons.create(ctx.request.body);

            if (!weaponResult.ok) {
                throw createError(400, 'There was an error whilst creating the weapon');
            }

            return created(cleanResponse(weaponResult.value));
        })
        .operation('updateWeaponById', async (ctx) => {
            const weaponResult = await weapons.update(
                ctx.request.params.weaponId,
                ctx.request.body,
            );

            if (!weaponResult.ok) {
                throw createError(400, 'There was an error whilst updating the weapon');
            }

            return ok(cleanResponse(weaponResult.value));
        })
        .get();
}
