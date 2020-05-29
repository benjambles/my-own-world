#!/usr/bin/env node
import Koa from 'koa';
import { boot, listen } from '../../shared-server/koa/app';
import { applyMiddleware } from '../apply-middleware';

boot(applyMiddleware(new Koa()), listen)(process);
