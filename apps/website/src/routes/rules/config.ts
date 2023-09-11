const index = '/rules';
export const paths = {
    index,
    quickstart: `${index}/quick-start`,
} as const;

export default {
    openapi: '3.0.0',
    info: {
        title: 'Rules',
        description:
            'Routes relating to the creation and management of rules for the platform.',
        version: '1.0.0',
    },
    paths: {
        [paths.quickstart]: {
            get: {
                tags: ['rule'],
                summary: 'Serves the user the Quick Start rules page',
                description: '',
                operationId: 'getQuickStart',
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
