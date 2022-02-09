import { config } from 'dotenv';
import Joi from 'Joi';
import { resolveImportPath } from '../utils/paths.js';

export function parseEnvFile(envSchema: Joi.PartialSchemaMap<any>, paths) {
    const env = config({ path: resolveImportPath(paths.base, paths.env) }).parsed;

    const { error, value } = Joi.object(envSchema).validate(env);

    if (error) {
        throw error;
    }

    return value;
}
