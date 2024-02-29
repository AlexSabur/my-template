module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    '@feature-sliced',
    'plugin:@conarti/eslint-plugin-feature-sliced/recommended',
    'plugin:effector/future',
    'plugin:effector/patronum',
    'plugin:effector/react',
    'plugin:effector/recommended',
    'plugin:effector/scope',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'tailwind.config.ts'],
  parser: '@typescript-eslint/parser',
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  plugins: ['react-refresh', 'effector'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/no-internal-modules': [
      'error', 
      {
        allow: [
          'react-dom/client',
          // 
          '**/shared/i18n',
          '**/shared/router',
          '**/shared/config',
        ]
      }
    ],
    '@conarti/feature-sliced/absolute-relative': [
      'error',
      { 
        ignoreInFilesPatterns: [
          '**/shared/router/*.{ts,tsx}',
        ],
      },
    ],
    '@conarti/feature-sliced/public-api': [
      'error',
      { 
        ignoreInFilesPatterns: [
          '**/src/client-entry.{ts,tsx}',
          '**/src/app/index.{ts,tsx}',
          '**/src/pages/index.{ts,tsx}',
        ],
      },
    ],
  },
}
