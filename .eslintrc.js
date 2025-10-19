module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
    'prettier', // Must be last to override other configs
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    // Console & Debugging
    'no-console': 'off', // Разрешаем console в Node.js
    'no-debugger': 'error',

    // Variables
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'no-var': 'error',
    'prefer-const': 'error',
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],

    // Naming conventions
    'no-underscore-dangle': ['error', { allow: ['_id', '__v', '__dirname', '__filename'] }],
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],

    // Functions
    'func-names': 'off',
    'prefer-arrow-callback': 'warn',
    'arrow-body-style': ['warn', 'as-needed'],
    'no-param-reassign': ['error', { props: false }],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',

    // Classes
    'class-methods-use-this': 'off',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: false }],

    // Control flow
    'consistent-return': 'off',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-lonely-if': 'error',
    'prefer-destructuring': ['warn', { object: true, array: false }],

    // Async/await & Promises
    'no-await-in-loop': 'warn',
    'no-return-await': 'error',
    'require-await': 'warn',
    'prefer-promise-reject-errors': 'error',
    'no-async-promise-executor': 'error',

    // Error handling
    'no-throw-literal': 'error',
    'handle-callback-err': 'error',

    // Imports
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off', // Отключаем проверку разрешения модулей
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.spec.js',
          '**/tests/**',
          '**/test/**',
          '**/jest.config.js',
          '**/webpack.config.js',
        ],
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/newline-after-import': 'error',

    // Node.js specific
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        version: '>=11.0.0',
        ignores: ['modules'], // Allow ES6 imports
      },
    ],
    'node/no-unpublished-require': 'off',
    'node/no-missing-import': 'off',
    'node/no-missing-require': 'off',

    // Code style & quality
    'max-len': [
      'warn',
      {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],

    // Best practices
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    curly: ['error', 'all'],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-with': 'error',
    radix: 'error',
    yoda: 'error',

    // Security
    'no-script-url': 'error',
    'no-alert': 'warn',

    // Performance
    'no-loop-func': 'error',
    'no-new-object': 'error',
    'no-array-constructor': 'error',
  },
};
