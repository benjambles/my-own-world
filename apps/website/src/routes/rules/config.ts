const index = '/rules';
export const rulesPaths = {
    index: { text: 'The Rules', href: index },
    quickstart: { text: 'Quickstart', href: `${index}/quick-start` },
    turnorder: { text: 'Turn Order', href: `${index}/turn-order` },
    operatives: { text: 'Operatives', href: `${index}/operatives` },
    skirmishes: { text: 'Skirmishes', href: `${index}/skirmishes` },
    campaigns: { text: 'Campaigns', href: `${index}/campaigns` },
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
        [rulesPaths.index.href]: {
            get: {
                tags: ['rules'],
                summary: 'The index page for the rules',
                description: '',
                operationId: 'getRules',
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
        [rulesPaths.quickstart.href]: {
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
        [rulesPaths.turnorder.href]: {
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
        [rulesPaths.operatives.href]: {
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
        [rulesPaths.skirmishes.href]: {
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
        [rulesPaths.campaigns.href]: {
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
