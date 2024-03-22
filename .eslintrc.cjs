module.exports = {
  root: true,
  env: {
    amd: true,
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier/prettier',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:perfectionist/recommended-natural',
    'plugin:boundaries/recommended',
  ],
  overrides: [
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'no-console': 'off',
        'react-hooks/rules-of-hooks': 'off',
      },
    },
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import', 'perfectionist', 'boundaries'],
  rules: {
    'arrow-parens': 'off',
    'consistent-return': 'off',
    curly: ['error', 'all'],
    'import/extensions': [
      'error',
      { css: 'always', json: 'always', scss: 'always', svg: 'always' },
    ],
    'import/no-duplicates': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'max-lines': ['error', 300],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'off',
    'no-duplicate-imports': 'error',
    'no-empty-pattern': 'off',
    'no-nested-ternary': 'error',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-var': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', next: 'return', prev: '*' },
      { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
      {
        blankLine: 'any',
        next: ['const', 'let', 'var'],
        prev: ['const', 'let', 'var'],
      },
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        'custom-groups': {
          type: {
            react: 'react',
          },
          value: {
            react: ['react', 'react-*'],
          },
        },
        groups: [
          'type',
          'react',
          'builtin',
          'external',
          'internal-type',
          'internal',
          'side-effect',
          'style',
        ],
        'newlines-between': 'always',
        order: 'asc',
        type: 'natural',
      },
    ],
    'prefer-const': 'error',
    'react/display-name': 'off',
    'react/jsx-boolean-value': ['error'],
    'react/jsx-curly-brace-presence': [
      'error',
      { children: 'ignore', propElementValues: 'always', props: 'always' },
    ],
    'react/jsx-fragments': ['error'],
    'react/prop-types': 'off',
    'react/void-dom-elements-no-children': ['error'],
    'react-refresh/only-export-components': 0,
    'boundaries/entry-point': [
       2,
      {
        default: 'disallow',
        rules: [
          {
            target: [
              [
                'shared',
                {
                  segment: 'assets',
                },
              ],
            ],
            allow: '*/index.ts',
          },
          {
            target: [
              [
                'shared',
                {
                  segment: 'lib',
                },
              ],
            ],
            allow: '*/index.ts',
          },
          {
            target: [
              [
                'shared',
                {
                  segment: 'api',
                },
              ],
            ],
            allow: 'index.ts',
          },
          {
            target: [
              [
                'shared',
                {
                  segment: 'lib',
                },
              ],
            ],
            allow: '*.(ts|tsx)',
          },
          {
            target: [
              [
                'shared',
                {
                  segment: 'constants',
                },
              ],
            ],
            allow: 'index.ts',
          },
          {
            target: [
              [
                'shared',
                {
                  segment: 'ui',
                },
              ],
            ],
            allow: 'index.ts',
          },
          {
            target: [
              [
                'shared',
                {
                  segment: 'ui',
                },
              ],
            ],
            allow: '*/index.ts',
          },
          {
            target: ['app', 'pages', 'widgets', 'features', 'entities'],
            allow: 'index.(ts|tsx)',
          },
        ],
      },
    ],
    'boundaries/element-types': [
       2,
      {
        default: 'allow',
        message: '${file.type} is not allowed to import (${dependency.type})',
        rules: [
          {
            from: ['shared'],
            disallow: ['app', 'pages', 'widgets', 'features', 'entities'],
            message: 'Shared module must not import upper layers (${dependency.type})',
          },
          {
            from: ['entities'],
            message: 'Entity must not import upper layers (${dependency.type})',
            disallow: ['app', 'pages', 'widgets', 'features'],
          },
          {
            from: ['entities'],
            message: 'Entity must not import other entity',
            disallow: [
              [
                'entities',
                {
                  entity: '!${entity}',
                },
              ],
            ],
          },
          {
            from: ['features'],
            message: 'Feature must not import upper layers (${dependency.type})',
            disallow: ['app', 'pages', 'widgets'],
          },
          {
            from: ['features'],
            message: 'Feature must not import other feature',
            disallow: [
              [
                'features',
                {
                  feature: '!${feature}',
                },
              ],
            ],
          },
          {
            from: ['widgets'],
            message: 'Widget must not import upper layers (${dependency.type})',
            disallow: ['app', 'pages'],
          },
          {
            from: ['widgets'],
            message: 'Widget must not import other widget',
            disallow: [
              [
                'widgets',
                {
                  widget: '!${widget}',
                },
              ],
            ],
          },
          {
            from: ['pages'],
            message: 'Page must not import upper layers (${dependency.type})',
            disallow: ['app'],
          },
          {
            from: ['pages'],
            message: 'Page must not import other page',
            disallow: [
              [
                'pages',
                {
                  page: '!${page}',
                },
              ],
            ],
          },
        ],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'boundaries/include': ['src/**/*'],
    'boundaries/elements': [
      {
        type: 'app',
        pattern: 'app',
      },
      {
        type: 'pages',
        pattern: 'src/pages/*',
        capture: ['page'],
      },
      {
        type: 'widgets',
        pattern: 'widgets/*',
        capture: ['widget'],
      },
      {
        type: 'features',
        pattern: 'features/*',
        capture: ['feature'],
      },
      {
        type: 'entities',
        pattern: 'entities/*',
        capture: ['entity'],
      },
      {
        type: 'shared',
        pattern: 'shared/*',
        capture: ['segment'],
      },
    ],

    react: {
      version: 'detect',
    },
  },
}