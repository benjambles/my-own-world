import * as pg from 'pg';
import * as pgExtra from 'pg-extra';
import * as Security from '../../lib/security';
import * as db from '../../db/users';
import { getUUID } from '../../lib/utils';

/**
 * A class representing a user of the platform
 */
export default class User {

    constructor(private _data: User.UserData) {

    }

    /**
     * Retrieve an array of users, optionally filtered
     * @param count The number of users to return 
     * @param offset The offset to begin fetching users from
     */
    static async getUsers(count: number = 10, offset: number = 0): Promise<User[]> {
        let data = await db.getActiveUsers(count, offset);
        let users = data.map(await User.createUser);
        return Promise.all(users);
    }

    static async createUser(data: User.UserData): Promise<User> {
        await User.validateData(data);
        return new User(data);
    }

    static async getUserById(uuid: string): Promise<User> {
        const data = await db.getActiveUserByUUID(uuid);

        return new User(data);
    }

    static async getUserByEmail(email: string): Promise<User> {
        let emailHash = await Security.encryptValue(email);
        const data = await db.getUserByEmail(emailHash);
        return new User(data);
    }

    private static async createDBRepresentation(data: User.UserData): Promise<User.UserData> {
        const encryptedProperties = ['email'];
        const hashedProperties = ['password'];
        const readOnlyProperties = ['id'];
        const dbRespresentation = Object.assign({}, data);

        await Object.entries(dbRespresentation).forEach(async ([key, value]): Promise<void> => {
            if (~readOnlyProperties.indexOf(key)) return;

            if (~encryptedProperties.indexOf(key)) {
                value = Security.encryptValue(value);
            } else if (~hashedProperties.indexOf(key)) {
                value = await Security.hash(value);
            }

            dbRespresentation[key] = value;
        });

        return dbRespresentation;
    }

    static async validateData(data: User.UserData): Promise<User.UserData> {
        try {
            return data;
        } catch (e) {
            throw new Error('Invalid data provided');
        }
    }

    async update(data: User.UserData): Promise<User> {
        try {
            let saveable = await User.createDBRepresentation(data);

            // TODO: save to database

            return this;
        } catch (e) {
            throw new Error(e.message || 'The user could not be saved');
        }
    }

    async delete(): Promise<boolean> {
        return true;
    }

    async validatePassword(password: string): Promise<boolean> {
        if (typeof password !== 'string') return false;

        return await Security.compare(password, this.password);
    }

    async getToken(): Promise<string> {
        return await Security.getToken(this.data);
    }

    get password(): string {
        try {
            return this._data.password;
        }
        catch (e) {
            throw new Error('No password has been set yet');
        }
    }

    set data(values: User.UserData) {
        this._data = Object.assign({}, values);
    }

    get data(): User.UserData {
        try {
            let safeData = Object.assign({}, this._data);
            delete safeData.password;

            safeData.email = Security.decryptValue(safeData.email);

            return safeData;
        } catch (e) {
            throw new Error('No data has been set yet for this user.');
        }
    }
}