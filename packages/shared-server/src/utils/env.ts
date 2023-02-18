import { config } from 'dotenv';
import Joi from 'joi';

export function loadEnv(envPath: string) {
    return config({ path: envPath });
}

export function validateEnv<T>(
    envSchema: Joi.PartialSchemaMap<T>,
    env: NodeJS.ProcessEnv,
): T | never {
    const { error, value } = Joi.object<T>(envSchema).validate(env);

    if (error !== undefined) {
        throw error;
    }

    return value;
}
