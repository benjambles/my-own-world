import { resolve } from 'path';

const envPath: string = resolve(__dirname, '../.env');
const env = require('dotenv').config({ path: envPath }).parsed;

export const serverRootPath: string = resolve(__dirname, '../');
export const schemaPath: string = resolve(serverRootPath, 'db/sql');
export const routesPath: string = resolve(serverRootPath, 'routes');

export const responseStatuses = Object.freeze({
    success: 'success'
});

export const encryptionData = Object.freeze({
    ivLength: 16,
    password: env.ENC_SECRET,
    type: 'aes-256-cbc'
});

export const hashType: string = 'sha256';
export const jwtSecret: string = env.JWT_SECRET;
export const uuidv5NameSpace: string = env.UUIDV5_NS;

export const db = Object.freeze({
    user: env.PGUSER,
    database: env.PGDATABASE,
    password: env.PGPASSWORD,
    host: '127.0.0.1',
    port: env.PGPORT,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
});

// Ensure require('dotenv').config() is run before this module is required
const nodeEnv: string = env.NODE_ENV || 'development';

export const isProduction = () => {
    return 'production' === nodeEnv;
};

export const port: number = Number.parseInt(env.PORT, 10) || 3000;

// Set the HOSTNAME in production for basic CSRF prevention
// Ex: example.com, subdomain.example.com
export const hostname: string = env.HOSTNAME;

if (!hostname) {
    console.warn(
        'Warn: CSRF checks are disabled since there is no HOSTNAME environment variable provided'
    );
}
