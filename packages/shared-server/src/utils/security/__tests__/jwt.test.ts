import { getToken } from '../jwt.js';

test('getToken', async () => {
    const result = await getToken(
        'd9d4ea29-8c94-435b-a603-ee59d91d5f15',
        {
            secret1: 'To be used later',
        },
        'f62636c73acd44a9c04a90f2121f629fff84f9e1a557c59d5720a8011bbb54cb',
    );
    expect(result).toMatch(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[\d\w-]*\.[\d\w-]{43}/);
});
