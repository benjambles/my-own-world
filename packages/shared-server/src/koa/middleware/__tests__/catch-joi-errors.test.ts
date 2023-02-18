import Koa from 'koa';
import { catchJoiErrors } from '../catch-joi-errors.js';

test('catchJoiErrors', async () => {
    const ctxValid = {};

    await expect(
        catchJoiErrors(false)(ctxValid as Koa.Context, async () => {}),
    ).resolves.not.toThrow();

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
        catchJoiErrors(false)(
            ctxInvalidWithMessage as unknown as Koa.Context,
            async () => {},
        ),
    ).rejects.toThrow();
});
