import * as Koa from 'koa';

declare module "koa" {
    interface Context {
        disableBodyParser: Boolean;
    }

    interface BaseContext {
        api: Boolean;
    }
}