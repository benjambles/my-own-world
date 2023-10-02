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

export const archetypeResponse = {
    type: 'object',
    required: [
        '_id',
        'movement',
        'playable',
        'points',
        'species',
        'stats',
        'type',
        'traits',
    ],
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
        points: { type: 'integer' },
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
            ArchetypeId: {
                name: 'archetypeId',
                in: 'path',
                description: 'Unique id representing a base NPC stat block',
                required: true,
                schema: { type: 'string' },
            },
            GameId: {
                name: 'gameId',
                in: 'path',
                description: 'Unique id representing a game',
                required: true,
                schema: { type: 'string' },
            },
            NpcId: {
                name: 'npcId',
                in: 'path',
                description: 'Unique id representing a game ready NPC stat block',
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
            Limit: limit,
            Offset: offset,
        },
        schemas: {
            Archetype: archetypeResponse,
            Armour: armour,
            Consumables: consumables,
            Game: {
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
            Items: items,
            Npc: {
                type: 'object',
                required: [
                    '_id',
                    'archetype',
                    'description',
                    'equipment',
                    'gameId',
                    'isUnique',
                    'name',
                    'points',
                    'summary',
                    'training',
                ],
                properties: {
                    _id: { type: 'string' },
                    archetype: { $ref: '#/components/schemas/Archetype' },
                    equipment: { $ref: '#/components/schemas/Items' },
                    description: { type: 'string' },
                    gameId: { type: 'string' },
                    isUnique: { type: 'boolean' },
                    name: { type: 'string' },
                    points: { type: 'integer' },
                    summary: { type: 'string' },
                    training: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['_id', 'level', 'name', 'stats', 'traits'],
                            properties: {
                                _id: { type: 'string' },
                                level: { type: 'integer' },
                                name: { type: 'string' },
                                stats: { $ref: '#/components/schemas/StatsArray' },
                                traits: { type: 'array', items: { type: 'string' } },
                            },
                        },
                    },
                },
            },
            StatsArray: statsArray,
            Upgrades: upgrades,
            Weapons: weapons,
        },
    },
    paths: {
        '/games': {
            get: {
                tags: ['game'],
                summary: 'Fetches all of the game variants available to the platform',
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
                                                $ref: '#/components/schemas/Game',
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
                                    $ref: '#/components/schemas/Game',
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
                summary: 'Fetches the base game data matching the UUID provided',
                description: '',
                operationId: 'getGameById',
                parameters: [{ $ref: '#/components/parameters/GameId' }],
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Game',
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
                                    $ref: '#/components/schemas/Game',
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
        '/games/:gameId/archetypes': {
            get: {
                tags: ['archetype'],
                summary: 'Fetches all NPC archetypes for the given game',
                description: '',
                operationId: 'getArchetypes',
                parameters: [
                    { $ref: '#/components/parameters/GameId' },
                    { $ref: '#/components/parameters/Limit' },
                    { $ref: '#/components/parameters/Offset' },
                    // TODO: Add playable filter
                ],
                responses: {
                    200: {
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
                                                $ref: '#/components/schemas/Archetype',
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
                tags: ['game', 'archetype'],
                summary: 'Add a new NPC archetype to the given game',
                description: '',
                operationId: 'createArchetype',
                parameters: [{ $ref: '#/components/parameters/GameId' }],
                responses: {
                    201: {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Archetype',
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
                                    'points',
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
                                    points: { type: 'integer' },
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
                tags: ['archetype', 'options'],
                summary: 'Check which endpoints are available for working with archetype',
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
        '/games/:gameId/archetypes/:archetypeId': {
            put: {
                tags: ['game'],
                summary:
                    'Updates the NPC archetype at the IDs given with the values provided',
                description: '',
                operationId: 'updateArchetypeById',
                parameters: [
                    { $ref: '#/components/parameters/GameId' },
                    { $ref: '#/components/parameters/ArchetypeId' },
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
                                    points: { type: 'integer' },
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
                                    $ref: '#/components/schemas/Archetype',
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
                summary: 'Deletes the NPC archetype with the given ID',
                description: '',
                operationId: 'deleteArchetypeById',
                parameters: [
                    { $ref: '#/components/parameters/GameId' },
                    { $ref: '#/components/parameters/ArchetypeId' },
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
                    { $ref: '#/components/parameters/ArchetypeId' },
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
                summary: 'Fetches all of the items available for the given game',
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
                summary:
                    'Creates new items provided in each category ID for the given gameId',
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
                summary: 'Deletes the items from each category using the Ids provided',
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
                summary: 'Check which endpoints are available for working with items',
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
        '/games/:gameId/npcs': {
            get: {
                tags: ['npc'],
                summary: 'Fetches all pregenerated NPCs for the given game',
                description: '',
                operationId: 'getNpcs',
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
                                    type: 'object',
                                    required: ['count', 'items'],
                                    properties: {
                                        count: { type: 'integer' },
                                        items: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/Npc',
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
                tags: ['game', 'npc'],
                summary: 'Add a new NPC to the given game',
                description: '',
                operationId: 'createNpc',
                parameters: [{ $ref: '#/components/parameters/GameId' }],
                responses: {
                    201: {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Npc',
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
                                    'archetype',
                                    'description',
                                    'equipment',
                                    'isUnique',
                                    'name',
                                    'points',
                                    'summary',
                                    'training',
                                ],
                                properties: {
                                    archetype: {
                                        $ref: '#/components/schemas/Archetype',
                                    },
                                    description: { type: 'string' },
                                    equipment: { $ref: '#/components/schemas/Items' },
                                    isUnique: { type: 'boolean' },
                                    name: { type: 'string' },
                                    points: { type: 'integer' },
                                    summary: { type: 'string' },
                                    training: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            required: [
                                                '_id',
                                                'level',
                                                'name',
                                                'stats',
                                                'traits',
                                            ],
                                            properties: {
                                                _id: { type: 'string' },
                                                level: { type: 'integer' },
                                                name: { type: 'string' },
                                                stats: {
                                                    $ref: '#/components/schemas/StatsArray',
                                                },
                                                traits: {
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
                },
                security: [{ http: ['role:admin'] }],
            },
            options: {
                tags: ['npc', 'options'],
                summary: 'Check which endpoints are available for working with Npcs',
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
        '/games/:gameId/npcs/:npcId': {
            get: {
                tags: ['game', 'npc'],
                summary: 'Fetches the NPC data for the UUID provided',
                description: '',
                operationId: 'getNpcById',
                parameters: [
                    { $ref: '#/components/parameters/GameId' },
                    { $ref: '#/components/parameters/NpcId' },
                ],
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Npc',
                                },
                            },
                        },
                    },
                },
                security: [],
            },
            put: {
                tags: ['game', 'npc'],
                summary: 'Updates the NPC at the IDs given with the values provided',
                description:
                    'Updates the NPC at the IDs given with the values provided - this is an overwrite not a merge',
                operationId: 'updateNpcById',
                parameters: [
                    { $ref: '#/components/parameters/GameId' },
                    { $ref: '#/components/parameters/NpcId' },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: [],
                                properties: {
                                    archetype: {
                                        $ref: '#/components/schemas/Archetype',
                                    },
                                    description: { type: 'string' },
                                    equipment: { $ref: '#/components/schemas/Items' },
                                    isUnique: { type: 'boolean' },
                                    name: { type: 'string' },
                                    points: { type: 'integer' },
                                    summary: { type: 'string' },
                                    training: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            required: [
                                                '_id',
                                                'level',
                                                'name',
                                                'stats',
                                                'traits',
                                            ],
                                            properties: {
                                                _id: { type: 'string' },
                                                level: { type: 'integer' },
                                                name: { type: 'string' },
                                                stats: {
                                                    $ref: '#/components/schemas/StatsArray',
                                                },
                                                traits: {
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
                },
                responses: {
                    '200': {
                        description: 'OK,',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Npc',
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
                summary: 'Deletes the NPC with the given ID',
                description: '',
                operationId: 'deleteNpcById',
                parameters: [
                    { $ref: '#/components/parameters/GameId' },
                    { $ref: '#/components/parameters/NpcId' },
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
                summary: 'Check which endpoints are available for working with an Npc',
                description: '',
                operationId: 'sendOptions',
                parameters: [
                    { $ref: '#/components/parameters/GameId' },
                    { $ref: '#/components/parameters/NpcId' },
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
    },
} as const;
