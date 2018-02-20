import { cleanData, cloneData, format } from "../../utils";
import * as Security from "../../utils/security";
import * as db from "./users-queries";
import * as Identities from "./identities/identities";

const model = {
    encrypted: ["email"],
    hashed: ["password"],
    readOnly: ["uuid"]
};
const formatUser = format(model);
const cleanUserData = cleanData(formatUser);

const sanitizedResponse = respond(true);
const unsanitizedResponse = respond(false);
/**
 * Get a list of active users
 * @param {dbGet} props - A limit and offset provided as integers
 * @returns {Promise<User.UserData[]}
 */
export async function get(props: dbGet = { limit: 10, offset: 0 }): Promise<User.UserData[]> {
    const users = await db.getActiveUsers(props);
    return users.map(sanitizedResponse);
}

/**
 * Fetches a user record from the database using the uuid as the search value
 * @param {string} uuid - A valid uuid
 */
export async function getOne(uuid: string): Promise<User.UserData> {
    const user = await db.getActiveUserByUuid(uuid);
    return sanitizedResponse(user);
}

/**
 * Fetches a user record from the database using the email address as the search value
 * @param {string} email - A valid email address
 */
export async function getByEmail(identifier: string): Promise<User.UserData> {
    const identity = await Identities.getByIndentifier(identifier);
    const user = await getOne(identity.userId);
    return unsanitizedResponse(user);
}

/**
 * Creates a new user record in the database
 * @param {User.UserData} data - The fields required to create a new user record
 * @returns {Promise<User.UserData}
 */
export async function create(data: User.UserData): Promise<User.UserData> {
    const cleanData = cleanUserData(data);
    const user = await db.createUser(cleanData);
    return sanitizedResponse(user);
}

/**
 *
 */
export async function update(uuid: string, data: User.UserData): Promise<User.UserData> {
    const cleanData = cleanUserData(data);
    const user = await db.updateUser(uuid, cleanData);
    return sanitizedResponse(user);
}

/**
 *
 */
export const remove = db.deleteUser;

/**
 *
 * @param identifier
 * @param password
 */
export async function authenticate(identifier: string, password: string): Promise<User.UserData> {
    const identity = await Identities.getByIndentifier(identifier);
    const user = await db.getActiveUserByUuid(identity.userId);
    const isValid = await Security.compare(password, user.password);

    return sanitizedResponse(user);
}

/**
 *
 * @param email
 */
export async function sendMagicLink(email: string): Promise<Boolean> {
    return true;
}

/**
 *
 * @param data
 */
function respond(secure) {
    return (data: User.UserData) => {
        let safeData = cloneData(data);

        if (secure) {
            delete safeData.password;
        }

        return safeData;
    };
}
