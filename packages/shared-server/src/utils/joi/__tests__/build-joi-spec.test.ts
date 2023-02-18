import { Joi } from 'koa-joi-router';
import { buildJoiSpec } from '../build-joi-spec.js';
import { MethodSchema } from '../openapi-to-joi.js';

test('buildJoiSpec', () => {
    //#region Data
    const allRequired: MethodSchema = {
        operationId: 'someOp',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        required: ['ownerId', 'title'],
                        properties: {
                            ownerId: {
                                type: 'string',
                            },
                            title: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        },
    };

    const idRequired: MethodSchema = {
        operationId: 'someOp',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        required: ['ownerId', 'title'],
                        properties: {
                            ownerId: {
                                type: 'string',
                            },
                            title: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        },
    };

    const arrayFormat: MethodSchema = {
        operationId: 'someOp',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        required: ['ids'],
                        properties: {
                            ids: {
                                type: 'array',
                                items: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    };
    //#endregion Data

    const tests: { passes: boolean; spec: MethodSchema; data: any }[] = [
        {
            passes: false,
            spec: allRequired,
            data: {
                title: 'This is my project',
            },
        },
        {
            passes: true,
            spec: allRequired,
            data: {
                title: 'This is my project',
                ownerId: 'a-totally-valid-uuid',
            },
        },
        {
            passes: true,
            spec: idRequired,
            data: {
                ownerId: 'a-totally-valid-uuid',
            },
        },
        {
            passes: true,
            spec: arrayFormat,
            data: {
                ids: ['a-totally-valid-uuid', 'and-another'],
            },
        },
    ];

    tests.forEach(({ passes, spec, data }) => {
        const validator = buildJoiSpec(Joi, spec);

        try {
            if (!validator?.body) {
                throw new Error('body compilation failed');
            }

            const schema = Joi.compile(validator.body);
            const value = Joi.attempt(data, schema);
            expect(value).toEqual(data);
            expect(passes).toEqual(true);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(passes).toEqual(false);
        }
    });
});
