#!/usr/bin/env node
import Koa from 'koa';
import errorHandler from 'koa-better-error-handler';
import { boot, listen } from '../../shared-server/koa/app';
import { getMiddleware } from './get-middleware';

boot({
    koa: new Koa(),
    errorHandler,
    isApi: false,
    getMiddleware,
    listener: listen,
})(process);
