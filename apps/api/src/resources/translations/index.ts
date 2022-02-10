import config from './config.json' assert { type: 'json' };

/**
 * Routes on /users and /users/*
 * Special auth routes under: /authentication
 */
export default {
    config,
    accessMap: false,
    routeHandlers: {},
};
