import { KoaContext } from '@benjambles/mow-server/dist/utils/joi/context/context.js';
import { mockData } from '@benjambles/mow-ui/utils.js';

export async function getMockData<T extends KoaContext<any, any, any>>(ctx: T) {
    console.log(ctx);
    return mockData;
}
