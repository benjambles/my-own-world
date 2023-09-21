import { limit, offset } from '../../schema/shared-params.js';

export default {
    openapi: '3.0.0',
    info: {
        title: 'Games',
        description:
            'Routes relating to the creation and management of Games for the platform.',
        version: '1.0.0',
    },
    components: {
        parameters: {
            GameId: {
                name: 'gameId',
                in: 'path',
                description: 'Unique id representing a game',
                required: true,
                schema: { type: 'string' },
            },
            UserId: {
                name: 'userId',
                in: 'query',
                description: 'UUID representing the user to filter data for',
                required: false,
                schema: { type: 'string' },
            },
            Limit: limit,
            Offset: offset,
        },
        schemas: {
            GameListResponse: {
                type: 'object',
                required: [
                    '_id',
                    'createdOn',
                    'description',
                    'game',
                    'name',
                    'points',
                    'type',
                    'userId',
                ],
                properties: {
                    _id: { type: 'string' },
                    createdOn: { type: 'string' },
                    description: { type: 'string' },
                    game: {
                        type: 'object',
                        required: ['name', 'version'],
                        properties: {
                            name: { type: 'string' },
                            version: { type: 'string' },
                        },
                    },
                    name: { type: 'string' },
                    points: { type: 'integer' },
                    type: { type: 'string' }, // TODO add enum support
                    userId: { type: 'string' },
                },
            },
            GameResponse: {
                type: 'object',
                required: [
                    '_id',
                    'createdOn',
                    'description',
                    'game',
                    'name',
                    'points',
                    'type',
                    'userId',
                ],
                properties: {
                    _id: { type: 'string' },
                    createdOn: { type: 'string' },
                    description: { type: 'string' },
                    game: {
                        type: 'object',
                        required: ['name', 'version'],
                        properties: {
                            name: { type: 'string' },
                            version: { type: 'string' },
                        },
                    },
                    name: { type: 'string' },
                    points: { type: 'integer' },
                    type: { type: 'string' }, // TODO add enum support
                    userId: { type: 'string' },
                    // TODO Add Characters, Equipment etc.
                },
            },
        },
    },
    paths: {
        '/games': {
            get: {
                tags: ['game'],
                summary: 'Fetches all games for the platform',
                description: '',
                operationId: 'getGames',
                parameters: [
                    { $ref: '#/components/parameters/UserId' },
                    { $ref: '#/components/parameters/Limit' },
                    { $ref: '#/components/parameters/Offset' },
                ],
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['count', 'games'],
                                    properties: {
                                        count: { type: 'integer' },
                                        games: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/GameResponse',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:user'] }],
            },
            post: {
                tags: ['game'],
                summary: 'Add a new game to the platform',
                description: '',
                operationId: 'createGame',
                parameters: [],
                responses: {
                    '201': {
                        description: 'Created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/GameResponse',
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
                                required: [
                                    'description',
                                    'game',
                                    'name',
                                    'points',
                                    'type',
                                ],
                                properties: {
                                    description: { type: 'string' },
                                    game: { type: 'string' },
                                    name: { type: 'string' },
                                    points: { type: 'integer' },
                                    type: { type: 'string' }, // TODO add enum support
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:user'] }],
            },
            options: {
                tags: ['game', 'options'],
                summary: 'Check which endpoints are available for working with games',
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
        '/games/:gameId': {
            get: {
                tags: ['game'],
                summary: 'Fetches the game with the ID matching the url parameter',
                description: '',
                operationId: 'getGameById',
                parameters: [{ $ref: '#/components/parameters/GameId' }],
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/GameResponse',
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:user'] }],
            },
            put: {
                tags: ['game'],
                summary: 'Updates the game at the ID given with the values provided',
                description: '',
                operationId: 'updateGameById',
                parameters: [{ $ref: '#/components/parameters/GameId' }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: [],
                                properties: {
                                    description: { type: 'string' },
                                    name: { type: 'string' },
                                    points: { type: 'integer' },
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
                                    $ref: '#/components/schemas/GameResponse',
                                },
                            },
                        },
                    },
                },
                security: [
                    {
                        http: ['role:user'],
                    },
                ],
            },
            delete: {
                tags: ['game'],
                summary: 'Deletes the game with the given ID',
                description: '',
                operationId: 'deleteGameById',
                parameters: [{ $ref: '#/components/parameters/GameId' }],
                responses: {
                    '204': {
                        description: 'OK,',
                    },
                },
                security: [
                    {
                        http: ['role:user'],
                    },
                ],
            },
            options: {
                tags: ['game', 'options'],
                summary: 'Check which endpoints are available for working with an game',
                description: '',
                operationId: 'sendOptions',
                parameters: [{ $ref: '#/components/parameters/GameId' }],
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
