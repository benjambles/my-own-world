import { resolve } from 'path';

const envPath: string = resolve(__dirname, '../.env');
const env = require('dotenv').config({ path: envPath }).parsed;

export const serverRootPath: string = resolve(__dirname, '../');
export const routesPath: string = resolve(serverRootPath, 'routes');

export const jwtSecret: string = env.JWT_SECRET;

export const responseStatuses = Object.freeze({
    success: 'success'
});

// Ensure require('dotenv').config() is run before this module is required
const nodeEnv: string = env.NODE_ENV || 'development';

export const isProduction = () => {
    return 'production' === nodeEnv;
};

export const port: number = Number.parseInt(env.PORT, 10) || 3001;

// Set the HOSTNAME in production for basic CSRF prevention
// Ex: example.com, subdomain.example.com
export const hostname: string = env.HOSTNAME;

if (!hostname) {
    console.warn(
        'Warn: CSRF checks are disabled since there is no HOSTNAME environment variable provided'
    );
}
