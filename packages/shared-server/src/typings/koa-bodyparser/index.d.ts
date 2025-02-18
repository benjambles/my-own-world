import Koa from 'koa';

declare module 'koa' {
    interface BaseContext {
        api: boolean;
    }
    interface Context {
        disableBodyParser: boolean;
        invalid: object;
    }
    interface Request {
        body?: unknown;
        rawBody: object | null | undefined;
    }
}
