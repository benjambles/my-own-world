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
            // Path
            SkirmishId: {
                name: 'skirmishId',
                in: 'path',
                description: 'Unique id representing a skirmish instance',
                required: true,
                schema: { type: 'string' },
            },
            // Query
            GameId: {
                name: 'userId',
                in: 'query',
                description: 'UUID representing the user to filter data for',
                required: false,
                schema: { type: 'string' },
            },
            Limit: limit,
            Offset: offset,
            UserId: {
                name: 'userId',
                in: 'query',
                description: 'UUID representing the user to filter data for',
                required: false,
                schema: { type: 'string' },
            },
        },
        schemas: {
            SkirmishListResponse: {
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
            SkirmishResponse: {
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
        '/skirmishes': {
            get: {
                tags: ['skirmish'],
                summary: 'Fetches all skirmishes for the platform',
                description: '',
                operationId: 'getSkirmishes',
                parameters: [
                    { $ref: '#/components/parameters/GameId' },
                    { $ref: '#/components/parameters/Limit' },
                    { $ref: '#/components/parameters/Offset' },
                    { $ref: '#/components/parameters/UserId' },
                ],
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['count', 'items'],
                                    properties: {
                                        count: { type: 'integer' },
                                        items: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/SkirmishListResponse',
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
                tags: ['skirmish'],
                summary: 'Add a new skirmish to the platform',
                description: '',
                operationId: 'createSkirmish',
                parameters: [],
                responses: {
                    '201': {
                        description: 'Created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/SkirmishResponse',
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
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:user'] }],
            },
            options: {
                tags: ['skirmish', 'options'],
                summary:
                    'Check which endpoints are available for working with skirmishes',
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
        '/skirmishes/:skirmishId': {
            get: {
                tags: ['skirmish'],
                summary: 'Fetches the skirmish with the ID matching the url parameter',
                description: '',
                operationId: 'getSkirmishById',
                parameters: [{ $ref: '#/components/parameters/SkirmishId' }],
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/SkirmishResponse',
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:user'] }],
            },
            put: {
                tags: ['skirmish'],
                summary: 'Updates the skirmish at the ID given with the values provided',
                description: '',
                operationId: 'updateSkirmishById',
                parameters: [{ $ref: '#/components/parameters/SkirmishId' }],
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
                                    $ref: '#/components/schemas/SkirmishResponse',
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
                tags: ['skirmish'],
                summary: 'Deletes the skirmish with the given ID',
                description: '',
                operationId: 'deleteSkirmishById',
                parameters: [{ $ref: '#/components/parameters/SkirmishId' }],
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
                tags: ['skirmish', 'options'],
                summary:
                    'Check which endpoints are available for working with a skirmish',
                description: '',
                operationId: 'sendOptions',
                parameters: [{ $ref: '#/components/parameters/SkirmishId' }],
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
