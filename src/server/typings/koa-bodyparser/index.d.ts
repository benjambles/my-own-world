import * as Koa from 'koa';

declare module 'koa' {
    interface Context {
        disableBodyParser: Boolean;
        invalid: object;
    }

    interface BaseContext {
        api: Boolean;
    }
}
