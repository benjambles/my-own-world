import * as router from 'koa-joi-router';
import Homepage from './homepage';
import Register from './account/register';
import Terms from './terms/terms';

export default [Homepage, Register, Terms].map(routeConfig => router().route(routeConfig));
