import eslint from '@eslint/js';
import { projectConfig } from '../../eslint.config.js';
// import storybook from 'storybook';
import tseslint from 'typescript-eslint';

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
    // storybook.configs['flat/recommended'],
    Object.assign({}, projectConfig, {
        ignores: ['!.storybook'],
    }),
);
