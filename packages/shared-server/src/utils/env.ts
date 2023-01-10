import { config } from 'dotenv';
import Joi from 'joi';

export function parseEnvFile<T>(
    envSchema: Joi.PartialSchemaMap<T>,
    envPath: string,
): T | never {
    const env = config({ path: envPath }).parsed;

    const { error, value } = Joi.object<T>(envSchema).validate(env);

    if (error !== undefined) {
        throw error;
    }

    return value;
}
