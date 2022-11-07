declare module '*.json' {
    const value: any;
    export default value;
}

interface DbGet {
    limit: number;
    offset: number;
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
