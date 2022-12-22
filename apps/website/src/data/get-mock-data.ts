import { KoaContext } from '@benjambles/mow-server/dist/index.js';
import { mockData } from '@benjambles/mow-ui/dist/utils/mock-data.js';

export function getMockData(ctx: KoaContext) {
    console.log(ctx);
    return mockData;
}
