import { limit, offset } from '../../schema/shared-params.js';

//#region Shared Config
export const statsArray = {
    type: 'array',
    items: {
        type: 'object',
        required: ['name', 'value'],
        properties: {
            name: { type: 'string' },
            value: { type: 'integer' },
        },
    },
} as const;

export const unitResponse = {
    type: 'object',
    required: ['_id', 'movement', 'playable', 'species', 'stats', 'type', 'traits'],
    properties: {
        _id: { type: 'string' },
        movement: {
            type: 'array',
            items: {
                type: 'object',
                required: ['environment', 'distance', 'type'],
                properties: {
                    distance: { type: 'integer' },
                    environment: { type: 'string' },
                    type: { type: 'string' },
                },
            },
        },
        playable: { type: 'boolean' },
        species: { type: 'string' },
        stats: {
            type: 'array',
            items: {
                type: 'object',
                required: ['abbreviation', 'group', 'key', 'value'],
                properties: {
                    abbreviation: { type: 'string' },
                    group: { type: 'string' },
                    key: { type: 'string' },
                    value: { type: 'string' },
                },
            },
        },
        type: { type: 'string' },
        traits: {
            type: 'object',
            required: ['base', 'options'],
            properties: {
                base: { type: 'array', items: { type: 'string' } },
                options: { type: 'array', items: { type: 'string' } },
            },
        },
    },
} as const;

export const items = {
    type: 'object',
    required: ['armour', 'consumables', 'upgrades', 'weapons'],
    properties: {
        armour: {
            type: 'array',
            items: { $ref: '#/components/schemas/Armour' },
        },
        consumables: {
            type: 'array',
            items: { $ref: '#/components/schemas/Consumables' },
        },
        upgrades: {
            type: 'array',
            items: { $ref: '#/components/schemas/Upgrades' },
        },
        weapons: {
            type: 'array',
            items: { $ref: '#/components/schemas/Weapons' },
        },
    },
} as const;

export const armour = {
    type: 'object',
    required: [
        'description',
        'entityId',
        'limit',
        'location',
        'name',
        'requirements',
        'stats',
        'traits',
        'type',
        'upgradeSlots',
        'value',
    ],
    properties: {
        description: { type: 'string' },
        entityId: { type: 'string' },
        limit: { type: 'integer' },
        location: { type: 'string' },
        name: { type: 'string' },
        requirements: {
            type: 'object',
            required: ['skills', 'stats', 'traits'],
            properties: {
                skills: { type: 'array', items: { type: 'string' } },
                stats: { $ref: '#/components/schemas/StatsArray' },
                traits: { type: 'array', items: { type: 'string' } },
            },
        },
        stats: { $ref: '#/components/schemas/StatsArray' },
        traits: {
            type: 'array',
            items: { type: 'string' },
        },
        type: { type: 'string' },
        upgradeSlots: {
            type: 'array',
            items: {
                type: 'object',
                required: ['attachedId', 'type'],
                properties: {
                    attachedId: { type: 'string' },
                    type: { type: 'string' },
                },
            },
        },
        value: { type: 'integer' },
    },
} as const;

