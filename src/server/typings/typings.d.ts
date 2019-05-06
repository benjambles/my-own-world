declare module '*.json' {
    const value: any;
    export default value;
}

declare function router(): iRouter;

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
    { [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>> }[Keys];

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
    { [K in Keys]-?: Required<Pick<T, K>> }[Keys];

interface ResponseData {
    parts?: {
        body: any;
        meta: any;
    };
    data?: any;
    status?: number;
}

type ApiResponse = RequireOnlyOne<ResponseData, 'parts' | 'data'>;

interface APIMeta {
    message?: string;
    lastModified?: string;
}

interface iError {
    status: number;
    message: string;
}

declare namespace iDB {
    interface kv {
        keys: string[];
        values: string[];
    }
}

interface dbGet {
    limit: number;
    offset: number;
}

interface dbData {
    [propName: string]: string;
}

interface iRouter {
    route(routes: joiRoute[]);
    middleware();
}

interface migration {
    up();
    down();
    version: string;
}

interface joiRoute {
    method: string;
    path: string;
    validate: any;
    handler: Function[];
    meta: object;
}

interface swaggerParam {
    name: string;
    in: string;
    description: string;
    required: boolean;
    type: string;
    format: string;
    opts?: swaggerParamOpts;
    values: swaggerParam[];
}

interface swaggerParamOpts {
    lowercase?: boolean;
    email?: boolean;
    max?: number;
    min?: number;
}

type swaggerTypeConfig = [string, any] | null;

interface formatOptions {
    encrypted?: string[];
    salted?: string[];
    hmac?: string[];
    readOnly?: string[];
}
