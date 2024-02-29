module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@conarti/feature-sliced/recommended',
    'plugin:effector/future',
    'plugin:effector/patronum',
    'plugin:effector/react',
    'plugin:effector/recommended',
    'plugin:effector/scope',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
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
    '@conarti/feature-sliced/public-api': [
      'error',
      { 
        ignoreInFilesPatterns: [
          '**/src/app/index.{ts,tsx}',
          '**/src/pages/index.{ts,tsx}',
        ],
      },
    ]
  },
}
