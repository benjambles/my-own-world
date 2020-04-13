import { resolve } from 'path';

const envPath: string = resolve(__dirname, '../.env');
const env = require('dotenv').config({ path: envPath }).parsed;

export const serverRootPath: string = resolve(__dirname, '../');
export const schemaPath: string = resolve(serverRootPath, 'db/sql');
export const routesPath: string = resolve(serverRootPath, 'routes');

export const responseStatuses = Object.freeze({
    success: 'success',
});

export const encryptionData = Object.freeze({
    ivLength: 16,
    password: env.ENC_SECRET,
    type: 'aes-256-cbc',
});

export const hashType: string = 'sha256';
export const jwtSecret: string = env.JWT_SECRET;
export const uuidv5NameSpace: string = env.UUIDV5_NS;

export const MONGO_DB = Object.freeze({
    user: env.MONGO_USER,
    database: env.MONGO_DB,
    password: env.MONGO_PASSWORD,
    url: env.MONGO_URL,
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
