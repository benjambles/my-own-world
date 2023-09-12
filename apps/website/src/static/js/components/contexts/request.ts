import { createContext } from '@lit-labs/context';

type RequestParams = {
    body?: {
        [key: string]: unknown;
    };
    params?: {
        [key: string]: string;
    };
    query?: string | Record<string, string>;
};
type RouteConfig = [string, HttpVerbs, RequestParams, any];

export type ApiMap = Record<string, RouteConfig>;
export type HttpVerbs = 'delete' | 'get' | 'post' | 'put';
export type MowApiInstance = InstanceType<typeof MowApi>;

export const requestSymbol = Symbol('request');
export const requestContext = createContext<MowApiInstance>(requestSymbol);

export class MowApi {
    private _rootUrl;

    constructor(rootUrl: string) {
        this._rootUrl = rootUrl;
    }

    public getRequestor<T extends RouteConfig>(path: T[0], method: T[1]) {
        return async (args: T[2]): Promise<T[3]> =>
            await this._request(path, method, args);
    }

    private async _request<Args extends RequestParams, Res extends any>(
        path: string,
        method: HttpVerbs,
        args: Args,
    ): Promise<Res> {
        const populatedUrl = new URL(this._rootUrl);
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
