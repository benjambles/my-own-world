import { mockData } from '@benjambles/mow-ui/mock-data.js';
import { Context } from 'koa';

export function getMockData(ctx: Context) {
    console.log(ctx);
    return mockData;
}
