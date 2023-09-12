export const limit = {
    name: 'limit',
    description: 'How many records to fetch',
    in: 'query',
    schema: {
        default: 10,
        format: 'int64',
        type: 'integer',
    },
} as const;

export const offset = {
    name: 'offset',
    description: 'How many records to skip',
    in: 'query',
    schema: {
        default: 0,
        format: 'int64',
        type: 'integer',
    },
} as const;
