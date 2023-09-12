import { limit, offset } from '../../../schema/shared-params.js';

export default {
    openapi: '3.0.0',
    info: {
        title: 'Consumables',
        description:
            'Routes relating to the creation and management of consumables for the platform.',
        version: '1.0.0',
    },
    components: {
        parameters: {
            ConsumableId: {
                name: 'consumableId',
                in: 'path',
                description: 'Unique id representing a consumable',
                required: true,
                schema: { type: 'string' },
            },
            Limit: limit,
            Offset: offset,
        },
        schemas: {
            ConsumableResponse: {
                type: 'object',
                required: [
                    '_id',
                    'description',
                    'effects',
                    'limit',
                    'name',
                    'type',
                    'value',
                ],
                properties: {
                    _id: { type: 'string' },
                    description: { type: 'string' },
                    effects: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['duration', 'target', 'type', 'value'],
                            properties: {
                                duration: { type: 'string' },
                                target: { type: 'array', items: { type: 'string' } },
                                type: { type: 'string' },
                                value: { type: 'string' },
                            },
                        },
                    },
                    limit: { type: 'integer' },
                    name: { type: 'string' },
                    type: { type: 'string' },
                    value: { type: 'integer' },
                },
            },
        },
    },
    paths: {
        '/consumables': {
            get: {
                tags: ['consumable'],
                summary: 'Fetches all consumables for the platform',
                description: '',
                operationId: 'getConsumables',
                parameters: [
                    { $ref: '#/components/parameters/Limit' },
                    { $ref: '#/components/parameters/Offset' },
                ],
                responses: {
                    '200': {
                        description: 'ok',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/ConsumableResponse',
                                    },
                                },
                            },
                        },
                    },
                },
                security: [],
            },
            post: {
                tags: ['consumable'],
                summary: 'Add a new consumable to the platform',
                description: '',
                operationId: 'createConsumable',
                parameters: [],
                responses: {
                    '201': {
                        description: 'Created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ConsumableResponse',
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
                                    'effects',
                                    'limit',
                                    'name',
                                    'type',
                                    'value',
                                ],
                                properties: {
                                    description: { type: 'string' },
                                    effects: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            required: [
                                                'duration',
                                                'target',
                                                'type',
                                                'value',
                                            ],
                                            properties: {
                                                duration: { type: 'string' },
                                                target: {
                                                    type: 'array',
                                                    items: { type: 'string' },
                                                },
                                                type: { type: 'string' },
                                                value: { type: 'string' },
                                            },
                                        },
                                    },
                                    limit: { type: 'integer' },
                                    name: { type: 'string' },
                                    type: { type: 'string' },
                                    value: { type: 'integer' },
                                },
                            },
                        },
                    },
                },
                security: [
                    {
                        http: ['role:admin'],
                    },
                ],
            },
            options: {
                tags: ['consumable', 'options'],
                summary:
                    'Check which endpoints are available for working with consumables',
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
        '/consumables/:consumableId': {
            get: {
                tags: ['consumable'],
                summary: 'Fetches the consumable with the ID matching the url parameter',
                description: '',
                operationId: 'getConsumableById',
                parameters: [{ $ref: '#/components/parameters/ConsumableId' }],
                responses: {
                    '200': {
                        description: 'ok',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ConsumableResponse',
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:user'] }],
            },
            put: {
                tags: ['consumable'],
                summary:
                    'Updates the consumable at the ID given with the values provided',
                description: '',
                operationId: 'updateConsumableById',
                parameters: [{ $ref: '#/components/parameters/ConsumableId' }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: [],
                                properties: {
                                    description: { type: 'string' },
                                    effects: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            required: [
                                                'duration',
                                                'target',
                                                'type',
                                                'value',
                                            ],
                                            properties: {
                                                duration: { type: 'string' },
                                                target: {
                                                    type: 'array',
                                                    items: { type: 'string' },
                                                },
                                                type: { type: 'string' },
                                                value: { type: 'string' },
                                            },
                                        },
                                    },
                                    limit: { type: 'integer' },
                                    name: { type: 'string' },
                                    type: { type: 'string' },
                                    value: { type: 'integer' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'ok',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ConsumableResponse',
                                },
                            },
                        },
                    },
                },
                security: [
                    {
                        http: ['role:admin'],
                    },
                ],
            },
            delete: {
                tags: ['consumable'],
                summary: 'Deletes the consumable with the given ID',
                description: '',
                operationId: 'deleteConsumableById',
                parameters: [{ $ref: '#/components/parameters/ConsumableId' }],
                responses: {
                    '204': {
                        description: 'OK,',
                    },
                },
                security: [
                    {
                        http: ['role:admin'],
                    },
                ],
            },
            options: {
                tags: ['consumable', 'options'],
                summary:
                    'Check which endpoints are available for working with an consumable',
                description: '',
                operationId: 'sendOptions',
                parameters: [{ $ref: '#/components/parameters/ConsumableId' }],
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
