import * as Koa from 'koa';

declare module 'koa' {
    interface Request {
        body: {} | null | undefined;
        rawBody: {} | null | undefined;
    }

    interface Context {
        disableBodyParser: boolean;
        invalid: object;
    }

    interface BaseContext {
        api: boolean;
    }
}
