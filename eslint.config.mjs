import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
    {
        ignores: ['coverage/**', 'dist/**', 'docs/.vitepress/**', 'docs/public/**'],
    },
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        extends: [js.configs.recommended, tseslint.configs.recommended],
    },
    {
        files: ['**/*.{js,mjs,ts}'],
        languageOptions: {
            sourceType: 'module',
        },
    },
    {
        files: ['**/*.cjs'],
        languageOptions: {
            globals: globals.node,
            sourceType: 'commonjs',
        },
    },
    {
        files: ['examples/node/**/*.{js,ts}', 'scripts/**/*.{js,mjs,ts}'],
        languageOptions: {
            globals: globals.node,
        },
    },
    {
        files: ['test/**/*.{js,ts}'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        rules: {
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    format: ['camelCase', 'UPPER_CASE'],
                    selector: 'variable',
                },
                {
                    format: ['camelCase'],
                    leadingUnderscore: 'allow',
                    selector: 'parameter',
                },
                {
                    format: ['camelCase'],
                    selector: 'function',
                },
                {
                    format: ['PascalCase'],
                    selector: 'typeLike',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            'func-style': ['error', 'expression'],
            'prefer-arrow-callback': 'error',
            'prefer-const': 'error',
            'sort-vars': ['error', { ignoreCase: true }],
        },
    },
    eslintConfigPrettier,
);
