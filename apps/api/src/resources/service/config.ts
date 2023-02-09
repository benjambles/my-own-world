export default {
    openapi: '3.0.0',
    info: {
        title: 'Services',
        description: 'Routes relating to the health and status of the platform',
        version: '1.0.0',
    },
    paths: {
        '/health': {
            get: {
                tags: ['services', 'health'],
                summary: 'An endpoint to check the overall health of the platform',
                description: '',
                operationId: 'getHealth',
                parameters: [],
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
                    '503': {},
                },
                security: [],
            },
            options: {
                tags: ['services', 'health', 'options'],
                summary:
                    'Check which endpoints are available for checking the health of the platform',
                description: '',
                operationId: 'sendOptions',
                parameters: [],
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
                security: [],
            },
        },

        '/version': {
            get: {
                tags: ['services', 'version'],
                summary: 'Return the current running build version of the API',
                description: '',
                operationId: 'getVersion',
                parameters: [],
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
                security: [],
            },
            options: {
                tags: ['services', 'version', 'options'],
                summary:
                    'Check which endpoints are available for checking the version of the API available',
                description: '',
                operationId: 'sendOptions',
                parameters: [],
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
                security: [],
            },
        },

        '/status': {
            get: {
                tags: ['services', 'status'],
                summary: 'Retrieve data related to the current platform status',
                description: '',
                operationId: 'getStatus',
                parameters: [],
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
                security: [],
            },
            options: {
                tags: ['services', 'status', 'options'],
                summary:
                    'Check which endpoints are available for checking status of the platform',
                description: '',
                operationId: 'sendOptions',
                parameters: [],
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
                security: [],
            },
        },
        '/metrics': {
            get: {
                tags: ['services', 'metrics'],
                summary: 'Retrieve metrics related to the platforms current availability',
                description: '',
                operationId: 'getMetrics',
                parameters: [],
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
                security: [],
            },
            options: {
                tags: ['services', 'metrics', 'options'],
                summary:
                    'Check which endpoints are available for checking metrics related to the platform status',
                description: '',
                operationId: 'sendOptions',
                parameters: [],
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
                security: [],
            },
        },
        '/debug': {
            get: {
                tags: ['services', 'debug'],
                summary:
                    'Retrieve debug information about the service, such as env variables and package.json',
                description: '',
                operationId: 'getDebugData',
                parameters: [],
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
                        http: ['role:admin'],
                    },
                ],
            },
            options: {
                tags: ['services', 'debug', 'options'],
                summary:
                    'Check which endpoints are available for checking debug information for the platform',
                description: '',
                operationId: 'sendOptions',
                parameters: [],
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
                        http: ['role:admin'],
                    },
                ],
            },
        },
    },
} as const;
