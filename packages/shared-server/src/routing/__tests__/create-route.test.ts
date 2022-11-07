import { Joi } from 'koa-joi-router';
import { createRoute } from '../create-route.js';

// TS-Jest doesn't seem to import the router the same as node does...
test.skip('createRoute', () => {
    const handler = jest.fn();
    const testRouteMap = {
        method: 'get',
        path: '/get/test/data',
        handler,
        validate: Joi,
        meta: {
            summary: 'A test endpoint',
            description: 'A wordy description of the endpoint',
        },
    };

    const result = createRoute('test_api')(testRouteMap);
    expect(result.stack[0].path).toEqual('/test_api/get/test/data');
    expect(result.stack[0].methods).toEqual(['HEAD', 'GET']);
});
