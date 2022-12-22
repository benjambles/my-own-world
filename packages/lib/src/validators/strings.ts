import { isBetween } from './length.js';

interface ValidationOptions {
    defaultValue: string;
    maxLength: number;
    minLength: number;
    regex: RegExp;
}

export type ValidationOverrides = Partial<ValidationOptions>;

export type Validator<T> = (value: T) => {
    ok: boolean;
    label: string;
    value: T;
    errors: ErrorArray[];
};

type ErrorArray = [msg: string, ...args: any];

export function getStringValidator(
    label: string,
    overrides: ValidationOverrides = {},
): Validator<string> {
    const validationOptions: ValidationOptions = {
        minLength: 0,
        maxLength: 255,
        defaultValue: '',
        regex: /^[a-zA-Z0-9\s-.]$/,
        ...overrides,
    };

    const { minLength, maxLength, defaultValue, regex } = validationOptions;

    return (value) => {
        const errors: ErrorArray[] = [];
        const cleanValue = value.trim() || defaultValue;

        if (!isBetween(minLength, maxLength, cleanValue)) {
            errors.push([
                'game::validators::string::between',
                minLength,
                maxLength,
                cleanValue,
            ]);
        }

        if (!new RegExp(regex).test(cleanValue)) {
            errors.push(['game::validators::string::disallowed_chars', cleanValue]);
        }

        return {
            errors,
            label,
            value: cleanValue,
            ok: !errors.length,
        };
    };
}
