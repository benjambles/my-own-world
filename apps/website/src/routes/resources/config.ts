export const resourcePaths = {
    tools: '/tools',
    downloads: '/downloads',
    codex: '/codex',
} as const;

export default {
    openapi: '3.0.0',
    info: {
        title: 'Tools',
        description:
            'Routes relating to the creation and management of tools for the platform.',
        version: '1.0.0',
    },
    paths: {
        [resourcePaths.tools]: {
            get: {
                tags: ['tool'],
                summary:
                    'Returns the page that lists all of the game aids available to the player',
                description: '',
                operationId: 'getTools',
                parameters: [],
                responses: {
                    200: {
                        description: 'OK,',
                        content: {
                            'text/html': {
                                schema: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
                security: [],
            },
        },
        [resourcePaths.downloads]: {
            get: {
                tags: ['downloads'],
                summary:
                    'Returns the page that lists all of the game downloads available to the player',
                description: '',
                operationId: 'getDownloads',
                parameters: [],
                responses: {
                    200: {
                        description: 'OK,',
                        content: {
                            'text/html': {
                                schema: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
                security: [],
            },
        },
        [resourcePaths.codex]: {
            get: {
                tags: ['codex'],
                summary: 'Returns the monster manual page',
                description: '',
                operationId: 'getCodex',
                parameters: [],
                responses: {
                    200: {
                        description: 'OK,',
                        content: {
                            'text/html': {
                                schema: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
                security: [],
            },
        },
    },
} as const;
