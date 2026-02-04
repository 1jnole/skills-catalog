import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

import angularEslint from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';

export default [
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**', '.angular/**'],
  },
  js.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
      },
    },
  },
  ...tseslint.configs.recommended.map((c) => ({
    ...c,
    files: ['**/*.ts'],
  })),
  {
    files: ['**/*.ts'],
    rules: {
      curly: 'error',
      'no-fallthrough': 'error',
      'no-console': 'off',
      'no-restricted-properties': [
        'error',
        { object: 'console', property: 'debug', message: 'console.debug is not allowed' },
        { object: 'console', property: 'info', message: 'console.info is not allowed' },
        { object: 'console', property: 'time', message: 'console.time is not allowed' },
        { object: 'console', property: 'timeEnd', message: 'console.timeEnd is not allowed' },
        { object: 'console', property: 'trace', message: 'console.trace is not allowed' },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'rxjs/Rx',
              message: "Do not import from 'rxjs/Rx'. Use explicit imports from 'rxjs' and 'rxjs/operators'.",
            },
          ],
          patterns: [
            {
              group: ['src/**', './src/**'],
              message: "Imports from 'src/...' are not allowed. Use relative imports or TypeScript path aliases (e.g. @app/...).",
            },
            {
              group: ['../../../**', '../../../../**', '../../../../../**'],
              message:
                'Deep relative imports (3+ levels) are not allowed. Use a TypeScript path alias (e.g. @app/...) or re-export from an index.ts.',
            },
          ],
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'default', format: ['camelCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': angularEslint,
    },
    rules: {
      ...angularEslint.configs.recommended.rules,

      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'app', style: 'kebab-case' }],
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplate,
    },
    rules: {
      ...angularTemplate.configs.recommended.rules,
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/no-negated-async': 'error',
    },
  },
];
