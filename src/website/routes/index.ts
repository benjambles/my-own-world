import * as router from 'koa-joi-router';
import Homepage from './homepage';
import Register from './account/register';

export default [Homepage, Register].map(routeConfig => router().route(routeConfig));
