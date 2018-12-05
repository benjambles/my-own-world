import { resolve } from 'path';

const envPath: string = resolve(__dirname, '../../.env');
const env = require('dotenv').config({ path: envPath }).parsed;

export const serverRootPath: string = resolve(__dirname, '../../');
export const schemaPath: string = resolve(serverRootPath, 'db/sql');
export const routesPath: string = resolve(serverRootPath, 'routes');

export const responseStatuses = Object.freeze({
    success: 'success'
});

export const EncryptionData = Object.freeze({
    ivLength: 16,
    password: env.ENC_SECRET, // TODO have this as env var or pulled from amazon keystore
    type: 'aes-256-cbc'
});

export const HashType: string = 'sha256';
export const jwtSecret: string = env.JWT_SECRET;
export const uuidv5_NS: string = env.UUIDV5_NS;

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
export const NODE_ENV: string = env.NODE_ENV || 'development';
export const PORT: number = Number.parseInt(env.PORT, 10) || 3000;

// Set the HOSTNAME in production for basic CSRF prevention
// Ex: example.com, subdomain.example.com
export const HOSTNAME: string = env.HOSTNAME;

if (!HOSTNAME) {
    console.warn(
        'Warn: CSRF checks are disabled since there is no HOSTNAME environment variable provided'
    );
}
