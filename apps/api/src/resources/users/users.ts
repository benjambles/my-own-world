import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';
import { compareBHash } from '@benjambles/mow-server/dist/utils/security/blowfish.js';

import {
    formatData,
    getDataFormatter,
    ModelOptions,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { Db } from 'mongodb';
import { Env } from '../../schema/env-schema.js';
import { getUserHelpers, NewUser, User } from './queries.js';

const restrictedKeys = ['password', 'identities', 'settings'] as const;
type RestrictedKeys = typeof restrictedKeys[number];

export type UserResponse = Omit<User, RestrictedKeys>;
export const cleanResponse = omit<User, RestrictedKeys>(...restrictedKeys);

export function getUserModel(db: Db, { ENC_SECRET }: Env) {
    const formatOptions: ModelOptions = {
        encrypted: [],
        salted: ['password'],
        readOnly: ['_id'],
        hmac: [],
    };

    const formatUserData = formatData(getDataFormatter(ENC_SECRET, formatOptions));
    const userQueries = getUserHelpers(db);

    return {
        formatUserData,
        get: async function (
            limit: number = 10,
            offset: number = 0,
        ): Promise<UserResponse[]> {
            const userProfiles = await userQueries.get(limit, offset);
            return userProfiles.map(cleanResponse);
        },

        find: async function (uuid: string): Promise<UserResponse> {
            const user = await userQueries.find(uuid);

            return cleanResponse(user);
        },

        findByIdentifier: async function (identifier: string): Promise<User> {
            return await userQueries.findByIdentifier(identifier);
        },

        create: async function (data: NewUser): Promise<UserResponse> {
            const cleanData = await formatUserData(data);
            const user = await userQueries.create(cleanData);

            return cleanResponse(user);
        },

        update: async function (
            uuid: string,
            data: Partial<User>,
        ): Promise<UserResponse> {
            const cleanData = await formatUserData(data);
            const user = await userQueries.update(uuid, cleanData);

            return cleanResponse(user);
        },

        delete: async function (uuid: string): Promise<boolean> {
            return await userQueries.delete(uuid);
        },

        sendMagicLink: async function (): Promise<boolean> {
            return true;
        },

        authenticate: async function (
            identifier: string,
            password: string,
        ): Promise<UserResponse> {
            const user = await userQueries.findByIdentifier(identifier);
            const accessDate = new Date();

            await compareBHash(password, user.password);

            userQueries.update(user._id.toString(), { lastLoggedIn: accessDate });

            return cleanResponse(user);
        },
    };
}
