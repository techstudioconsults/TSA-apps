import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: js.configs.recommended
});

export default [
  // Bring in Next.js core-web-vitals rules and the shared monorepo config via FlatCompat
  ...compat.config({
    extends: ['next/core-web-vitals', '@tsa-repo/eslint-config-custom']
  }),
  // Limit to source files within this package
  {
    files: ['**/*.{js,jsx,ts,tsx}']
  }
];