declare module '*.json' {
    const value: any;
    export default value;
}

declare function router(): Router;

interface DbGet {
    limit: number;
    offset: number;
}

interface Router {
    route(routes: JoiRoute[]);
    middleware();
    routes();
}

interface JoiRoute {
    method: string;
    path: string;
    validate: any;
    handler: Function[];
    meta: object;
}

interface Migration {
    up();
    down();
    version: string;
}
