import * as Koa from 'koa';

declare module 'koa' {
    interface Request {
        body: {} | null | undefined;
        rawBody: {} | null | undefined;
    }

    interface Context {
        disableBodyParser: Boolean;
        invalid: object;
    }

    interface BaseContext {
        api: Boolean;
    }
}
