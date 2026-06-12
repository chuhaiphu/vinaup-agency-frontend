import checkFile from 'eslint-plugin-check-file';
import prettierConfig from 'eslint-config-prettier';

/**
 * Shared ESLint rules for every workspace in the monorepo.
 *
 * Apps spread this AFTER `eslint-config-next` (core-web-vitals + typescript) so
 * the `@typescript-eslint` and `import` plugins are already registered — this
 * config only references their rules, plus registers `check-file` (new).
 *
 * Enforces the mechanical tier of docs/CODING-CONVENTION.md:
 *  - file names kebab-case, leading `_` allowed for shared core files
 *    (`_base.ts`, `_base-interfaces.ts`); the App Router folder is exempt
 *    because Next owns `page/layout/[param]/(group)` naming.
 *  - interfaces are PascalCase with NO `I` prefix.
 *  - imports grouped (builtin → external → internal → relative) and alphabetised.
 *  - `eslint-config-prettier` last, to drop formatting rules Prettier owns.
 */
export const vinaupBaseConfig = [
  {
    // ─── File naming ───────────────────────────────────────────────
    // App Router files are exempt: Next dictates their names.
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/app/**'],
    plugins: { 'check-file': checkFile },
    rules: {
      // `?(_)` = optional leading underscore, then kebab-case words.
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{ts,tsx}': '?(_)+([a-z0-9])*(-+([a-z0-9]))' },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  {
    // ─── Symbol naming + import order ──────────────────────────────
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Interfaces: PascalCase, and reject the legacy `I`-prefix.
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: { regex: '^I[A-Z]', match: false },
        },
      ],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  prettierConfig,
];
