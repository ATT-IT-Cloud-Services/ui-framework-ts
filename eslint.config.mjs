import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@demo/*", "../demo/*", "**/demo/**"],
              message: "Framework code in src/ must NEVER import from demo/.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["demo/**/*.{ts,tsx}", "app/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: ["../src/**", "../../src/**"],
              message: "Demos must import framework code via @fw/* alias, not relative paths.",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
