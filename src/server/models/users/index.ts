declare namespace User {
    interface UserData {
        id: string;
        screenName: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }
}

import * as Security from '../../lib/security';

/**
 * A class representing a user of the platform
 */
export default class User {
    private _data: User.UserData

    constructor() {

    }

    /**
     * Retrieve an array of users, optionally filtered
     * @param count The number of users to return 
     * @param offset The offset to begin fetching users from
     */
    static async getUsers(pageNumber: number, pageCount: number): Promise<User[]> {
        let users = ['1', '2', '3', '4', '5'].map(await User.getUserById);

        return Promise.all(users);
    }

    static async createUser(data: User.UserData): Promise<User> {
        return await new User().populate(data);
    }

    static async getUserById(id: string): Promise<User> {
        const data = {
            id: id,
            screenName: "Shambles",
            firstName: "Ben",
            lastName: "Allen",
            email: "ben@ben-allen.com",
            password: "$2a$10$3Wao.HJP.J2LM.rtzofxleYrkEDjaatuiHu15ZODA4CvRurnN.hbK"
        };

        return await new User().populate(data);
    }

    static async getUserByEmail(email: string): Promise<User> {
        const data = {
            id: "1",
            screenName: "Shambles",
            firstName: "Ben",
            lastName: "Allen",
            email: email,
            password: "$2a$10$3Wao.HJP.J2LM.rtzofxleYrkEDjaatuiHu15ZODA4CvRurnN.hbK"
        };

        return await new User().populate(data);
    }

    static validateData(data: User.UserData): User.UserData {
        return data;
    }

    private static async createDBRepresentation(data: User.UserData): Promise<User.UserData> {
        const encryptedProperties = ['email'];
        const hashedProperties = ['password'];
        const readOnlyProperties = ['id'];
        const dbRespresentation = Object.assign({}, data);

        await Object.entries(dbRespresentation).forEach(async ([key, value]): Promise<void> => {
            if (~readOnlyProperties.indexOf(key)) return;

            if (~encryptedProperties.indexOf(key)) {
                value = await Security.encryptValue(value);
            } else if (~hashedProperties.indexOf(key)) {
                value = await Security.hash(value);
            }

            dbRespresentation[key] = value;
        });

        return dbRespresentation;
    }

    async update(data: User.UserData): Promise<User> {
        try {
            // TODO: Validate first
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
        if(typeof password !== 'string') return false;
        
        return await Security.compare(password, this.password);
    }

    async populate(data: User.UserData): Promise<User> {
        try {
            const validData = await User.validateData(data);
            this.data = validData;

            return this;
        } catch (e) {
            throw new Error('Invalid data provided');
        }

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

            return safeData;
        } catch (e) {
            throw new Error('No data has been set yet for this user.');
        }
    }
}