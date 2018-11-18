declare module '*.json' {
    const value: any;
    export default value;
}

declare function router(): iRouter;

declare namespace ApiResponse {
    interface parts {
        parts: any[];
    }

    interface data {
        data: any;
    }

    type response = parts | data;
}

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
    opts: swaggerParamOpts;
    values: swaggerParam[];
}

interface swaggerParamOpts {
    lowercase: boolean;
    email: boolean;
    max: number;
    min: number;
}
