export default {
    openapi: '3.0.0',
    info: {
        title: 'Tales',
        description: 'Routes relating to the tales on the platform',
        version: '1.0.0',
    },
    paths: {
        '/tales': {
            get: {
                tags: ['tales'],
                summary: 'Fetches all the tales in the platform',
                description: '',
                operationId: 'getTales',
                parameters: [
                    {
                        name: 'limit',
                        in: 'query',
                        description: 'How many records to fetch',
                        schema: {
                            default: 10,
                            type: 'integer',
                            format: 'int64',
                        },
                    },
                    {
                        name: 'offset',
                        in: 'query',
                        description: 'How many records to skip',
                        schema: {
                            default: 10,
                            type: 'integer',
                            format: 'int64',
                        },
                    },
                ],
                responses: {},
                security: [],
            },
            post: {
                tags: ['tale'],
                summary: 'Add a new tale to the platform',
                description: '',
                operationId: 'createTale',
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'text/plain': {
                                schema: {
                                    type: 'string',
                                    example: 'pong',
                                },
                            },
                        },
                    },
                },
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['ownerId', 'name', 'summary', 'description'],
                                properties: {
                                    ownerId: {
                                        type: 'string',
                                        maxLength: 32,
                                    },
                                    name: {
                                        type: 'string',
                                        maxLength: 250,
                                    },
                                    summary: {
                                        type: 'string',
                                        maxLength: 250,
                                    },
                                    description: {
                                        type: 'string',
                                        maxLength: 250,
                                    },
                                },
                            },
                        },
                    },
                },
                security: [],
            },
            options: {
                tags: ['tales', 'options'],
                summary: 'Check which endpoints are available for interacting with tales',
                description: '',
                operationId: 'sendOptions',
                consumes: [],
                produces: ['application/json'],
                parameters: [],
                responses: {},
                security: [],
            },
        },
        '/tales/:taleId': {
            get: {
                tags: ['tale'],
                summary: 'Fetches the tale with the ID matching the url parameter',
                description: '',
                operationId: 'getTaleById',
                parameters: [
                    {
                        name: 'taleId',
                        in: 'path',
                        description: 'Unique id representing a tale',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'text/plain': {
                                schema: {
                                    type: 'string',
                                    example: 'pong',
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:tale'] }],
            },
            put: {
                tags: ['tale'],
                summary: 'Updates the tale at the ID given with the values provided',
                description: '',
                operationId: 'updateTaleById',
                parameters: [
                    {
                        name: 'taleId',
                        in: 'path',
                        description: 'Unique id representing a tale',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: [],
                                properties: {
                                    name: {
                                        type: 'string',
                                        maxLength: 250,
                                    },
                                    summary: {
                                        type: 'string',
                                        maxLength: 250,
                                    },
                                    description: {
                                        type: 'string',
                                        maxLength: 250,
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'text/plain': {
                                schema: {
                                    type: 'string',
                                    example: 'pong',
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
            delete: {
                tags: ['tale'],
                summary: 'Deletes the tale with the given ID',
                description: '',
                operationId: 'deleteTaleById',
                parameters: [
                    {
                        name: 'taleId',
                        in: 'path',
                        description: 'Unique id representing a tale',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'text/plain': {
                                schema: {
                                    type: 'string',
                                    example: 'pong',
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
            options: {
                tags: ['tales', 'options'],
                summary: 'Check which endpoints are available for interacting with tales',
                description: '',
                operationId: 'sendOptions',
                consumes: [],
                produces: ['application/json'],
                parameters: [],
                responses: {},
                security: [],
            },
        },
    },
} as const;
