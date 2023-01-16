export default {
    openapi: '3.0.0',
    info: {
        title: 'Orders',
        description:
            'Routes relating to the creation and management of orders for the platform.',
        version: '1.0.0',
    },
    paths: {
        '/orders': {
            get: {
                tags: ['order'],
                summary: 'Fetches all orders for the platform',
                description: '',
                operationId: 'getOrders',
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
                responses: {},
                security: [],
            },
            post: {
                tags: ['order'],
                summary: 'Add a new order to the platform',
                description: '',
                operationId: 'createOrder',
                parameters: [],
                responses: {},
                security: [],
            },
            options: {
                tags: ['order', 'options'],
                summary: 'Check which endpoints are available for working with orders',
                description: '',
                operationId: 'sendOptions',
                parameters: [],
                responses: {},
                security: [],
            },
        },

        '/orders/:orderId': {
            get: {
                tags: ['order'],
                summary: 'Fetches the order with the ID matching the url parameter',
                description: '',
                operationId: 'getOrderById',
                parameters: [
                    {
                        name: 'orderId',
                        in: 'path',
                        description: 'Unique id representing a order',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {},
                security: [{ jwt: ['role:order'] }],
            },
            put: {
                tags: ['order'],
                summary: 'Updates the order at the ID given with the values provided',
                description: '',
                operationId: 'updateOrderById',
                parameters: [
                    {
                        name: 'orderId',
                        in: 'path',
                        description: 'Unique id representing a order',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {},
                security: [
                    {
                        jwt: ['role:admin', 'role:owner'],
                    },
                ],
            },
            delete: {
                tags: ['order'],
                summary: 'Deletes the order with the given ID',
                description: '',
                operationId: 'deleteOrderById',
                parameters: [
                    {
                        name: 'orderId',
                        in: 'path',
                        description: 'Unique id representing a order',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {},
                security: [
                    {
                        jwt: ['role:admin', 'role:owner'],
                    },
                ],
            },
            options: {
                tags: ['order', 'options'],
                summary: 'Check which endpoints are available for working with an order',
                description: '',
                operationId: 'sendOptions',
                parameters: [
                    {
                        name: 'orderId',
                        in: 'path',
                        description: 'Unique id representing a order',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {},
                security: [],
            },
        },
    },
} as const;
