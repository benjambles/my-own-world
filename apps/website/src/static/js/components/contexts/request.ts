import { createContext } from '@lit-labs/context';

type RequestParams = {
    body?: {
        [key: string]: unknown;
    };
    params?: {
        [key: string]: string;
    };
    query?: string | Record<string, string>;
    headers?: Record<string, string>;
};
type RouteConfig = [string, HttpVerbs, RequestParams, any];

export type ApiMap = Record<string, RouteConfig>;
export type HttpVerbs = 'delete' | 'get' | 'post' | 'put';
export type MowApiInstance = InstanceType<typeof MowApi>;

export const requestSymbol = Symbol('request');
export const requestContext = createContext<MowApiInstance>(requestSymbol);

export class MowApi {
    private rootUrl;

    constructor(rootUrl: string) {
        this.rootUrl = rootUrl;
    }

    getRequestor<T extends RouteConfig>(path: T[0], method: T[1]) {
        return async (args: T[2], authToken?: string): Promise<T[3]> =>
            await this.request(path, method, args, authToken);
    }

    private async request<Args extends RequestParams, Res extends any>(
        path: string,
        method: HttpVerbs,
        args: Args,
        authToken?: string,
    ): Promise<Res> {
        const populatedUrl = new URL(this.rootUrl);
        const populatedPath = Object.entries(args.params ?? {}).reduce(
            (acc, [key, value]) => acc.replace(`:${key}`, value),
            path,
        );

        populatedUrl.pathname += populatedPath;

        populatedUrl.search += new URLSearchParams(args.query ?? '').toString();

        const resp: Response = await fetch(populatedUrl, {
            body: args.body ? JSON.stringify(args.body) : '',
            cache: 'default',
            headers: {
                'Content-Type': 'application/json',
                ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
            },
            method,
            mode: 'cors',
        });

        const contentType = resp.headers.get('Content-Type');
        const responseBody = await (contentType.includes('application/json')
            ? resp.json()
            : resp.text());

        if (resp.status > 400) {
            throw new Error(responseBody);
        }

        return responseBody;
    }
}
