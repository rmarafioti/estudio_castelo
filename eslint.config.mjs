// ESLint config: the Next.js core-web-vitals rules. Run with npm run lint.
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Scaffold contact form, not used yet (CLAUDE.md, Scaffold elements). Remove this line
    // when the form is put into use, and fix its lint errors then.
    "src/app/_components/forms/**",
  ]),
]);

export default eslintConfig;
