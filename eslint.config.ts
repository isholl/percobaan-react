import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import tailwindcss from 'eslint-plugin-tailwindcss';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      tailwindcss: tailwindcss,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...tailwindcss.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': ['off'],
    },
    settings: {
      tailwindcss: {
        callees: ['twMerge', 'createTheme', 'clsx'],
        classRegex: '^(class(Name)|theme)?$',
      },
    },
  },
);
