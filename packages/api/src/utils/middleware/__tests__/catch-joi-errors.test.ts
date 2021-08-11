import type Koa from 'koa';
import { catchJoiErrors } from '../catch-joi-errors.js';

test('catchJoiErrors', async () => {
    const ctxValid = {};

    await expect(catchJoiErrors(ctxValid as Koa.Context, async () => {})).resolves.not.toThrow();

    const ctxInvalidWithMessage = {
        invalid: {
            body: { msg: "This hasn't got a value" },
            query: {
                details: [
                    {
                        message: 'Complex error',
                        path: ['query,prop1'],
                    },
                ],
            },
        },
        throw: (error, message) => {
            throw new Error(message);
        },
    };

    await expect(
        catchJoiErrors((ctxInvalidWithMessage as unknown) as Koa.Context, async () => {}),
    ).rejects.toThrow();
});
