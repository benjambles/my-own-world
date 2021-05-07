import { decryptValue, encryptValue, hmac } from '../encryption.js';

const testStr = 'this is my value';
const encrpytedResult =
    'aes-256-cbc:25aa7a7bb9f94eaa75535ac7531dabe4:faf9bf3fb566d1a834b4dac62e4650004a26cede3815cc85089730ebf9bde82b';
const dummyKey = 'XApHrj7g9FTPqX5hYxWiJuXHYewyygGG';

test('encryptValue', () => {
    const result = encryptValue(dummyKey, testStr);
    expect(result).toMatch(/aes-256-cbc:[0-9a-f]{32}:[0-9a-f]{64}/);
});

test('decryptValue', () => {
    const result = decryptValue(dummyKey, encrpytedResult);
    expect(result).toEqual(testStr);
});

test('hmac', () => {
    const expectResult = 'f62636c73acd44a9c04a90f2121f629fff84f9e1a557c59d5720a8011bbb54cb';
    const result = hmac(dummyKey, testStr);
    expect(result).toEqual(expectResult);
});
