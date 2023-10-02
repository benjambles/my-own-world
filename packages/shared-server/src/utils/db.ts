import MongoDB, { ObjectId } from 'mongodb';

let client: MongoDB.MongoClient;

export type ModelResult<T> = Promise<{ ok: boolean; value: T }>;

interface MongoConfig {
    database: string;
    password: string;
    url: string;
    user: string;
}

/**
 * Closes the database connection
 */
export async function closeConnection() {
    if (!client) return;

    await client.close();
}

export function getObjectId(uuid?: string): ObjectId {
    return new MongoDB.ObjectId(uuid);
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
 *
 * @param config
 */
function getConnectionString({ password, url, user }): string {
    if (!user) return url;

    const userStr = [user, password].filter(Boolean).join(':');

    return url.replace('://', `://${userStr}@`);
}
