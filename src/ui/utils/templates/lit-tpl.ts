import { ClientContext, ClientResult } from './client-context.js';
import { ServerContext, ServerResult } from './server-context.js';

export interface LitTpl<P> {
    (context: ClientContext, data: P, children?: ClientResult): ClientResult;
    (context: ServerContext, data: P, children?: ServerResult): ServerResult;
}
