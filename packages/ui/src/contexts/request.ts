import { buildUrl, parseResponse } from '@benjambles/mow-server/dist/utils/fetch.js';
import { KoaRequestParams } from '@benjambles/mow-server/dist/utils/joi/context/context.js';
import { createContext } from '@lit-labs/context';

type RouteConfig = [string, HttpVerbs, KoaRequestParams, any];

export type ApiMap = Record<string, RouteConfig>;
export type HttpVerbs = 'delete' | 'get' | 'post' | 'put';
export type MowApiInstance = InstanceType<typeof MowApi>;

export const requestSymbol = Symbol('request');
export const requestContext = createContext<MowApiInstance>(requestSymbol);

export type Handlers<T extends ApiMap> = Partial<{
    [key in keyof T]: (args: T[key][2], authToken?: string) => Promise<T[key][3]>;
}>;

export class MowApi {
    private rootUrl;
    private apiPrefix;

    constructor(rootUrl: string, apiPrefix: string = '') {
        this.rootUrl = rootUrl;
        this.apiPrefix = apiPrefix;
    }

    getRequestor<T extends RouteConfig>(path: T[0], method: T[1]) {
        return async (args: T[2], authToken?: string): Promise<T[3]> =>
            await this.request(path, method, args, authToken);
    }

    private async request<Args extends KoaRequestParams, Res extends any>(
        path: string,
        method: HttpVerbs,
        args: Args,
        authToken?: string,
    ): Promise<Res> {
        const populatedUrl = buildUrl({
            path,
            rootUrl: this.rootUrl,
            urlParams: args,
            prefix: this.apiPrefix,
        });

        const body = args.body ? { body: JSON.stringify(args.body) } : {};

        const response = await fetch(populatedUrl, {
            ...body,
            cache: 'default',
            headers: {
                'Content-Type': 'application/json',
                ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
            },
            method,
            mode: 'cors',
        });

        return parseResponse(response);
    }
}
