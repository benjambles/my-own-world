export default {
    openapi: '3.0.0',
    info: {
        title: 'Account routes',
        description:
            'Routes relating to the creation and management of user accounts for the platform.',
        version: '1.0.0',
    },
    paths: {
        '': {
            get: {
                tags: ['public'],
                summary: 'Shows the user their account home page',
                description: '',
                operationId: 'getHome',
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
        '/privacy-policy': {
            get: {
                tags: ['public', 'legal'],
                summary: 'Shows the user their account home page',
                description: '',
                operationId: 'getPrivacyPolicy',
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
        '/terms': {
            get: {
                tags: ['public', 'legal'],
                summary: 'Shows the user their account home page',
                description: '',
                operationId: 'getTerms',
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
        '/accessibility-policy': {
            get: {
                tags: ['public', 'legal'],
                summary: 'Shows the user their account home page',
                description: '',
                operationId: 'getAccessibilityPolicy',
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
