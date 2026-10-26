import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'pnpm-lock.yaml'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        // 由 vite-plugin-monkey 注入的油猴 API
        GM_getValue: 'readonly',
        GM_setValue: 'readonly',
        GM_deleteValue: 'readonly',
        GM_addValueChangeListener: 'readonly',
        GM_removeValueChangeListener: 'readonly',
        GM_addStyle: 'readonly',
        GM_openInTab: 'readonly',
        GM_xmlhttpRequest: 'readonly',
        GM_registerMenuCommand: 'readonly',
        unsafeWindow: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrors: 'none', varsIgnorePattern: '^_' },
      ],
      'no-empty': ['error', { allowEmptyCatch: true }],
      // 部分组件名（App/Toast 等）与业务强绑定，不强制多词
      'vue/multi-word-component-names': 'off',
    },
  },
];
