import checkFile from 'eslint-plugin-check-file';
import prettierConfig from 'eslint-config-prettier';

// Shared ESLint rules for every workspace in the monorepo — the mechanical tier of docs/CODING-CONVENTION.md.
// Order matters: a later object overrides an earlier one, so `eslint-config-prettier` goes last.
export const vinaupBaseConfig = [
  {
    // — File naming ─────
    // e.g. `user-card.tsx` ✓   `UserCard.tsx` ✗   `_base.ts` ✓ (leading `_` allowed for shared core files)
    files: ['**/*.{ts,tsx}'],
    // skip the App Router folder — Next owns those names (`page`/`layout`/`[param]`/`(group)`).
    ignores: ['**/app/**'],
    plugins: { 'check-file': checkFile },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        // `?(_)` = optional leading underscore, then kebab-case words.
        { '**/*.{ts,tsx}': '?(_)+([a-z0-9])*(-+([a-z0-9]))' },
        // ignore the role suffix (.interface / .type / …) — only the base name is checked
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  {
    // ─── Symbol naming ─────────────────────────────
    // Interfaces are PascalCase with NO `I`-prefix — e.g. `UserCard` ✓   `IUserCard` ✗
    // 'error' because dropping the legacy `I`-prefix is a hard convention, not a suggestion.
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          // `^I[A-Z]` matches `IUser` but not real words like `Item`/`Image`, so those aren't flagged.
          custom: { regex: '^I[A-Z]', match: false },
        },
      ],
      // ──— Import order ──────────────────────────────
      // 'warn' (not 'error') so it is auto-fixable guidance and never blocks the lint gate.
      // Groups separated by a blank line and sorted A→Z within each group:
      //   import { useState } from 'react';        // external
      //   import { http } from '@/lib/http';       // internal (the `@/*` alias)
      //   import { styles } from './styles';       // parent/sibling/index
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
