export default {
    openapi: '3.0.0',
    info: {
        title: 'User Routes',
        description:
            'Routes relating to the creation and management of users for the platform.',
        version: '1.0.0',
    },
    paths: {
        '/users': {
            get: {
                tags: ['user'],
                summary: 'Fetches all users for the platform',
                description: '',
                operationId: 'getUsers',
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
                            default: 0,
                            type: 'integer',
                            format: 'int64',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'ok',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        description: 'The authenticated users data',
                                        type: 'object',
                                        required: [
                                            '_id',
                                            'createdOn',
                                            'lastLoggedIn',
                                            'firstName',
                                            'lastName',
                                            'isDeleted',
                                            'screenName',
                                        ],
                                        properties: {
                                            _id: {
                                                type: 'string',
                                            },
                                            createdOn: {
                                                type: 'string',
                                            },
                                            lastLoggedIn: {
                                                type: 'string',
                                            },
                                            firstName: {
                                                type: 'string',
                                            },
                                            lastName: {
                                                type: 'string',
                                            },
                                            isDeleted: {
                                                type: 'boolean',
                                            },
                                            screenName: {
                                                type: 'string',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                security: [],
            },
            post: {
                tags: ['user'],
                summary: 'Add a new user to the platform',
                description: '',
                operationId: 'createUser',
                responses: {
                    '201': {
                        description: 'Created',
                        content: {
                            'application/json': {
                                schema: {
                                    description: 'The authenticated users data',
                                    type: 'object',
                                    required: [
                                        '_id',
                                        'createdOn',
                                        'lastLoggedIn',
                                        'firstName',
                                        'lastName',
                                        'isDeleted',
                                        'screenName',
                                    ],
                                    properties: {
                                        _id: {
                                            type: 'string',
                                        },
                                        createdOn: {
                                            type: 'string',
                                        },
                                        lastLoggedIn: {
                                            type: 'string',
                                        },
                                        firstName: {
                                            type: 'string',
                                        },
                                        lastName: {
                                            type: 'string',
                                        },
                                        isDeleted: {
                                            type: 'boolean',
                                        },
                                        screenName: {
                                            type: 'string',
                                        },
                                    },
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
                                required: ['user', 'identifier'],
                                properties: {
                                    identifier: {
                                        type: 'object',
                                        required: ['identifier', 'type'],
                                        properties: {
                                            identifier: {
                                                description:
                                                    'An identifier of type email or social token',
                                                type: 'string',
                                                maxLength: 256,
                                            },
                                            type: {
                                                description:
                                                    'The type of identifier being stored, email or social',
                                                type: 'string',
                                                maxLength: 256,
                                            },
                                        },
                                    },
                                    user: {
                                        type: 'object',
                                        required: [
                                            'firstName',
                                            'lastName',
                                            'password',
                                            'screenName',
                                        ],
                                        properties: {
                                            firstName: {
                                                description:
                                                    'An identifier of type email or social token',
                                                type: 'string',
                                                maxLength: 256,
                                            },
                                            lastName: {
                                                description:
                                                    'The type of identifier being stored, email or social',
                                                type: 'string',
                                                maxLength: 256,
                                            },
                                            password: {
                                                description:
                                                    'The users password in plain text',
                                                type: 'string',
                                                maxLength: 256,
                                            },
                                            screenName: {
                                                description:
                                                    'The name that will be shown for the user on the site',
                                                type: 'string',
                                                maxLength: 256,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                security: [],
            },
            options: {
                tags: ['user', 'options'],
                summary: 'Check which endpoints are available to the authenticated user',
                description: '',
                operationId: 'sendOptions',
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
        '/users/:userId': {
            get: {
                tags: ['user'],
                summary: 'Fetches the user with the ID matching the url parameter',
                description: '',
                operationId: 'getUserById',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'Unique id representing a user',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    description: 'The authenticated users data',
                                    type: 'object',
                                    required: [
                                        '_id',
                                        'createdOn',
                                        'lastLoggedIn',
                                        'firstName',
                                        'lastName',
                                        'isDeleted',
                                        'screenName',
                                    ],
                                    properties: {
                                        _id: {
                                            type: 'string',
                                        },
                                        createdOn: {
                                            type: 'string',
                                        },
                                        lastLoggedIn: {
                                            type: 'string',
                                        },
                                        firstName: {
                                            type: 'string',
                                        },
                                        lastName: {
                                            type: 'string',
                                        },
                                        isDeleted: {
                                            type: 'boolean',
                                        },
                                        screenName: {
                                            type: 'string',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:user'] }],
            },
            put: {
                tags: ['user'],
                summary: 'Updates the user at the ID given with the values provided',
                description: '',
                operationId: 'updateUserById',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'Unique id representing a user',
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
                                    firstName: {
                                        description:
                                            'An identifier of type email or social token',
                                        type: 'string',
                                        maxLength: 256,
                                    },
                                    lastName: {
                                        description:
                                            'The type of identifier being stored, email or social',
                                        type: 'string',
                                        maxLength: 256,
                                    },
                                    password: {
                                        description: 'The users password in plain text',
                                        type: 'string',
                                        maxLength: 256,
                                    },
                                    screenName: {
                                        description:
                                            'The name that will be shown for the user on the site',
                                        type: 'string',
                                        maxLength: 256,
                                    },
                                    settings: {
                                        type: 'object',
                                        required: ['dateFormat', 'locale', 'timeFormat'],
                                        properties: {
                                            dateFormat: {
                                                type: 'string',
                                                maxLength: 10,
                                            },
                                            locale: {
                                                type: 'string',
                                                maxLength: 5,
                                            },
                                            timeFormat: {
                                                type: 'string',
                                                maxLength: 10,
                                            },
                                        },
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
                            'application/json': {
                                schema: {
                                    description: 'The authenticated users data',
                                    type: 'object',
                                    required: [
                                        '_id',
                                        'createdOn',
                                        'lastLoggedIn',
                                        'firstName',
                                        'lastName',
                                        'isDeleted',
                                        'screenName',
                                    ],
                                    properties: {
                                        _id: {
                                            type: 'string',
                                        },
                                        createdOn: {
                                            type: 'string',
                                        },
                                        lastLoggedIn: {
                                            type: 'string',
                                        },
                                        firstName: {
                                            type: 'string',
                                        },
                                        lastName: {
                                            type: 'string',
                                        },
                                        isDeleted: {
                                            type: 'boolean',
                                        },
                                        screenName: {
                                            type: 'string',
                                        },
                                    },
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
                tags: ['user'],
                summary: 'Deletes the user with the given ID',
                description: '',
                operationId: 'deleteUserById',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'Unique id representing a user',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '204': {
                        description: 'OK,',
                    },
                },
                security: [
                    {
                        http: ['role:admin', 'role:owner'],
                    },
                ],
            },
            options: {
                tags: ['user', 'options'],
                summary: 'Check which endpoints are valid for the authenticated user',
                description: '',
                operationId: 'sendOptions',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'Unique id representing a user',
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
                security: [],
            },
        },
        '/users/:userId/identifiers': {
            get: {
                tags: ['user', 'identifier'],
                summary: 'Get all identifiers for the requested user',
                description: '',
                operationId: 'getUserIdentifiers',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'Unique id representing a user',
                        required: true,
                        schema: { type: 'string' },
                    },
                    {
                        name: 'limit',
                        in: 'query',
                        description: 'How many records to fetch',
                        schema: { default: 10, type: 'integer', format: 'int64' },
                    },
                    {
                        name: 'offset',
                        in: 'query',
                        description: 'How many records to skip',
                        schema: { default: 0, type: 'integer', format: 'int64' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        required: [
                                            'hash',
                                            'identifier',
                                            'isDeleted',
                                            'type',
                                            'verified',
                                        ],
                                        properties: {
                                            hash: { type: 'string' },
                                            identifier: { type: 'string' },
                                            isDeleted: { type: 'boolean' },
                                            type: { type: 'string' },
                                            verified: { type: 'boolean' },
                                        },
                                    },
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
            post: {
                tags: ['user', 'identifier'],
                summary: 'Store a new identifier for the user',
                description: '',
                operationId: 'createUserIdentifier',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'Unique id representing a user',
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
                                required: ['identifier', 'type'],
                                properties: {
                                    identifier: {
                                        description:
                                            'An identifier of type email or social token',
                                        type: 'string',
                                        maxLength: 256,
                                    },
                                    type: {
                                        description:
                                            'The type of identifier being stored, email or social',
                                        type: 'string',
                                        maxLength: 256,
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Created',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: [
                                        'hash',
                                        'identifier',
                                        'isDeleted',
                                        'type',
                                        'verified',
                                    ],
                                    properties: {
                                        hash: { type: 'string' },
                                        identifier: { type: 'string' },
                                        isDeleted: { type: 'boolean' },
                                        type: { type: 'string' },
                                        verified: { type: 'boolean' },
                                    },
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
                tags: ['user', 'identifier', 'options'],
                summary:
                    'Check which endpoints are available for working with identifiers',
                description: '',
                operationId: 'sendOptions',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'Unique id representing a user',
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
                security: [],
            },
        },
        '/users/:userId/identifiers/:hash': {
            delete: {
                tags: ['user', 'identifier', 'options'],
                summary: 'Remove the identifier for the given user',
                description: '',
                operationId: 'deleteUserIdentifier',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'Unique id representing a user',
                        required: true,
                        schema: { type: 'string' },
                    },
                    {
                        name: 'hash',
                        in: 'path',
                        description: 'Unique hash of a users identifier',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '204': {
                        description: 'OK,',
                    },
                },
                security: [
                    {
                        http: ['role:admin', 'role:owner'],
                    },
                ],
            },
            options: {
                tags: ['user', 'identifier', 'options'],
                summary:
                    'Check which endpoints are available for working with an identifier',
                description: '',
                operationId: 'sendOptions',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'Unique id representing a user',
                        required: true,
                        schema: { type: 'string' },
                    },
                    {
                        name: 'hash',
                        in: 'path',
                        description: 'Unique hash of a users identifier',
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
                security: [],
            },
        },
        '/authenticate': {
            post: {
                tags: ['user', 'authentication'],
                summary: 'Validate user authentication details',
                description:
                    'Valid combinations are: [email], [email, password], [screenName, password], [identifier]. Passing an email address without a password will trigger the magic link login flow. Passing and email or screenName with a password will trigger the normal login process and passing a social identifier will trigger the normal login process.',
                operationId: 'authenticateUser',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['identifier', 'password'],
                                properties: {
                                    identifier: {
                                        description:
                                            'An identifier of type email, social token or screen name',
                                        type: 'string',
                                        maxLength: 256,
                                    },
                                    password: {
                                        description:
                                            'A password to test the stored hash against',
                                        type: 'string',
                                        maxLength: 256,
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
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['token', 'user'],
                                    properties: {
                                        token: {
                                            description:
                                                'JWT to be passed on each authenicated request',
                                            type: 'string',
                                            maxLength: 256,
                                        },
                                        user: {
                                            description: 'The authenticated users data',
                                            type: 'object',
                                            required: [
                                                '_id',
                                                'createdOn',
                                                'lastLoggedIn',
                                                'firstName',
                                                'lastName',
                                                'isDeleted',
                                                'screenName',
                                            ],
                                            properties: {
                                                _id: {
                                                    type: 'string',
                                                },
                                                createdOn: {
                                                    type: 'string',
                                                },
                                                lastLoggedIn: {
                                                    type: 'string',
                                                },
                                                firstName: {
                                                    type: 'string',
                                                },
                                                lastName: {
                                                    type: 'string',
                                                },
                                                isDeleted: {
                                                    type: 'boolean',
                                                },
                                                screenName: {
                                                    type: 'string',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                security: [],
            },
            options: {
                tags: ['user', 'options'],
                summary: 'Check which endpoints are valid for authenticating a user',
                description: '',
                operationId: 'sendOptions',
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
    },
} as const;
