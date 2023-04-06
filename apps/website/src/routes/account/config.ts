export default {
    openapi: '3.0.0',
    info: {
        title: 'Account routes',
        description:
            'Routes relating to the creation and management of user accounts for the platform.',
        version: '1.0.0',
    },
    paths: {
        '/account': {
            get: {
                tags: ['account'],
                summary: 'Shows the user their account home page',
                description: '',
                operationId: 'getAccount',
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
        },
        '/join': {
            get: {
                tags: ['account'],
                summary: 'Shows the user their account home page',
                description: '',
                operationId: 'getSignUp',
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
                security: [],
            },
        },
    },
} as const;
