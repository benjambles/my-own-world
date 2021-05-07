import { getToken } from '../jwt.js';

test('getToken', async () => {
    const result = await getToken('d9d4ea29-8c94-435b-a603-ee59d91d5f15', {
        secret1: 'To be used later',
    });
    expect(result).toMatch(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[\d\w-]{86}\.[\d\w-]{43}/);
});
