import { Db, MongoClient } from 'mongodb';
import { isNil } from 'ramda';

let db: Db;
let client: MongoClient;

/**
 *
 * @param config
 */
export const initConnection = async (config) => {
    const connectionString = getConnectionString(config);
    const client = await new MongoClient(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
    db = client.db(config.database);

    return db;
};

/**
 * Closes the database connection
 */
export const closeConnection = () => {
    client && client.close();
};

/**
 * Returns a MongoDB collection
 * @param name
 */
export const withCollection = (name) => db.collection(name);

/**
 * On a null query response throw an error to the response handler otherwise return
 * @param {string} error - Error message to throw with
 * @param {any} data - Response from query
 */
export const result = (error: string, data: any): never | any => {
    if (isNil(data)) {
        throw new Error(error);
    }

    return data;
};

/**
 *
 * @param config
 */
const getConnectionString = ({ url, user, password }) => {
    const userStr = !user ? '' : password ? `${user}:${password}@` : `${user}@`;

    return `${userStr}${url}`;
};
