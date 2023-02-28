import MongoDB, { ObjectId } from 'mongodb';

let client: MongoDB.MongoClient;

interface MongoConfig {
    database: string;
    url: string;
    user: string;
    password: string;
}

/**
 *
 * @param config
 */
export async function initConnection(config: MongoConfig) {
    const connectionString = getConnectionString(config);
    client = client || new MongoDB.MongoClient(connectionString);

    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    await client.db('admin').command({ ping: 1 });

    return client.db(config.database);
}

/**
 * Closes the database connection
 */
export function closeConnection() {
    client && client.close();
}

/**
 * On a null query response throw an error to the response handler otherwise return
 * @param {string} error - Error message to throw with
 * @param {any} data - Response from query
 */
export function getOrThrow<T>(error: string, data: T): never | T {
    if (data === null || data === false || data === undefined) {
        throw new Error(error);
    }

    return data;
}

/**
 *
 * @param config
 */
function getConnectionString({ url, user, password }): string {
    if (!user) return url;

    const userStr = [user, password].filter(Boolean).join(':');

    return url.replace('://', `://${userStr}@`);
}

export function getObjectId(uuid: string): ObjectId {
    if (!uuid) throw new Error('Invalid UUID passed');

    return new MongoDB.ObjectId(uuid);
}
