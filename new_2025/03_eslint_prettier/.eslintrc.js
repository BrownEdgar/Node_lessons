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
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Отключаем/настраиваем правила под наши нужды
    'no-console': 'off', // Разрешаем console в Node.js
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }], // Mongoose _id
    'func-names': 'off',
    'prefer-arrow-callback': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',

    // Async/await
    'no-await-in-loop': 'warn',
    'no-return-await': 'error',

    // Import rules
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.js', '**/*.spec.js', '**/tests/**', '**/jest.config.js'],
      },
    ],

    // Node.js specific
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['modules'], // Allow ES6 imports
      },
    ],
    'node/no-unpublished-require': 'off',
    'node/no-missing-import': 'off',
    'node/no-missing-require': 'off',

    // Error handling
    'no-throw-literal': 'error',
    'prefer-promise-reject-errors': 'error',

    // Code quality
    'max-len': ['warn', { code: 100, ignoreUrls: true, ignoreStrings: true }],
    'no-param-reassign': ['error', { props: false }],
    'arrow-body-style': ['error', 'as-needed'],
  },
};
