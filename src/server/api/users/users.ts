import { cleanData, cloneData } from "../../utils";
import * as Security from "../../utils/security";
import * as db from "./users-queries";

const cleanUserData = cleanData(format);

/**
 * Get a list of active users
 * @param {object}
 * @returns {Promise<User.UserData[]}
 */
export async function get(props: dbGet = { limit: 10, offset: 0 }): Promise<User.UserData[]> {
    const users = await db.getActiveUsers(props);
    return users.map(user => respond(user));
}

/**
 *
 */
export async function create(data): Promise<User.UserData> {
    const cleanData = cleanUserData(data);
    const user = await db.createUser(cleanData);
    return respond(user);
}
// export const create = composeP(respond, db.createUser, cleanUserData);

/**
 *
 */
export async function getOne(uuid: string): Promise<User.UserData> {
    const user = await db.getActiveUserByUUID(uuid);
    return respond(user);
}
//export const getOne: Promise<User.UserData> = composeP(respond, db.getActiveUserByUUID);

/**
 *
 */
export async function getByEmail(email: string): Promise<User.UserData> {
    const emailHash = await Security.encryptValue(email);
    const user = await db.getUserByEmail(emailHash);
    return respond(user, false);
}
//export const getByEmail: Promise<User.UserData> = composeP(respond, db.getUserByEmail);

/**
 *
 */
export async function update(data: User.UserData): Promise<boolean> {
    const cleanData = cleanUserData(data);
    return await db.updateUser(cleanData);
}
//export const update: Promise<boolean> = composeP(db.updateUser, format, cloneData);

/**
 *
 */
export const remove = db.deleteUser;

/**
 *
 */
export const getToken = async data => await Security.getToken(data);

/**
 *
 */
export const validatePassword = async (
    newPassword: string,
    storedPassword: string
): Promise<boolean> => await Security.compare(newPassword, storedPassword);

/**
 *
 * @param data
 */
async function format(data: User.UserData): Promise<User.UserData> {
    const encryptedProperties = ["email"];
    const hashedProperties = ["password"];
    const readOnlyProperties = ["uuid"];
    const formattedData = {};

    await Object.entries(data).forEach(async ([key, value]): Promise<void> => {
        if (readOnlyProperties.includes(key)) return;

        if (encryptedProperties.includes(key)) {
            value = Security.encryptValue(value);
        } else if (hashedProperties.includes(key)) {
            value = await Security.hash(value);
        }

        formattedData[key] = value;
    });

    return data;
}

/**
 *
 * @param data
 */
function respond(data: User.UserData, secure: boolean = true) {
    let safeData = cloneData(data);

    if (secure) {
        delete safeData.password;
    }

    safeData.email = Security.decryptValue(safeData.email);

    return safeData;
}
