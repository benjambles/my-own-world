import MongoDB from 'mongodb';

let client;

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
export const initConnection = async (config: MongoConfig) => {
    const connectionString = getConnectionString(config);
    const client = await new MongoDB.MongoClient(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
    return client.db(config.database);
};

/**
 * Closes the database connection
 */
export const closeConnection = () => {
    client && client.close();
};

/**
 * On a null query response throw an error to the response handler otherwise return
 * @param {string} error - Error message to throw with
 * @param {any} data - Response from query
 */
export const result = <T>(error: string, data: T): never | T => {
    if (data === null) {
        throw new Error(error);
    }

    return data;
};

/**
 *
 * @param config
 */
const getConnectionString = ({ url, user, password }) => {
    if (!user) return url;

    const userStr = [user, password].filter(Boolean).join(':');

    return `${userStr}@${url}`;
};
