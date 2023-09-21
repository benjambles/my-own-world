import Koa from 'koa';

declare module 'koa' {
    interface Request extends BaseRequest {
        state: {
            user: {
                sub: string;
            };
        };
    }
}
