export const responseStatuses = Object.freeze({
    success: "success"
});

export const EncryptionData = Object.freeze({
    type: 'aes192',
    password: 'stupid random password', // TODO have this as env var or pulled from amazon keystore
});

export const HashType = 'sha256';
export const hex = 'hex';
export const utf8 = 'utf8';
export const jwtSecret = 'dummy secret';