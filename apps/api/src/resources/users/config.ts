export default {
    openapi: '3.0.0',
    info: {
        title: 'User Routes',
        description:
            'Routes relating to the creation and management of users for the platform.',
        version: '1.0.0',
    },
    components: {
        parameters: {
            IdentifierId: {
                name: 'hash',
                in: 'path',
                description: 'Unique hash of a users identifier',
                required: true,
                schema: { type: 'string' },
            },
            UserId: {
                name: 'userId',
                in: 'path',
                description: 'Unique id representing a user',
                required: true,
                schema: { type: 'string' },
            },
            Fingerprint: {
                name: 'fingerprint',
                in: 'path',
                description: 'A fingerprint string for deleteing a token pair',
                required: true,
                schema: { type: 'string' },
            },
        },
        schemas: {
            IdentifierResponse: {
                type: 'object',
                required: ['hash', 'identifier', 'type', 'verified'],
                properties: {
                    hash: { type: 'string' },
                    identifier: { type: 'string' },
                    type: { type: 'string' },
                    verified: { type: 'boolean' },
                },
            },
            UserResponse: {
                description: 'The public facing user data',
                type: 'object',
                required: [
                    '_id',
                    'createdOn',
                    'firstName',
                    'lastName',
                    'lastLoggedIn',
                    'screenName',
                ],
                properties: {
                    _id: {
                        type: 'string',
                    },
                    createdOn: {
                        type: 'string',
                    },
                    firstName: {
                        type: 'string',
                    },
                    lastLoggedIn: {
                        type: 'string',
                    },
                    lastName: {
                        type: 'string',
                    },
                    screenName: {
                        type: 'string',
                    },
                },
            },
        },
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
                                        $ref: '#/components/schemas/UserResponse',
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
                                    $ref: '#/components/schemas/UserResponse',
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
                                required: ['identifier', 'user'],
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
                parameters: [{ $ref: '#/components/parameters/UserId' }],
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/UserResponse',
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
                parameters: [{ $ref: '#/components/parameters/UserId' }],
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
                                    $ref: '#/components/schemas/UserResponse',
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
                parameters: [{ $ref: '#/components/parameters/UserId' }],
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
                parameters: [{ $ref: '#/components/parameters/UserId' }],
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
                    { $ref: '#/components/parameters/UserId' },
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
                                        $ref: '#/components/schemas/IdentifierResponse',
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
                parameters: [{ $ref: '#/components/parameters/UserId' }],
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
                                    $ref: '#/components/schemas/IdentifierResponse',
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
                parameters: [{ $ref: '#/components/parameters/UserId' }],
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
                    { $ref: '#/components/parameters/UserId' },
                    { $ref: '#/components/parameters/IdentifierId' },
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
                    { $ref: '#/components/parameters/UserId' },
                    { $ref: '#/components/parameters/IdentifierId' },
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
        '/users/:userId/tokens': {
            get: {
                tags: ['user', 'authentication', 'jwt'],
                summary: '',
                description: '',
                operationId: 'getTokens',
                parameters: [{ $ref: '#/components/parameters/UserId' }],
                responses: {
                    200: {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        required: [
                                            'fingerprint',
                                            'refreshToken',
                                            'accessToken',
                                        ],
                                        properties: {
                                            fingerprint: { type: 'string' },
                                            refreshToken: { type: 'string' },
                                            accessToken: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:admin', 'role:owner'] }],
            },
            delete: {
                tags: ['user', 'authentication'],
                summary: 'Removes the users active tokens',
                description: '',
                operationId: 'deleteTokens',
                parameters: [{ $ref: '#/components/parameters/UserId' }],
                responses: {
                    '204': {
                        description: 'OK,',
                    },
                },
                security: [{ http: ['role:admin', 'role:owner'] }],
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
        '/users/:userId/tokens/:fingerprint': {
            delete: {
                tags: ['users', 'authentication', 'tokens'],
                summary: '',
                description: '',
                operationId: 'deleteToken',
                parameters: [
                    { $ref: '#/components/parameters/UserId' },
                    { $ref: '#/components/parameters/Fingerprint' },
                ],
                responses: {
                    '204': {
                        description: 'OK,',
                    },
                },
                security: [{ http: ['role:admin', 'role:owner'] }],
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
                                        accessToken: {
                                            description:
                                                'JWT to be passed on each authenicated request',
                                            type: 'string',
                                            maxLength: 256,
                                        },
                                        refreshToken: {
                                            description:
                                                'JWT to be passed on each authenicated request',
                                            type: 'string',
                                            maxLength: 256,
                                        },
                                        user: {
                                            $ref: '#/components/schemas/UserResponse',
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
        '/refreshToken': {
            post: {
                tags: ['user', 'authentication'],
                summary:
                    'Use a fingerprint and refresh token to generate a new access token',
                description: '',
                operationId: 'refreshToken',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['refreshToken'],
                                properties: {
                                    refreshToken: {
                                        description:
                                            'A refresh token currently stored against the user, with a matching finger print included',
                                        type: 'string',
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
                                        accessToken: {
                                            description:
                                                'JWT to be passed on each authenicated request',
                                            type: 'string',
                                            maxLength: 256,
                                        },
                                        refreshToken: {
                                            description:
                                                'JWT to be passed on each authenicated request',
                                            type: 'string',
                                            maxLength: 256,
                                        },
                                        user: {
                                            $ref: '#/components/schemas/UserResponse',
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
                summary: 'Check which endpoints are valid for refreshing a user token',
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
