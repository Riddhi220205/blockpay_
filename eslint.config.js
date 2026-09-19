import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': [
        'error',
        {
          // Component-like bindings (PascalCase) and the framer-motion JSX
          // namespace are only ever referenced as JSX tag names
          // (`<Foo />`, `<motion.div />`), which this rule's scope analysis
          // doesn't trace through — so they're allow-listed by name instead.
          varsIgnorePattern: '^[A-Z_]|^motion$',
          argsIgnorePattern: '^[A-Z_]',
        },
      ],
    },
  },
])
