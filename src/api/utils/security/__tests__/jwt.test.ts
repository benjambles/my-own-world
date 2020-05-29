import { getToken } from '../jwt';

test('getToken', async () => {
    const result = await getToken({ secret1: 'To be used later' });
    expect(result).toMatch(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[\d\w-]{86}\.[\d\w-]{43}/);
});
