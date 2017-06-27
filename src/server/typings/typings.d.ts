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
    description?: String;
    [propName: string]: any;
}

interface APIError {
    statusCode: number;
    message: String;
    id: String;
}

declare function router(): iRouter;

interface iRouter {
    route(routes: joiRoute[]);
    middleware();
}

interface joiRoute {
    method: string;
    path: string;
    handler: Function[];
}

interface swaggerParam {
    name: string;
    in: string;
    description: string;
    required: boolean;
    type: string;
    opts: swaggerParamOpts;
}

interface swaggerParamOpts {
    lowercase: boolean;
    email: boolean;
    max: number;
}