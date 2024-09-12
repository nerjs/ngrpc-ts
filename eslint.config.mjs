// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

const globalNames = [...Object.getOwnPropertyNames(globalThis), 'require', 'module', 'exports']

const wrap = cfg => ({
  ...cfg,
  files: ['src/**/*.ts'],
  languageOptions: {
    ...(cfg?.languageOptions || {}),
    globals: {
      ...(cfg?.languageOptions?.globals || {}),
      ...globalNames.reduce((acc, key) => ({ ...acc, [key]: 'readonly' }), {}),
    },
  },
})

const configs = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
].map(wrap)

export default tseslint.config(
  ...configs,
  wrap({
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'no-constant-condition': 'off',
      'no-case-declarations': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'prefer-rest-params': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  }),
)