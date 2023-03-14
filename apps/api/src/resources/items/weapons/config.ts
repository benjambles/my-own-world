export default {
    openapi: '3.0.0',
    info: {
        title: 'Weapons',
        description:
            'Routes relating to the creation and management of weapons for the platform.',
        version: '1.0.0',
    },
    components: {
        parameters: {
            WeaponId: {
                name: 'weaponId',
                in: 'path',
                description: 'Unique id representing a weapon',
                required: true,
                schema: { type: 'string' },
            },
        },
        schemas: {
            WeaponResponse: {
                type: 'object',
                required: [
                    '_id',
                    'description',
                    'hands',
                    'limit',
                    'location',
                    'name',
                    'requirements',
                    'type',
                    'value',
                ],
                properties: {
                    _id: { type: 'string' },
                    description: { type: 'string' },
                    limit: { type: 'integer' },
                    location: { type: 'string' },
                    name: { type: 'string' },
                    requirements: {
                        type: 'object',
                        required: [],
                        properties: {
                            skills: { type: 'array', items: { type: 'string' } },
                            stats: {
                                type: 'object',
                                required: [],
                                properties: {
                                    health: { type: 'integer' },
                                    defense_physical: { type: 'integer' },
                                    defense_technical: { type: 'integer' },
                                    speed: { type: 'integer' },
                                    strength: { type: 'integer' },
                                    toughness: { type: 'integer' },
                                    willpower: { type: 'integer' },
                                },
                            },
                        },
                    },
                    stats: {
                        type: 'object',
                        required: ['hands', 'range', 'dice', 'bonus'],
                        properties: {
                            hands: { type: 'integer' },
                            range: { type: 'string' },
                            dice: { type: 'string' },
                            modifier: { type: 'integer' },
                        },
                    },
                    type: { type: 'string' },
                    value: { type: 'integer' },
                },
            },
        },
    },
    paths: {
        '/weapons': {
            get: {
                tags: ['weapon'],
                summary: 'Fetches all weapons for the platform',
                description: '',
                operationId: 'getWeapons',
                parameters: [
                    {
                        name: 'limit',
                        in: 'query',
                        description: 'How many records to fetch',
                        schema: {
                            default: 10,
                            format: 'int64',
                            type: 'integer',
                        },
                    },
                    {
                        name: 'offset',
                        in: 'query',
                        description: 'How many records to skip',
                        schema: {
                            default: 0,
                            format: 'int64',
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/WeaponResponse',
                                    },
                                },
                            },
                        },
                    },
                },
                security: [],
            },
            post: {
                tags: ['weapon'],
                summary: 'Add a new weapon to the platform',
                description: '',
                operationId: 'createWeapon',
                parameters: [],
                responses: {
                    '201': {
                        description: 'Created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/WeaponResponse',
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
                                    'hands',
                                    'limit',
                                    'location',
                                    'name',
                                    'requirements',
                                    'type',
                                    'value',
                                ],
                                properties: {
                                    description: { type: 'string' },
                                    limit: { type: 'integer' },
                                    location: { type: 'string' },
                                    name: { type: 'string' },
                                    requirements: {
                                        type: 'object',
                                        required: [],
                                        properties: {
                                            skills: {
                                                type: 'array',
                                                items: { type: 'string' },
                                            },
                                            stats: {
                                                type: 'object',
                                                required: [],
                                                properties: {
                                                    health: { type: 'integer' },
                                                    defense_physical: { type: 'integer' },
                                                    defense_technical: {
                                                        type: 'integer',
                                                    },
                                                    speed: { type: 'integer' },
                                                    strength: { type: 'integer' },
                                                    toughness: { type: 'integer' },
                                                    willpower: { type: 'integer' },
                                                },
                                            },
                                        },
                                    },
                                    stats: {
                                        type: 'object',
                                        required: ['hands', 'range', 'dice', 'bonus'],
                                        properties: {
                                            hands: { type: 'integer' },
                                            range: { type: 'string' },
                                            dice: { type: 'string' },
                                            modifier: { type: 'integer' },
                                        },
                                    },
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
                tags: ['weapon', 'options'],
                summary: 'Check which endpoints are available for working with weapons',
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
        '/weapons/:weaponId': {
            get: {
                tags: ['weapon'],
                summary: 'Fetches the weapon with the ID matching the url parameter',
                description: '',
                operationId: 'getWeaponById',
                parameters: [{ $ref: '#/components/parameters/WeaponId' }],
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/WeaponResponse',
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:user'] }],
            },
            put: {
                tags: ['weapon'],
                summary: 'Updates the weapon at the ID given with the values provided',
                description: '',
                operationId: 'updateWeaponById',
                parameters: [{ $ref: '#/components/parameters/WeaponId' }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: [],
                                properties: {
                                    description: { type: 'string' },
                                    limit: { type: 'integer' },
                                    location: { type: 'string' },
                                    name: { type: 'string' },
                                    requirements: {
                                        type: 'object',
                                        required: [],
                                        properties: {
                                            skills: {
                                                type: 'array',
                                                items: { type: 'string' },
                                            },
                                            stats: {
                                                type: 'object',
                                                required: [],
                                                properties: {
                                                    health: { type: 'integer' },
                                                    defense_physical: { type: 'integer' },
                                                    defense_technical: {
                                                        type: 'integer',
                                                    },
                                                    speed: { type: 'integer' },
                                                    strength: { type: 'integer' },
                                                    toughness: { type: 'integer' },
                                                    willpower: { type: 'integer' },
                                                },
                                            },
                                        },
                                    },

                                    stats: {
                                        type: 'object',
                                        required: ['hands', 'range', 'dice', 'modifier'],
                                        properties: {
                                            hands: { type: 'integer' },
                                            range: { type: 'string' },
                                            dice: { type: 'string' },
                                            modifier: { type: 'integer' },
                                        },
                                    },
                                    type: { type: 'string' },
                                    value: { type: 'integer' },
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
                                    $ref: '#/components/schemas/WeaponResponse',
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
                tags: ['weapon'],
                summary: 'Deletes the weapon with the given ID',
                description: '',
                operationId: 'deleteWeaponById',
                parameters: [{ $ref: '#/components/parameters/WeaponId' }],
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
                tags: ['weapon', 'options'],
                summary: 'Check which endpoints are available for working with an weapon',
                description: '',
                operationId: 'sendOptions',
                parameters: [{ $ref: '#/components/parameters/WeaponId' }],
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
