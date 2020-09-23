import { ClientContext, ClientResult } from './client-context';
import { ServerContext, ServerResult } from './server-context';

export interface LitTpl<P> {
    (context: ClientContext, data: P, children?: ClientResult): ClientResult;
    (context: ServerContext, data: P, children?: ServerResult): ServerResult;
}
