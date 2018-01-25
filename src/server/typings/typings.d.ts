declare module "*.json" {
    const value: any;
    export default value;
}

interface APIResponse {
    meta: APIMeta;
    body: APIBody;
}

interface APIMeta {
    message?: string;
    lastModified?: string;
}

interface APIBody {
    description?: string;
    [propName: string]: any;
}

interface iError {
    status: number;
    message: string;
}

interface APIError {
    statusCode: number;
    message: string;
    id: string;
}

declare function router(): iRouter;

interface dbGet {
    limit: number;
    offset: number;
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
}

interface swaggerParamOpts {
    lowercase: boolean;
    email: boolean;
    max: number;
}

declare namespace User {
    interface UserData {
        uuid: string;
        screenName: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }
}
