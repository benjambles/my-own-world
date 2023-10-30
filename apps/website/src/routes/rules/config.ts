const index = '/rules';
export const rulesPaths = {
    index,
    quickstart: `${index}/quick-start`,
    turnorder: `${index}/turn-order`,
    operatives: `${index}/operatives`,
    skirmishes: `${index}/skirmishes`,
    campaigns: `${index}/campaigns`,
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
        [rulesPaths.quickstart]: {
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
        [rulesPaths.turnorder]: {
            get: {
                tags: ['rule'],
                summary: 'Serves the user the Turn Order rules page',
                description: '',
                operationId: 'getTurnOrder',
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
        [rulesPaths.operatives]: {
            get: {
                tags: ['rule'],
                summary: 'Serves the user the Operatives rules page',
                description: '',
                operationId: 'getOperatives',
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
        [rulesPaths.skirmishes]: {
            get: {
                tags: ['rule'],
                summary: 'Serves the user the Skirmishes rules page',
                description: '',
                operationId: 'getSkirmishes',
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
        [rulesPaths.campaigns]: {
            get: {
                tags: ['rule'],
                summary: 'Serves the user the Campaigns rules page',
                description: '',
                operationId: 'getCampaigns',
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
