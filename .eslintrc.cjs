module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        '@mate-academy/eslint-config-react-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'indent': ['error', 2],
        'react/jsx-indent': ['error', 2],
        'react/jsx-indent-props': ['error', 2],
        'import/no-extraneous-dependencies': 'off',
        'import/no-absolute-path': 'off'
    },
};