export const consumables = {
    type: 'object',
    required: ['description', 'effects', 'entityId', 'limit', 'name', 'type', 'value'],
    properties: {
        description: { type: 'string' },
        entityId: { type: 'string' },
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
} as const;

export const upgrades = {
    type: 'object',
    required: [
        'description',
        'entityId',
        'limit',
        'location',
        'name',
        'stats',
        'traits',
        'type',
        'value',
    ],
    properties: {
        description: { type: 'string' },
        entityId: { type: 'string' },
        limit: { type: 'integer' },
        location: { type: 'string' },
        name: { type: 'string' },
        stats: { $ref: '#/components/schemas/StatsArray' },
        traits: {
            type: 'array',
            items: { type: 'string' },
        },
        type: { type: 'string' },
        value: { type: 'integer' },
    },
} as const;

export const weapons = {
    type: 'object',
    required: [
        'description',
        'entityId',
        'limit',
        'location',
        'name',
        'requirements',
        'stats',
        'traits',
        'type',
        'value',
    ],
    properties: {
        description: { type: 'string' },
        entityId: { type: 'string' },
        limit: { type: 'integer' },
        location: { type: 'string' },
        name: { type: 'string' },
        requirements: {
            type: 'object',
            required: ['skills', 'stats', 'traits'],
            properties: {
                skills: { type: 'array', items: { type: 'string' } },
                stats: { $ref: '#/components/schemas/StatsArray' },
                traits: { type: 'array', items: { type: 'string' } },
            },
        },
        stats: {
            type: 'object',
            required: ['attacks', 'damage', 'hands', 'range'],
            properties: {
                attacks: { type: 'integer' },
                damage: { type: 'integer' },
                hands: { type: 'integer' },
                range: { type: 'string' },
            },
        },
        traits: { type: 'array', items: { type: 'string' } },
        type: { type: 'string' },
        value: { type: 'integer' },
    },
} as const;

//#endregion Shared Config

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
            UnitId: {
                name: 'unitId',
                in: 'path',
                description: 'Unique id representing a base NPC stat block',
                required: true,
                schema: { type: 'string' },
            },
            ItemTypeFilter: {
                name: 'itemType',
                in: 'query',
                description: 'comma separated values of item categories',
                required: false,
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
                required: ['_id', 'description', 'name', 'tags', 'version'],
                properties: {
                    _id: { type: 'string' },
                    description: { type: 'string' },
                    name: { type: 'string' },
                    tags: { type: 'array', items: { type: 'string' } },
                    version: { type: 'string' },
                },
            },
            GameResponse: {
                type: 'object',
                required: ['_id', 'description', 'name', 'tags', 'version'],
                properties: {
                    _id: { type: 'string' },
                    description: { type: 'string' },
                    name: { type: 'string' },
                    tags: { type: 'array', items: { type: 'string' } },
                    version: { type: 'string' },
                },
            },
            StatsArray: statsArray,
            UnitResponse: unitResponse,
            Items: items,
            Armour: armour,
            Consumables: consumables,
            Upgrades: upgrades,
            Weapons: weapons,
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
                                                $ref: '#/components/schemas/GameListResponse',
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
                                required: ['description', 'name', 'tags', 'version'],
                                properties: {
                                    description: { type: 'string' },
                                    name: { type: 'string' },
                                    tags: { type: 'array', items: { type: 'string' } },
                                    version: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:admin'] }],
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
                security: [],
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
                                    tags: { type: 'array', items: { type: 'string' } },
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
                        http: ['role:admin'],
                    },
                ],
            },
            options: {
                tags: ['game', 'options'],
                summary: 'Check which endpoints are available for working with a game',
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
        '/games/:gameId/units': {
            get: {
                tags: ['unit'],
                summary: 'Fetches all units for the platform',
                description: '',
                operationId: 'getUnits',
                parameters: [
                    { $ref: '#/components/parameters/GameId' },
                    { $ref: '#/components/parameters/Limit' },
                    { $ref: '#/components/parameters/Offset' },
                ],
                responses: {
                    200: {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/UnitResponse' },
                                },
                            },
                        },
                    },
                },
                security: [],
            },
            post: {
                tags: ['game', 'unit'],
                summary: 'Add a new unit to the platform',
                description: '',
                operationId: 'createUnit',
                parameters: [{ $ref: '#/components/parameters/GameId' }],
                responses: {
                    201: {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/UnitResponse',
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
                                    'movement',
                                    'playable',
                                    'species',
                                    'stats',
                                    'type',
                                    'traits',
                                ],
                                properties: {
                                    movement: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            required: ['environment', 'distance', 'type'],
                                            properties: {
                                                distance: { type: 'integer' },
                                                environment: { type: 'string' },
                                                type: { type: 'string' },
                                            },
                                        },
                                    },
                                    playable: { type: 'boolean' },
                                    species: { type: 'string' },
                                    stats: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            required: [
                                                'abbreviation',
                                                'group',
                                                'key',
                                                'value',
                                            ],
                                            properties: {
                                                abbreviation: { type: 'string' },
                                                group: { type: 'string' },
                                                key: { type: 'string' },
                                                value: { type: 'string' },
                                            },
                                        },
                                    },
                                    type: { type: 'string' },
                                    traits: {
                                        type: 'object',
                                        required: ['base', 'options'],
                                        properties: {
                                            base: {
                                                type: 'array',
                                                items: { type: 'string' },
                                            },
                                            options: {
                                                type: 'array',
                                                items: { type: 'string' },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:admin'] }],
            },
            options: {
                tags: ['unit', 'options'],
                summary: 'Check which endpoints are available for working with units',
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
        '/games/:gameId/units/:unitId': {
            put: {
                tags: ['game'],
                summary: 'Updates the game at the ID given with the values provided',
                description: '',
                operationId: 'updateUnitById',
                parameters: [
                    { $ref: '#/components/parameters/GameId' },
                    { $ref: '#/components/parameters/UnitId' },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: [],
                                properties: {
                                    movement: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            required: ['environment', 'distance', 'type'],
                                            properties: {
                                                distance: { type: 'integer' },
                                                environment: { type: 'string' },
                                                type: { type: 'string' },
                                            },
                                        },
                                    },
                                    playable: { type: 'boolean' },
                                    species: { type: 'string' },
                                    stats: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            required: [
                                                'abbreviation',
                                                'group',
                                                'key',
                                                'value',
                                            ],
                                            properties: {
                                                abbreviation: { type: 'string' },
                                                group: { type: 'string' },
                                                key: { type: 'string' },
                                                value: { type: 'string' },
                                            },
                                        },
                                    },
                                    type: { type: 'string' },
                                    traits: {
                                        type: 'object',
                                        required: ['base', 'options'],
                                        properties: {
                                            base: {
                                                type: 'array',
                                                items: { type: 'string' },
                                            },
                                            options: {
                                                type: 'array',
                                                items: { type: 'string' },
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
                                    $ref: '#/components/schemas/UnitResponse',
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
                tags: ['game'],
                summary: 'Deletes the unit with the given ID',
                description: '',
                operationId: 'deleteUnitById',
                parameters: [
                    { $ref: '#/components/parameters/GameId' },
                    { $ref: '#/components/parameters/UnitId' },
                ],
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
                tags: ['game', 'options'],
                summary: 'Check which endpoints are available for working with a game',
                description: '',
                operationId: 'sendOptions',
                parameters: [
                    { $ref: '#/components/parameters/GameId' },
                    { $ref: '#/components/parameters/UnitId' },
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
        '/games/:gameId/items': {
            get: {
                tags: ['game'],
                summary: 'Fetches all games for the platform',
                description: '',
                operationId: 'getItems',
                parameters: [
                    { $ref: '#/components/parameters/GameId' },
                    { $ref: '#/components/parameters/ItemTypeFilter' },
                ],
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Items',
                                },
                            },
                        },
                    },
                },
                security: [],
            },
            put: {
                tags: ['game'],
                summary: 'Fetches all games for the platform',
                description: '',
                operationId: 'updateItems',
                parameters: [{ $ref: '#/components/parameters/GameId' }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: [],
                                properties: {
                                    armour: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Armour' },
                                    },
                                    consumables: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Consumables',
                                        },
                                    },
                                    upgrades: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Upgrades' },
                                    },
                                    weapons: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Weapons' },
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
                                    $ref: '#/components/schemas/Items',
                                },
                            },
                        },
                    },
                },
                security: [{ http: ['role:admin'] }],
            },
            delete: {
                tags: ['game'],
                summary: 'Fetches all games for the platform',
                description: '',
                operationId: 'deleteItems',
                parameters: [{ $ref: '#/components/parameters/GameId' }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: [],
                                properties: {
                                    armour: { type: 'array', items: { type: 'string' } },
                                    consumeables: {
                                        type: 'array',
                                        items: { type: 'string' },
                                    },
                                    upgrades: {
                                        type: 'array',
                                        items: { type: 'string' },
                                    },
                                    weapons: { type: 'array', items: { type: 'string' } },
                                },
                            },
                        },
                    },
                },
                responses: {
                    '204': {
                        description: 'OK,',
                    },
                },
                security: [{ http: ['role:admin'] }],
            },
            options: {
                tags: ['game', 'options'],
                summary: 'Check which endpoints are available for working with games',
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
