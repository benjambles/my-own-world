import Koa from 'koa';

declare module 'koa' {
    interface Request extends BaseRequest {
        params: {
            [name: string]: any;
        };
    }
}
