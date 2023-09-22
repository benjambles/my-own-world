const index = '/user';
export const paths = {
    account: `${index}/account`,
    login: `${index}/authenticate`,
    logout: `${index}/signoff`,
    signup: `${index}/joinup`,
} as const;

export default {
    openapi: '3.0.0',
    info: {
        title: 'Account routes',
        description:
            'Routes relating to the creation and management of user accounts for the platform.',
        version: '1.0.0',
    },
    paths: {
        [paths.account]: {
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
        [paths.signup]: {
            get: {
                tags: ['account'],
                summary: 'Renders the user registration page',
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
        [paths.login]: {
            get: {
                tags: ['account'],
                summary: 'Renders the user login page',
                description: '',
                operationId: 'getLogIn',
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
        [paths.logout]: {
            get: {
                tags: ['account'],
                summary: 'Logs the user out and renders the log in page',
                description: '',
                operationId: 'getLogOut',
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
