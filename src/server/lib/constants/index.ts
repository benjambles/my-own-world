import * as path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
const env = require('dotenv').config({ path: envPath }).parsed;

export const responseStatuses = Object.freeze({
    success: "success"
});

export const EncryptionData = Object.freeze({
    type: 'aes192',
    password: env.ENC_SECRET, // TODO have this as env var or pulled from amazon keystore
});

export const HashType = 'sha256';
export const hex = 'hex';
export const utf8 = 'utf8';
export const jwtSecret = env.JWT_SECRET;
export const uuidv5_NS = env.UUIDV5_NS;