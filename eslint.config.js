import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export const projectConfig = {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
            ...globals.node,
            Atomics: 'readonly',
            SharedArrayBuffer: 'readonly',
        },
    },
    rules: {
        'default-param-last': 2,
        'no-duplicate-imports': 2,
        'no-else-return': 2,
        'no-extend-native': 2,
        'no-path-concat': 2,
        'no-useless-constructor': 2,
        'no-var': 2,
        'prefer-const': 2,
        'prefer-rest-params': 2,
        '@typescript-eslint/no-unused-vars': [
            2,
            {
                args: 'none',
            },
        ],
    },
};

export default tseslint.config(
    {
        ignores: ['dist'],
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    projectConfig,
);
