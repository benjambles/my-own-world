export default {
    openapi: '3.0.0',
    info: {
        title: 'Roster',
        description: 'The roster application for managing game sessions',
        version: '1.0.0',
    },
    paths: {
        '/roster': {
            get: {
                tags: ['roster'],
                summary: 'Display a list of all the users game sessions',
                description: '',
                operationId: 'getRosters',
                parameters: [
                    {
                        name: 'limit',
                        in: 'query',
                        description: 'How many records to fetch',
                        schema: {
                            default: 10,
                            format: 'int64',
                            type: 'integer',
                        },
                    },
                    {
                        name: 'offset',
                        in: 'query',
                        description: 'How many records to skip',
                        schema: {
                            default: 0,
                            format: 'int64',
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'ok',
                        content: {
                            'text/html': {
                                schema: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:user'] }],
            },
        },
        '/roster/new-skirmish': {
            get: {
                tags: ['roster'],
                summary: 'Returns the page for creating a new Skirmish roster',
                description: '',
                operationId: 'getNewSkirmish',
                parameters: [],
                responses: {
                    '200': {
                        description: 'ok',
                        content: {
                            'text/html': {
                                schema: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:user'] }],
            },
            post: {
                tags: ['roster'],
                summary: 'Creates a new Skirmish roster and redirects to the result',
                description: '',
                operationId: 'postNewSkirmish',
                parameters: [],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: [],
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    '303': {
                        description: 'OK,',
                    },
                },
                security: [
                    {
                        http: ['role:admin'],
                    },
                ],
            },
        },
        '/roster/new-campaign': {
            get: {
                tags: ['roster'],
                summary: 'Returns the page for creating a new Campaign roster',
                description: '',
                operationId: 'getNewCampaign',
                parameters: [],
                responses: {
                    '200': {
                        description: 'ok',
                        content: {
                            'text/html': {
                                schema: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:user'] }],
            },
            post: {
                tags: ['roster'],
                summary: 'Creates a new Campaign roster and redirects to the result',
                description: '',
                operationId: 'postNewCampaign',
                parameters: [],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: [],
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    '303': {
                        description: 'OK,',
                    },
                },
                security: [
                    {
                        http: ['role:admin'],
                    },
                ],
            },
        },
        '/roster/:rosterId': {
            get: {
                tags: ['roster'],
                summary: 'Fetches the roster with the ID matching the url parameter',
                description: '',
                operationId: 'getRosterById',
                parameters: [
                    {
                        name: 'rosterId',
                        in: 'path',
                        description: 'Unique id representing a roster',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'ok',
                        content: {
                            'text/html': {
                                schema: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:user', 'role:owner'] }],
            },
            post: {
                tags: ['roster'],
                summary: 'Updates the roster at the ID given with the values provided',
                description: '',
                operationId: 'updateRosterById',
                parameters: [
                    {
                        name: 'rosterId',
                        in: 'path',
                        description: 'Unique id representing a roster',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: [],
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'ok',
                        content: {
                            'text/html': {
                                schema: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
                security: [
                    {
                        http: ['role:admin', 'role:owner'],
                    },
                ],
            },
        },
    },
} as const;
