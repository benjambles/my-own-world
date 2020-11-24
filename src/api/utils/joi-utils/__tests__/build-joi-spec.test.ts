import { Joi } from 'koa-joi-router';
import { buildJoiSpec } from '../build-joi-spec';

test('buildJoiSpec', () => {
    const tests = [
        {
            passes: false,
            spec: {
                consumes: ['application/json'],
                parameters: [
                    {
                        name: 'ownerId',
                        in: 'body',
                        description: 'The UUID of the person who created or owns the project',
                        opts: {
                            required: true,
                        },
                        type: 'string',
                    },
                    {
                        name: 'title',
                        in: 'body',
                        description: 'A name for the project - Tales have their own names',
                        opts: {
                            required: true,
                        },
                        type: 'string',
                    },
                ],
            },
            data: {
                title: 'This is my project',
            },
        },
        {
            passes: true,
            spec: {
                consumes: ['application/json'],
                parameters: [
                    {
                        name: 'ownerId',
                        in: 'body',
                        description: 'The UUID of the person who created or owns the project',
                        opts: {
                            required: true,
                        },
                        type: 'string',
                    },
                    {
                        name: 'title',
                        in: 'body',
                        description: 'A name for the project - Tales have their own names',
                        opts: {
                            required: true,
                        },
                        type: 'string',
                    },
                ],
            },
            data: {
                title: 'This is my project',
                ownerId: 'a-totally-valid-uuid',
            },
        },
        {
            passes: true,
            spec: {
                consumes: ['application/json'],
                parameters: [
                    {
                        name: 'ownerId',
                        in: 'body',
                        description: 'The UUID of the person who created or owns the project',
                        opts: {
                            required: true,
                        },
                        type: 'string',
                    },
                    {
                        name: 'title',
                        in: 'body',
                        description: 'A name for the project - Tales have their own names',
                        type: 'string',
                    },
                ],
            },
            data: {
                ownerId: 'a-totally-valid-uuid',
            },
        },
        {
            passes: true,
            spec: {
                consumes: ['application/json'],
                parameters: [
                    {
                        name: 'ids',
                        in: 'body',
                        description: 'List of IDs being requested',
                        opts: {
                            required: true,
                        },
                        type: 'array',
                        values: [
                            {
                                type: 'string',
                            },
                        ],
                    },
                ],
            },
            data: {
                ids: ['a-totally-valid-uuid', 'and-another'],
            },
        },
    ];

    tests.forEach(({ passes, spec, data }) => {
        const validator = buildJoiSpec(Joi, spec);
        const schema = Joi.compile(validator.body);

        try {
            const value = Joi.attempt(data, schema);
            expect(value).toEqual(data);
            expect(passes).toEqual(true);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(passes).toEqual(false);
        }
    });
});
