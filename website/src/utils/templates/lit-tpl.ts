import { clientContext, clientResult } from './client-context';
import { serverContext, serverResult } from './server-context';

export interface LitTpl<P> {
    (context: clientContext, data?: P): clientResult;
    (context: serverContext, data?: P): serverResult;
}
